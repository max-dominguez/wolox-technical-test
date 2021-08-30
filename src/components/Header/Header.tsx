import React, { useContext } from 'react';
import { Nav } from './Nav';
import { LoggedUserInfo } from './LoggedUserInfo';
import { LogoutButton } from './LogoutButton';
import { Logo } from './Logo';
import { UserContext } from '../../context';

import styles from './Header.module.scss';

export const Header = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <header role="banner" className={styles.header}>
        <Logo />
        {isLoggedIn && (
          <div className={styles.user_section_container}>
            <LoggedUserInfo />
            <LogoutButton />
          </div>
        )}
      </header>
      <Nav />
    </>
  );
};
