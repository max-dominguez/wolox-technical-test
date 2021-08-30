import React, { useContext } from 'react';
import { UserContext } from '../../../context';

import styles from './LoggedUserInfo.module.scss';

export const LoggedUserInfo = () => {
  const { user } = useContext(UserContext);
  const userInfo = `${user?.firstName} ${user?.lastName}`;

  return (
    <div data-testid="user_info" className={styles.user_info_container}>
      {userInfo}
      <span
        role="img"
        className={styles.user_country_flag}
        style={{
          backgroundImage: `url(${user?.country?.flag})`,
        }}
      />
    </div>
  );
};
