import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignUpSuccessMessage } from './SignUpSuccessMessage';

describe('SignUpSuccessMessage Component Tests.', () => {
  test('Should render a Sign Up Success message.', () => {
    render(<SignUpSuccessMessage />);

    const successMessage = screen.queryByTestId('signup_form_success');
    expect(successMessage).toBeInTheDocument();
  });
});
