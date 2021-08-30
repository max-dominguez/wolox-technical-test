import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';
import { UserContext } from '../../context/UserContext';

describe('Header Component Tests.', () => {
  test('Should render header element.', () => {
    render(<Header />);

    const headerElement = screen.getByRole('banner');
    expect(headerElement).toBeInTheDocument();
  });

  test('Should render logo of the page.', () => {
    render(<Header />);

    const logoElement = screen.getByTestId('logo');
    expect(logoElement).toBeInTheDocument();
  });

  test('Should render nav bar.', () => {
    render(<Header />);

    const navElement = screen.getByRole('navigation');
    expect(navElement).toBeInTheDocument();
  });

  test('Should render language select element.', () => {
    render(<Header />);

    const languageSelectElement = screen.getByRole('combobox');
    expect(languageSelectElement).toBeInTheDocument();
  });

  describe('Header when user is logged in.', () => {
    beforeEach(() => {
      const ctx = {
        isLoggedIn: true,
        user: {
          firstName: 'Thomas',
          lastName: 'Anderson',
          mail: 'thomas.anderson@gmail.com',
          phone: '1234567890',
          country: {
            country: 'argentina',
            capital: 'buenos_aires',
            flag: 'https://restcountries.eu/data/arg.svg',
          },
        },
        login: jest.fn(),
        logout: jest.fn(),
      };
      render(
        <UserContext.Provider value={ctx}>
          <Header />
        </UserContext.Provider>,
      );
    });

    test('Should render logged user info section.', () => {
      const userInfoSection = screen.getByTestId('user_info');
      expect(userInfoSection).toBeInTheDocument();
    });

    test('Should render logged user info section with proper data.', () => {
      const userFullnameElement = screen.getByText('Thomas Anderson');
      expect(userFullnameElement).toBeInTheDocument();

      const userCountryFlagElement = screen.getByRole('img');
      expect(userCountryFlagElement).toBeInTheDocument();
    });

    test('Should render logout button', () => {
      const logoutButton = screen.getByRole('button');
      expect(logoutButton).toBeInTheDocument();
    });
  });

  describe('Header when user is NOT logged in.', () => {
    beforeEach(() => {
      const ctx = {
        isLoggedIn: false,
        login: jest.fn(),
        logout: jest.fn(),
      };

      render(
        <UserContext.Provider value={ctx}>
          <Header />
        </UserContext.Provider>,
      );
    });

    test('Should NOT render logged user info section.', () => {
      const userInfoSection = screen.queryByTestId('user_info');
      expect(userInfoSection).not.toBeInTheDocument();
    });

    test('Should NOT render logout button.', () => {
      const logoutButton = screen.queryByRole('button');
      expect(logoutButton).not.toBeInTheDocument();
    });
  });
});
