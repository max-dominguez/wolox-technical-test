/* eslint-disable no-unused-vars */
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { SignUpFormContainer } from './SignUpFormContainer';
import { ISignUpFormFields } from './types';

// Mock Form Values to validate onSubmit handler
const mockFormValues = {
  firstName: 'Thomas',
  lastName: 'Anderson',
  email: 'thomas.anderson@gmail.com',
  phone: '1234567890',
  password: '123456',
  confirmPassword: '123456',
  country: {
    country: 'argentina',
    capital: 'buenos_aires',
    flag: 'https://restcountries.eu/data/arg.svg',
  },
  acceptTerms: true,
};

interface FormProps {
  onSubmit: (values: ISignUpFormFields) => undefined;
}
jest.mock('./SignUpForm', () => ({
  SignUpForm: ({ onSubmit }: FormProps) => {
    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      onSubmit(mockFormValues);
    };

    return (
      // For some reason, implicit role of form is not detected
      // eslint-disable-next-line jsx-a11y/no-redundant-roles
      <form role="form" onSubmit={onSubmitHandler}>
        <button type="submit">SUBMIT</button>
      </form>
    );
  },
}));

window.fetch = jest.fn().mockResolvedValueOnce({
  ok: true,
  json: async () => Promise.resolve({ success: true }),
});

describe('SignUpForm Component Tests.', () => {
  test('Should render the SignUpForm component.', () => {
    render(<SignUpFormContainer />);

    const signUpForm = screen.getByRole('form');
    expect(signUpForm).toBeInTheDocument();
  });

  test('Should render a SignUpBanner.', () => {
    render(<SignUpFormContainer />);

    const signUpBannerImage = screen.getByRole('complementary');
    expect(signUpBannerImage).toBeInTheDocument();
  });

  test('Should call onSubmit handler when user submit form.', async () => {
    render(<SignUpFormContainer />);

    const submitButton = screen.getByRole('button', { name: 'SUBMIT' });
    await waitFor(() => {
      fireEvent.click(submitButton);
    });

    expect(window.fetch).toHaveBeenCalledTimes(1);
  });
});
