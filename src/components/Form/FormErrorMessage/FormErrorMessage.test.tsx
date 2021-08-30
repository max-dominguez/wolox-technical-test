import React from 'react';
import { render, screen } from '@testing-library/react';
import { FormErrorMessage } from './FormErrorMessage';

describe('FormErrorMessage Component Tests', () => {
  test('Should render FormErrorMessage component.', () => {
    render(<FormErrorMessage error="Some Error" />);

    const errorMessage = screen.getByText('Some Error');
    expect(errorMessage).toBeInTheDocument();
  });

  test('Should show error message when it is an object (to translate).', () => {
    const objError = { key: 'some_error' };
    render(<FormErrorMessage error={objError} />);

    const errorMessage = screen.getByText('some_error');
    expect(errorMessage).toBeInTheDocument();
  });
});
