import React from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';

import styles from './Loading.module.scss';

export const Loading = () => {
  const { t } = useTranslation();

  return ReactDOM.createPortal(
    <div role="progressbar" className={styles.backdrop}>
      <div className={styles.content}>{t('text.loading')}</div>
      <div className={styles.spinner}>&nbsp;</div>
    </div>,
    document.body,
  );
};
