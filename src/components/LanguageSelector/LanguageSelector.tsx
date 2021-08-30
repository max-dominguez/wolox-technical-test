import React from 'react';
import { useTranslation } from 'react-i18next';

import styles from './LanguageSelector.module.scss';

export const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const language = e?.currentTarget?.value;

    i18n.changeLanguage(language);
  };

  return (
    <select
      defaultValue="en"
      className={styles.language_selector}
      onChange={changeLanguage}
    >
      <option className={styles.language_option} lang="en" value="en">
        English
      </option>
      <option lang="es" value="es">
        Español
      </option>
    </select>
  );
};
