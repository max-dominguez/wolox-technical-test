import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading Component Tests.', () => {
  test('Should render loading component.', () => {
    render(<Loading />);

    const loadingComponent = screen.getByRole('progressbar');
    expect(loadingComponent).toBeInTheDocument();
  });
});
