import React, { useState, useEffect } from 'react';
import { useField } from 'formik';
import {
  ICountryOption,
  SelectCountryProps,
  ICountriesAPIResponse,
} from './types';
import { AutoComplete } from './AutoComplete';
import { convertToUnderscoreSlug } from '../../../utils/string';
import { COUNTRIES_API_URL } from '../../../constants/api';

export const SelectCountry = ({
  name,
  className,
  placeholder,
  label,
}: SelectCountryProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [field, meta, helpers] = useField({
    name,
    type: 'select',
  });

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(COUNTRIES_API_URL);
      const data = await res.json();
      const arrCountries = data.map(
        ({ name, flag, capital }: ICountriesAPIResponse) => ({
          label: name,
          value: {
            country: convertToUnderscoreSlug(name),
            capital: convertToUnderscoreSlug(capital) || 'no_capital',
            flag,
          },
        }),
      );

      setCountries(arrCountries);
    };

    try {
      fetchCountries();
    } catch (error) {
      // track error
      if (error instanceof Error) {
        // eslint-disable-next-line no-console
        console.error(error?.message);
      }
    }
  }, []);

  // Pre-caching flag images in order to avoid "blank spaces"
  // when user opens the Dropdown component at the first time
  useEffect(() => {
    const cacheImages = (arrCountries: Array<ICountryOption>): void => {
      arrCountries.forEach((opt) => {
        new Image().src = opt.value.flag;
      });

      setIsLoading(false);
    };

    if (countries.length > 0) {
      cacheImages(countries);
    }
  }, [countries]);

  return (
    <>
      <AutoComplete
        field={field}
        meta={meta}
        helpers={helpers}
        options={countries}
        isLoading={isLoading}
        className={className}
        placeholder={placeholder}
        label={label}
      />
    </>
  );
};
