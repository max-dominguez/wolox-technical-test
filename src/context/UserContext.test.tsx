import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { UserContext, UserContextProvider } from '.';
import { IUserState, IUser } from './types';

const localStorageMock = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store = {} as IUser | any;

  return {
    getItem(key: string) {
      return store[key];
    },

    setItem(key: string, value: string) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key: string) {
      delete store[key];
    },
  };
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock(),
});

const mockUserInfo = {
  firstName: 'Thomas',
  lastName: 'Anderson',
  mail: 'thomas.anderson@gmail.com',
  phone: '1234567890',
  country: {
    country: 'argentina',
    capital: 'buenos_aires',
    flag: 'https://restcountries.eu/data/arg.svg',
  },
};

describe('UserContextProvider Component Tests', () => {
  afterEach(() => {
    window.localStorage.clear();
  });

  test('isLoggedIn flag should be false by default and user object should be empty.', () => {
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ isLoggedIn, user }: IUserState) => (
            <>
              {isLoggedIn && <span>LOGGED IN</span>}
              {user?.firstName && user?.lastName && <span>USER INFO</span>}
            </>
          )}
        </UserContext.Consumer>
      </UserContextProvider>,
    );

    const isLoggedInFlag = screen.queryByText('LOGGED IN');
    expect(isLoggedInFlag).not.toBeInTheDocument();

    const userInfo = screen.queryByText('USER INFO');
    expect(userInfo).not.toBeInTheDocument();
  });

  test('Should exist user info and loggedIn flag after user login.', () => {
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ isLoggedIn, user, login }: IUserState) => {
            const onClickHandler = () => {
              login(mockUserInfo);
            };

            return (
              <>
                {isLoggedIn && <span>LOGGED IN</span>}
                {user?.firstName && user?.lastName && <span>USER INFO</span>}

                <button type="button" onClick={onClickHandler}>
                  LOGIN
                </button>
              </>
            );
          }}
        </UserContext.Consumer>
      </UserContextProvider>,
    );

    const loginButton = screen.getByRole('button', { name: 'LOGIN' });
    fireEvent.click(loginButton);

    const isLoggedInFlag = screen.getByText('LOGGED IN');
    expect(isLoggedInFlag).toBeInTheDocument();

    const userInfo = screen.getByText('USER INFO');
    expect(userInfo).toBeInTheDocument();
  });

  test('Should store the user into LocalStorage after user logged in.', () => {
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ login }: IUserState) => {
            const onClickHandler = () => {
              login(mockUserInfo);
            };

            return (
              <>
                <button type="button" onClick={onClickHandler}>
                  LOGIN
                </button>
              </>
            );
          }}
        </UserContext.Consumer>
      </UserContextProvider>,
    );

    expect(window.localStorage.getItem('loggedUser')).toBeUndefined();

    const loginButton = screen.getByRole('button', { name: 'LOGIN' });
    fireEvent.click(loginButton);

    expect(window.localStorage.getItem('loggedUser')).toEqual(
      JSON.stringify(mockUserInfo),
    );
  });

  test('Should login in user if it already exists in LocalStorage.', () => {
    window.localStorage.setItem('loggedUser', JSON.stringify(mockUserInfo));

    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ isLoggedIn, user, login }: IUserState) => {
            const onClickHandler = () => {
              login(mockUserInfo);
            };

            return (
              <>
                {isLoggedIn && <span>LOGGED IN</span>}
                {user?.firstName && user?.lastName && <span>USER INFO</span>}

                <button type="button" onClick={onClickHandler}>
                  LOGIN
                </button>
              </>
            );
          }}
        </UserContext.Consumer>
      </UserContextProvider>,
    );

    const isLoggedInFlag = screen.getByText('LOGGED IN');
    expect(isLoggedInFlag).toBeInTheDocument();

    const userInfo = screen.getByText('USER INFO');
    expect(userInfo).toBeInTheDocument();
  });

  test('Should logout in user and delete Local Storage when user logout.', () => {
    render(
      <UserContextProvider>
        <UserContext.Consumer>
          {({ isLoggedIn, user, login, logout }: IUserState) => {
            const onLoginHandler = () => {
              login(mockUserInfo);
            };

            const onLogoutHandler = () => {
              logout();
            };

            return (
              <>
                {isLoggedIn && <span>LOGGED IN</span>}
                {user?.firstName && user?.lastName && <span>USER INFO</span>}

                <button type="button" onClick={onLoginHandler}>
                  LOGIN
                </button>

                <button type="button" onClick={onLogoutHandler}>
                  LOGOUT
                </button>
              </>
            );
          }}
        </UserContext.Consumer>
      </UserContextProvider>,
    );

    // LOGIN EVENT
    const loginButton = screen.getByRole('button', { name: 'LOGIN' });
    fireEvent.click(loginButton);

    const isLoggedInFlag = screen.getByText('LOGGED IN');
    expect(isLoggedInFlag).toBeInTheDocument();

    const userInfo = screen.getByText('USER INFO');
    expect(userInfo).toBeInTheDocument();

    expect(window.localStorage.getItem('loggedUser')).toEqual(
      JSON.stringify(mockUserInfo),
    );

    // LOGOUT EVENT
    const logoutButton = screen.getByRole('button', { name: 'LOGOUT' });
    fireEvent.click(logoutButton);

    expect(isLoggedInFlag).not.toBeInTheDocument();
    expect(userInfo).not.toBeInTheDocument();
    expect(window.localStorage.getItem('loggedUser')).toBeUndefined();
  });
});
