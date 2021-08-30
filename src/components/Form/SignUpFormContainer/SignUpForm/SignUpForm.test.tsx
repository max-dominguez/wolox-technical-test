import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SignUpForm } from './SignUpForm';
import initialValues from '../initialValues';
import validationSchema from '../validationSchema';

const mockOnSubmitHandler = jest.fn();

describe('SignUpForm Component Tests.', () => {
  test('Should render SignUpForm Component.', () => {
    render(
      <SignUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mockOnSubmitHandler}
      />,
    );

    const signUpForm = screen.getByRole('form');
    expect(signUpForm).toBeInTheDocument();
  });

  test('Should NOT allow users submit form if it is empty.', async () => {
    render(
      <SignUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mockOnSubmitHandler}
      />,
    );
    await waitFor(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'text.signup_form_create_user_button',
        }),
      );
    });

    expect(mockOnSubmitHandler).not.toHaveBeenCalled();
  });

  test('Should NOT allow users submit form it is not valid.', async () => {
    render(
      <SignUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mockOnSubmitHandler}
      />,
    );

    userEvent.type(
      screen.getByPlaceholderText('text.signup_form_first_name'),
      'Thomas',
    );
    userEvent.type(
      screen.getByPlaceholderText('text.signup_form_last_name'),
      'Anderson',
    );
    userEvent.type(
      screen.getByPlaceholderText('text.signup_form_email'),
      'thomas.anderson@gmail.com',
    );

    await waitFor(() => {
      userEvent.click(
        screen.getByRole('button', {
          name: 'text.signup_form_create_user_button',
        }),
      );
    });

    expect(mockOnSubmitHandler).not.toHaveBeenCalled();

    const formErrorMessages = screen.getAllByTestId('form_error_message');
    expect(formErrorMessages.length).not.toBe(0);
  });

  test('Should disble submit button after first click and should show field validations.', async () => {
    render(
      <SignUpForm
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={mockOnSubmitHandler}
      />,
    );

    const submitButton = screen.getByRole('button', {
      name: 'text.signup_form_create_user_button',
    });
    expect(submitButton).toHaveClass('submit_button_enabled');

    await waitFor(() => {
      userEvent.click(submitButton);
    });
    expect(submitButton).not.toHaveClass('submit_button_enabled');

    const formErrorMessages = screen.getAllByTestId('form_error_message');
    expect(formErrorMessages.length).not.toBe(0);
  });
});
