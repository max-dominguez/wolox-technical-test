/* eslint-disable no-unused-vars */

import { ReactChild, ReactChildren } from 'react';

interface ICountryObject {
  country: string;
  capital: string;
  flag: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  mail: string;
  phone: string;
  country: ICountryObject;
}

export interface IUserState {
  user?: IUser;
  isLoggedIn?: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

export enum UserActionsEnum {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

export interface IUserAction {
  type: UserActionsEnum;
  user?: IUser;
}

export type UserContextProviderProps = {
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
};
