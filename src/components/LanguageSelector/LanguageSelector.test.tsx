import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { LanguageSelector } from './LanguageSelector';

describe('LanguageSelector Component Tests.', () => {
  test('Should render a language selector element', () => {
    render(<LanguageSelector />);

    const languageSelectorElement = screen.getByRole('combobox');
    expect(languageSelectorElement).toBeInTheDocument();
  });

  test('Should render two language options  (English and Spanish) into language selector element', () => {
    render(<LanguageSelector />);

    const languageOptions = screen.getAllByRole('option');
    expect(languageOptions).toHaveLength(2);
  });

  test('Should be English the default selected language', () => {
    render(<LanguageSelector />);

    const languageSelectorElement = screen.getByRole(
      'combobox',
    ) as HTMLSelectElement;
    expect(languageSelectorElement.value).toBe('en');
  });

  test('Should set the Spanish language when user clicks on it', () => {
    render(<LanguageSelector />);

    const languageSelectorElement = screen.getByRole(
      'combobox',
    ) as HTMLSelectElement;

    const spanishOption = screen.getByRole('option', {
      name: 'Español',
    }) as HTMLOptionElement;

    userEvent.selectOptions(languageSelectorElement, spanishOption);

    expect(languageSelectorElement.value).toBe('es');
  });
});
