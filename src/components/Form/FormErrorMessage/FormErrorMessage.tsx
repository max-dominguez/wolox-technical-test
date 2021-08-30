import React from 'react';
import { useTranslation } from 'react-i18next';
import { FormErrorMessageProps } from './types';

import styles from './FormErrorMessage.module.scss';

export const FormErrorMessage = ({ error }: FormErrorMessageProps) => {
  const { t } = useTranslation();

  let message = error;
  if (typeof error === 'object') {
    const { key, values } = error;

    message = t(key, values);
  }

  return (
    <div data-testid="form_error_message" className={styles.error_message}>
      {message}
    </div>
  );
};
