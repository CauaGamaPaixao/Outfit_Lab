import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Icon } from './Icon';

describe('Icon', () => {
  it.each(['camiseta', 'calca', 'tenis'] as const)(
    '%s é decorativo e tem forma desenhada',
    (name) => {
      const { container } = render(<Icon name={name} size={64} />);
      const svg = container.querySelector('svg')!;
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg).toHaveAttribute('width', '64');
      expect(svg.querySelectorAll('path').length).toBeGreaterThan(0);
    },
  );
});
