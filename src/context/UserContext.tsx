import React, { useReducer, useEffect } from 'react';
import {
  IUser,
  IUserState,
  IUserAction,
  UserContextProviderProps,
  UserActionsEnum,
} from './types';

const INITIAL_STATE: IUserState = {
  user: {
    firstName: '',
    lastName: '',
    mail: '',
    phone: '',
    country: { country: '', capital: '', flag: '' },
  },
  isLoggedIn: false,
  login: () => undefined,
  logout: () => undefined,
};

const userReducer = (state: IUserState, action: IUserAction): IUserState => {
  switch (action.type) {
    case UserActionsEnum.LOGIN:
      return { ...state, user: action.user, isLoggedIn: true };
    case UserActionsEnum.LOGOUT:
      return INITIAL_STATE;
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const UserContext = React.createContext<IUserState>(INITIAL_STATE);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  useEffect(() => {
    const storedLoggedUser = localStorage.getItem('loggedUser');

    if (storedLoggedUser) {
      const loggedUser = JSON.parse(storedLoggedUser);
      loginUserHandler(loggedUser);
    }
  }, []);

  const [userState, dispatchUserAction] = useReducer(
    userReducer,
    INITIAL_STATE,
  );

  const loginUserHandler = (user: IUser) => {
    localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatchUserAction({ type: UserActionsEnum.LOGIN, user });
  };

  const logoutUserHandler = () => {
    localStorage.removeItem('loggedUser');
    dispatchUserAction({ type: UserActionsEnum.LOGOUT });
  };

  const userContext: IUserState = {
    user: userState.user,
    isLoggedIn: userState.isLoggedIn,
    login: loginUserHandler,
    logout: logoutUserHandler,
  };

  return (
    <UserContext.Provider value={userContext}>{children}</UserContext.Provider>
  );
};
