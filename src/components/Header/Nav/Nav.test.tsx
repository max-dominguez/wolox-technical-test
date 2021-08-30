import React from 'react';
import { render, screen } from '@testing-library/react';
import { Nav } from './Nav';

describe('Nav Component Tests.', () => {
  test('Should render nav element.', () => {
    render(<Nav />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('Should render a language selector inside a nav element.', () => {
    render(<Nav />);

    const languageSelectorElement = screen.getByRole('combobox');
    expect(languageSelectorElement).toBeInTheDocument();
  });
});
