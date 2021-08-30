import { FieldInputProps, FieldMetaProps, FieldHelperProps } from 'formik';

// Handled by Formik
export type ICountryOptionValue = {
  country: string;
  capital: string;
  flag: string;
};

// Handled by react-select component
export interface ICountryOption {
  label: string;
  value: ICountryOptionValue;
}

export type SelectCountryProps = {
  name: string;
  className?: string;
  placeholder?: string;
  label?: string;
};

export type AutoCompleteProps = {
  field: FieldInputProps<ICountryOptionValue>;
  meta: FieldMetaProps<ICountryOptionValue>;
  helpers: FieldHelperProps<ICountryOptionValue>;
  options: Array<ICountryOption>;
  isLoading?: boolean;
  className?: string;
  placeholder?: string;
  label?: string;
};

export interface ICountriesAPIResponse {
  flag: string;
  name: string;
  capital: string;
}
