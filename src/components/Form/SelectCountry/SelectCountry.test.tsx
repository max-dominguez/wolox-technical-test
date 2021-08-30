import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { SelectCountry } from './SelectCountry';

interface IFormikProps {
  name: string;
  type?: string;
}

jest.mock('formik', () => ({
  useField: ({ name, type }: IFormikProps) => [
    {
      name,
      type,
    },
    {
      touched: true,
      error: 'This field is required.',
    },
  ],
}));

describe('SelectCountry Component Tests.', () => {
  test('Should render select country element.', () => {
    render(<SelectCountry name="select_country" />);

    const selectCountryElement = screen.getByTestId('select_autocomplete');
    expect(selectCountryElement).toBeInTheDocument();
  });

  test('Should fetch all countries from API when render.', async () => {
    const mockResponse = [
      {
        flag: 'https://restcountries.eu/data/arg.svg',
        name: 'Argentina',
        capital: 'Buenos Aires',
      },
      {
        flag: 'https://restcountries.eu/data/bra.svg',
        name: 'Brazil',
        capital: 'Brasília',
      },
      {
        flag: 'https://restcountries.eu/data/chl.svg',
        name: 'Chile',
        capital: 'Santiago',
      },
    ];

    const mockJSONPromise = Promise.resolve(mockResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJSONPromise,
    });

    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

    await waitFor(async () => {
      render(<SelectCountry name="select_country" />);
    });

    expect(window.fetch).toHaveBeenCalled();
  });
});
