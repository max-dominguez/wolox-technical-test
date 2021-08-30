import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { AutoComplete } from './AutoComplete';

const mockOptions = [
  {
    label: 'Argentina',
    value: {
      country: 'argentina',
      capital: 'buenos_aires',
      flag: 'https://restcountries.eu/data/arg.svg',
    },
  },
  {
    label: 'Brazil',
    value: {
      country: 'brazil',
      capital: 'brasília',
      flag: 'https://restcountries.eu/data/bra.svg',
    },
  },
  {
    label: 'Chile',
    value: {
      country: 'chile',
      capital: 'santiago',
      flag: 'https://restcountries.eu/data/chl.svg',
    },
  },
];

const mockValue = {
  country: '',
  capital: '',
  flag: '',
};

const mockField = {
  name: 'select_country',
  type: 'select',
  value: mockValue,
  onChange: jest.fn(),
  onBlur: jest.fn(),
};

const mockMeta = {
  touched: true,
  error: 'This field is required.',
  value: mockValue,
  initialTouched: false,
};

const mockHelpers = {
  setValue: jest.fn(),
  setTouched: jest.fn(),
  setError: jest.fn(),
};

describe('AutoComplete Component Tests.', () => {
  test('Should render AutoComplete component.', async () => {
    render(
      <AutoComplete
        field={mockField}
        meta={mockMeta}
        helpers={mockHelpers}
        options={mockOptions}
      />,
    );

    const autoCompleteElement = screen.getByTestId('select_autocomplete');
    expect(autoCompleteElement).toBeInTheDocument();
  });

  test('Should render AutoComplete component with NO options visible.', () => {
    render(
      <AutoComplete
        field={mockField}
        meta={mockMeta}
        helpers={mockHelpers}
        options={mockOptions}
      />,
    );

    const selectedOption = screen.queryByTestId('single_option_label');
    expect(selectedOption).not.toBeInTheDocument();
  });

  test('Should render a label above the AutoComplete component if it exists.', () => {
    const label = 'Select Country...';

    render(
      <AutoComplete
        field={mockField}
        meta={mockMeta}
        helpers={mockHelpers}
        options={mockOptions}
        label={label}
      />,
    );

    const autoCompleteLabel = screen.getByText(label);
    expect(autoCompleteLabel).toBeInTheDocument();
  });

  test('Should render AutoComplete component with no option selected and placeholder should be visible.', () => {
    const placeholder = 'Select Country...';

    render(
      <AutoComplete
        field={mockField}
        meta={mockMeta}
        helpers={mockHelpers}
        options={mockOptions}
        placeholder={placeholder}
      />,
    );

    const defaultOption = screen.getByText(placeholder);
    expect(defaultOption).toBeInTheDocument();
  });

  test('Should change the selected option when user enter a value.', () => {
    render(
      <AutoComplete
        field={mockField}
        meta={mockMeta}
        helpers={mockHelpers}
        options={mockOptions}
      />,
    );

    // No selected option should be visible.
    let selectedOption = screen.queryByTestId('single_option_label');
    expect(selectedOption).not.toBeInTheDocument();

    const selectInput = screen.getByRole('textbox') as HTMLInputElement;

    fireEvent.change(selectInput, { target: { value: 'Brazil' } });

    // Selected option should be visible after user enter a value.
    selectedOption = screen.getByTestId('single_option_label');
    expect(selectedOption).toBeInTheDocument();
  });
});
