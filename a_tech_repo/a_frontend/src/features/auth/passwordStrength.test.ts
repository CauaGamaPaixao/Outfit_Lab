import { describe, expect, it } from 'vitest';
import { atendeRegraMinima, getPasswordStrength } from './passwordStrength';

describe('regra mínima de senha (D-28)', () => {
  it.each([
    ['abc', false],
    ['abcdefgh', false],
    ['12345678', false],
    ['abcdefg1', true],
    ['çãoéaaa1', true],
  ])('%s → %s', (senha, esperado) => {
    expect(atendeRegraMinima(senha)).toBe(esperado);
  });
});

describe('getPasswordStrength (spec 4.1)', () => {
  it.each([
    ['', 0],
    ['abc', 1],
    ['abcdefg1', 2],
    ['abcdefg1!', 3],
    ['abcdefghijk1', 3],
    ['Abcdefghij1!', 4],
  ])('%j → nível %i', (senha, nivel) => {
    expect(getPasswordStrength(senha)).toBe(nivel);
  });
});
