import React from 'react';
import { LanguageSelector } from '../../LanguageSelector';

import styles from './Nav.module.scss';

export const Nav = () => (
  <nav className={styles.nav}>
    <LanguageSelector />
  </nav>
);
