import React from 'react';
import { render, screen } from '@testing-library/react';
import { SingleValueElement } from './SingleValueElement';

const mockOptions = {
  label: 'Argentina',
  value: {
    country: 'argentina',
    capital: 'buenos_aires',
    flag: 'https://restcountries.eu/data/arg.svg',
  },
};

const getStyles = jest.fn();
const cx = jest.fn();

describe('SingleValueElement Component Tests.', () => {
  test('Should render component without crash.', () => {
    render(
      <SingleValueElement data={mockOptions} getStyles={getStyles} cx={cx} />,
    );

    const optionElement = screen.getByTestId('single_value_label');
    expect(optionElement).toBeInTheDocument();
  });
});
