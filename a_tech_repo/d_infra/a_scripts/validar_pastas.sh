#!/usr/bin/env bash
# validar_pastas.sh — valida a convenção de pastas D-25 (prefixo alfabético).
# Gerado por: PROMPT-002 v1.1
# Regra: b_doc_repo/a_prompts/a_convencoes/CONVENCAO_DE_PASTAS.md
#
# Uso: bash a_tech_repo/d_infra/a_scripts/validar_pastas.sh [raiz_do_repo]
# Saída: 0 = sem violações; 1 = há violações.

set -u

ROOT="${1:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$ROOT" || { echo "Raiz inválida: $ROOT" >&2; exit 2; }

NAME_RE='^[a-z]{1,2}_[a-z0-9]+(_[a-z0-9]+)*$'

# Pastas geradas por ferramentas (ignoradas em qualquer nível).
IGNORED_NAMES=(node_modules dist build target coverage)

# Pastas cujo CONTEÚDO é código com convenções próprias (a raiz é validada; o interior, não).
CODE_ROOTS=(./a_tech_repo/a_frontend ./a_tech_repo/b_backend)

violations=0
warnings=0

is_ignored_name() {
  local n="$1"
  [[ "$n" == .* ]] && return 0
  local i
  for i in "${IGNORED_NAMES[@]}"; do [[ "$n" == "$i" ]] && return 0; done
  return 1
}

is_code_root() {
  local d="$1" c
  for c in "${CODE_ROOTS[@]}"; do [[ "$d" == "$c" ]] && return 0; done
  return 1
}

# Índice da letra de ordem: a=0 … z=25, aa=26, ab=27 …
prefix_index() {
  local p="$1" a b
  if [[ ${#p} -eq 1 ]]; then
    a=$(printf '%d' "'$p"); echo $((a - 97))
  else
    a=$(printf '%d' "'${p:0:1}"); b=$(printf '%d' "'${p:1:1}")
    echo $((26 + (a - 97) * 26 + (b - 97)))
  fi
}

index_to_prefix() {
  local i="$1"
  if (( i < 26 )); then
    printf "\\$(printf '%03o' $((97 + i)))"
  else
    i=$((i - 26))
    printf "\\$(printf '%03o' $((97 + i / 26)))\\$(printf '%03o' $((97 + i % 26)))"
  fi
}

check_dir() {
  local parent="$1"
  local -a children=() idx=()
  local d name

  while IFS= read -r -d '' d; do
    name="${d##*/}"
    is_ignored_name "$name" && continue
    children+=("$d")
  done < <(find "$parent" -mindepth 1 -maxdepth 1 -type d -print0 | sort -z)

  (( ${#children[@]} == 0 )) && return

  for d in "${children[@]}"; do
    name="${d##*/}"
    if [[ ! "$name" =~ $NAME_RE ]]; then
      echo "VIOLAÇÃO  formato inválido: ${d#./}/"
      violations=$((violations + 1))
    else
      idx+=("$(prefix_index "${name%%_*}"):${d#./}")
    fi
  done

  if (( ${#idx[@]} > 0 )); then
    local expected=0 entry i path
    while IFS= read -r entry; do
      i="${entry%%:*}"; path="${entry#*:}"
      if (( i < expected )); then
        echo "VIOLAÇÃO  letra repetida em ${parent#./}/: ${path}/"
        violations=$((violations + 1))
      elif (( i > expected )); then
        echo "VIOLAÇÃO  lacuna em ${parent#./}/: esperado '$(index_to_prefix "$expected")_…', encontrado ${path}/"
        violations=$((violations + 1))
        expected=$((i + 1))
      else
        expected=$((expected + 1))
      fi
    done < <(printf '%s\n' "${idx[@]}" | sort -t: -k1,1n)
    if (( expected > 26 )); then
      echo "ALERTA    mais de 26 pastas em ${parent#./}/ — considere subdividir"
      warnings=$((warnings + 1))
    fi
  fi

  for d in "${children[@]}"; do
    is_code_root "$d" && continue
    check_dir "$d"
  done
}

check_dir "."

echo "----"
echo "Raiz: $ROOT"
echo "Violações: $violations · Alertas: $warnings"
(( violations == 0 )) && echo "OK — convenção D-25 respeitada." && exit 0
exit 1
