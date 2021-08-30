import '@testing-library/jest-dom';
import { convertToUnderscoreSlug } from './string';

describe('string helper tests.', () => {
  test('should convert string to slug version with underscore.', () => {
    const name = 'Juan Carlos Perez!';
    const slugName = 'juan_carlos_perez';
    expect(convertToUnderscoreSlug(name)).toBe(slugName);
  });
});
