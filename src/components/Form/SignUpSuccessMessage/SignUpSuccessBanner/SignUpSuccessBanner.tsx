import React from 'react';
import classNames from 'classnames';

import styles from './SignUpSuccessBanner.module.scss';

export const SignUpSuccessBanner = () => (
  <div
    data-testid="signup_success_banner"
    className={classNames(styles.o_circle, styles.o_circle__sign__success)}
  >
    <div className={styles.o_circle__sign} />
  </div>
);
