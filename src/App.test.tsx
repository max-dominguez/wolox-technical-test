import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component Tests.', () => {
  test('Should render a loading element until main content is ready.', () => {
    render(<App />);

    const loadingElement = screen.getByRole('progressbar');
    expect(loadingElement).toBeInTheDocument();
  });

  test('Should render a main content when it is available.', async () => {
    render(<App />);

    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });

  test('Should render a header element.', async () => {
    render(<App />);

    const headerElement = await screen.findByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('Should render a footer element.', async () => {
    render(<App />);

    const footerElement = await screen.findByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });
});
