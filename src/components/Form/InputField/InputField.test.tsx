import React from 'react';
import { render, screen } from '@testing-library/react';
import { InputField } from './InputField';

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

describe('InputField Component Tests.', () => {
  test('Should render textbox element by default.', () => {
    render(<InputField name="first_name" />);
    const inputField = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputField).toBeInTheDocument();
    expect(inputField.name).toBe('first_name');
  });

  test('Should render a label if it exists.', () => {
    render(<InputField name="first_name" label="Firstname" />);
    const inputLabel = screen.getByLabelText('Firstname');
    expect(inputLabel).toBeInTheDocument();
  });

  test('Should render a label as a link if label and labelLink are present.', () => {
    render(
      <InputField
        name="first_name"
        label="Firstname"
        labelLink="http://localhost"
      />,
    );
    const inputLabelLink = screen.getByRole('link');
    expect(inputLabelLink).toBeInTheDocument();
    const inputLabel = screen.queryByLabelText('Firstname');
    expect(inputLabel).not.toBeInTheDocument();
  });

  test('Should render a checkbox element if that type is passed.', () => {
    render(<InputField name="first_name" type="checkbox" />);
    const checkboxElement = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkboxElement).toBeInTheDocument();
  });

  test('Input should have a placeholder text if it is passed.', () => {
    render(
      <InputField name="first_name" placeholder="Enter here your first name" />,
    );
    const inputField = screen.getByRole('textbox') as HTMLInputElement;
    expect(inputField.placeholder).toBe('Enter here your first name');
  });

  test('Should render error if it exists.', () => {
    render(<InputField name="first_name" />);

    const inputError = screen.getByText('This field is required.');
    expect(inputError).toBeInTheDocument();
  });
});
