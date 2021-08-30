import React from 'react';
import classNames from 'classnames';
import { Card } from '../../../UI/Card';
import { MessageProps } from '../types';

import styles from './BaseMessage.module.scss';

export const BaseMessage = ({
  title,
  message,
  messageImg,
  className,
}: MessageProps) => (
  <Card className={styles.card}>
    <section
      data-testid="signup_form_success"
      className={classNames(styles.message_container, [className])}
    >
      <header className={styles.header}>
        {messageImg && messageImg}
        <h1>{title}</h1>
      </header>
      <div className={styles.content}>
        <p role="doc-subtitle">{message}</p>
      </div>
    </section>
  </Card>
);
