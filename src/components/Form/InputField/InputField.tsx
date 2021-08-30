/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useField } from 'formik';
import { FormErrorMessage } from '../FormErrorMessage';
import { InputFieldProps } from './types';

export const InputField = ({
  name,
  type = 'text',
  className,
  placeholder,
  label,
  labelLink,
}: InputFieldProps) => {
  const [field, { error, touched }] = useField({
    name,
    type,
  });

  return (
    <>
      <div className={className}>
        {label && !labelLink && <label htmlFor={name}>{label}</label>}
        {label && labelLink && (
          <a href={labelLink} target="_blank" rel="noreferrer">
            {label}
          </a>
        )}
        <input id={name} type={type} placeholder={placeholder} {...field} />
      </div>
      {error && touched && <FormErrorMessage error={error} />}
    </>
  );
};
