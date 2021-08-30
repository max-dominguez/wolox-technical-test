import React from 'react';
import { render, screen } from '@testing-library/react';
import { Logo } from './Logo';

describe('Logo Component Tests.', () => {
  test('Should render logo element.', () => {
    render(<Logo />);

    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('Logo should be inside a link element.', () => {
    render(<Logo />);

    const linkElement = screen.getByRole('link');
    const logoElement = screen.getByTestId('logo');
    expect(linkElement).toContainElement(logoElement);
  });
});
