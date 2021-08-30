import React from 'react';
import classNames from 'classnames';
import { CardProps } from './types';

import styles from './Card.module.scss';

export const Card = ({ className, children }: CardProps) => {
  return (
    <article className={classNames(styles.card, [className])}>
      {children}
    </article>
  );
};
