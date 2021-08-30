import React from 'react';
import Select, { ValueType } from 'react-select';
import { FormErrorMessage } from '../../FormErrorMessage';
import { SingleOptionElement } from './SingleOptionElement';
import { SingleValueElement } from './SingleValueElement';
import { AutoCompleteProps, ICountryOption } from '../types';

export const AutoComplete = ({
  field,
  meta,
  helpers,
  options,
  isLoading,
  className,
  placeholder,
  label,
}: AutoCompleteProps) => {
  const onChange = (option: ValueType<ICountryOption, false>) => {
    if (option) {
      const opt = {
        flag: option.value.flag,
        country: option.value.country,
        capital: option.value.capital,
      };
      helpers.setValue(opt);
    }
  };

  const getValue = () => {
    if (options) {
      return options.find(
        (option: ICountryOption) =>
          option?.value?.country === field?.value?.country,
      );
    }

    return {
      label: '',
      value: { country: '', capital: '', flag: '' },
    } as ICountryOption;
  };

  return (
    <>
      <div data-testid="select_autocomplete" className={className}>
        {label && <label htmlFor={field.name}>{label}</label>}
        <Select
          name={field.name}
          value={getValue()}
          onChange={onChange}
          placeholder={placeholder}
          options={options}
          components={{
            Option: SingleOptionElement,
            SingleValue: SingleValueElement,
          }}
          isLoading={isLoading}
          isDisabled={isLoading}
        />
      </div>
      {meta.error && meta.touched && (
        <FormErrorMessage error={{ key: 'validations.required' }} />
      )}
    </>
  );
};
