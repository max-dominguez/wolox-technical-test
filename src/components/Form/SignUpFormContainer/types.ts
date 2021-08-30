/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import { ICountryOptionValue } from '../SelectCountry';

export interface ISignUpFormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  country: ICountryOptionValue;
  acceptTerms: boolean;
}

export interface ISignUpAPIRequestBody {
  name: string;
  last_name: string;
  country: string;
  province: string;
  mail: string;
  phone: string;
  password?: string;
}

export type SignUpFormProps = {
  initialValues: ISignUpFormFields;
  onSubmit: (values: ISignUpFormFields) => void;
  validationSchema: unknown;
};
