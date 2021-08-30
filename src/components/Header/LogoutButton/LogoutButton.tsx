import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../../context';

import styles from './LogoutButton.module.scss';

export const LogoutButton = () => {
  const { logout } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <button className={styles.logout_button} onClick={logout} type="button">
      {t('text.logout_button')}
    </button>
  );
};
