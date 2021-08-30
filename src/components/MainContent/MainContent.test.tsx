import React from 'react';
import { render, screen } from '@testing-library/react';
import { MainContent } from './MainContent';
import { UserContext } from '../../context/UserContext';

describe('MainContent Component Tests.', () => {
  test('Should render a main wrapper.', () => {
    render(<MainContent />);

    const mainContentElement = screen.getByRole('main');
    expect(mainContentElement).toBeInTheDocument();
  });

  describe('MainContent when user is logged in.', () => {
    beforeEach(() => {
      const ctx = {
        isLoggedIn: true,
        login: jest.fn(),
        logout: jest.fn(),
      };

      render(
        <UserContext.Provider value={ctx}>
          <MainContent />
        </UserContext.Provider>,
      );
    });

    test('Should render a Sign Up Success message.', () => {
      const successMessage = screen.getByTestId('signup_form_success');
      expect(successMessage).toBeInTheDocument();
    });

    test('Should NOT render a Sign Up form.', () => {
      const formElement = screen.queryByRole('sd');
      expect(formElement).not.toBeInTheDocument();
    });

    test('Should NOT render a Banner Image (complementary role) of the Sign Up form.', () => {
      const complementaryElement = screen.queryByRole('complementary');
      expect(complementaryElement).not.toBeInTheDocument();
    });
  });

  describe('MainContent when user is NOT logged in.', () => {
    beforeEach(() => {
      const ctx = {
        isLoggedIn: false,
        login: jest.fn(),
        logout: jest.fn(),
      };

      render(
        <UserContext.Provider value={ctx}>
          <MainContent />
        </UserContext.Provider>,
      );
    });

    test('Should render a Sign Up form.', () => {
      const formElement = screen.getByRole('form');
      expect(formElement).toBeInTheDocument();
    });

    test('Should render a Banner Image (complementary role) of the Sign Up form.', () => {
      const complementaryElement = screen.getByRole('complementary');
      expect(complementaryElement).toBeInTheDocument();
    });

    test('Should NOT render a Sign Up Success message.', () => {
      const successMessage = screen.queryByTestId('signup_form_success');
      expect(successMessage).not.toBeInTheDocument();
    });
  });
});
