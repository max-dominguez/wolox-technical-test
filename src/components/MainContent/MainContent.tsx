import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { SignUpFormContainer } from '../Form/SignUpFormContainer';
import { UserContext } from '../../context/UserContext';

import styles from './MainContent.module.scss';
import { SignUpSuccessMessage } from '../Form/SignUpSuccessMessage';

export const MainContent = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { t } = useTranslation();

  return (
    <main className={styles.main}>
      {!isLoggedIn && <SignUpFormContainer />}
      {isLoggedIn && (
        <SignUpSuccessMessage
          title={t('text.signup_form_success_title')}
          message={t('text.signup_form_success_message')}
        />
      )}
    </main>
  );
};
