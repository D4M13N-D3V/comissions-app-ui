import { hexToRGBA } from '@/core/utils/hex-to-rgba';

describe('hexToRGBA', () => {
  it('converts a 6-digit hex to rgba', () => {
    expect(hexToRGBA('#4fd1ff', 1)).toBe('rgba(79, 209, 255, 1)');
  });

  it('expands a 3-digit shorthand hex', () => {
    expect(hexToRGBA('#fff', 0.5)).toBe('rgba(255, 255, 255, 0.5)');
  });

  it('tolerates a missing leading #', () => {
    expect(hexToRGBA('000000', 0.2)).toBe('rgba(0, 0, 0, 0.2)');
  });
});
