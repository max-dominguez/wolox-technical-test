import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { LogoutButton } from './LogoutButton';
import { UserContext } from '../../../context/UserContext';

const ctx = {
  isLoggedIn: true,
  user: {
    name: 'Thomas',
    last_name: 'Anderson',
    mail: 'thomas.anderson@gmail.com',
    phone: '1234567890',
    country: 'argentina',
    province: 'buenos_aires',
  },
  login: jest.fn(),
  logout: jest.fn(),
};

describe('LogoutButton Component Tests.', () => {
  beforeEach(() => {
    render(
      <UserContext.Provider value={ctx}>
        <LogoutButton />
      </UserContext.Provider>,
    );
  });

  test('Should render logout button element.', () => {
    const logoutButton = screen.getByRole('button');
    expect(logoutButton).toBeInTheDocument();
  });

  test('Should call logout method when user clicks on logout button element.', () => {
    const logoutButton = screen.getByRole('button');
    fireEvent.click(logoutButton);
    expect(ctx.logout).toBeCalled();
  });
});
