import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoggedUserInfo } from './LoggedUserInfo';
import { UserContext } from '../../../context/UserContext';

describe('LoggedUserInfo Component Tests.', () => {
  beforeEach(() => {
    const ctx = {
      isLoggedIn: true,
      user: {
        name: 'Thomas',
        last_name: 'Anderson',
        mail: 'thomas.anderson@gmail.com',
        phone: '1234567890',
        country: 'argentina',
        province: 'buenos_aires',
        flag: 'https://restcountries.eu/data/arg.svg',
      },
      login: jest.fn(),
      logout: jest.fn(),
    };
    render(
      <UserContext.Provider value={ctx}>
        <LoggedUserInfo />
      </UserContext.Provider>,
    );
  });

  test('Should render logged user info section.', () => {
    const userInfoSection = screen.getByTestId('user_info');
    expect(userInfoSection).toBeInTheDocument();
  });
});
