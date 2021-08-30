import React from 'react';
import { BaseMessage } from './BaseMessage';
import { SignUpSuccessBanner } from './SignUpSuccessBanner';
import { MessageProps } from './types';

import styles from './SignUpSuccessMessage.module.scss';

export const SignUpSuccessMessage = ({ title, message }: MessageProps) => (
  <BaseMessage
    className={styles.success_message}
    title={title}
    message={message}
    messageImg={<SignUpSuccessBanner />}
  />
);
