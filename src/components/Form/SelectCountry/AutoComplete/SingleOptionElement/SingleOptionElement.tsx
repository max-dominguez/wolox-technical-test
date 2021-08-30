/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { components } from 'react-select';

import styles from '../../SelectCountry.module.scss';

const { Option } = components;

export const SingleOptionElement = (props: any) => (
  <Option
    data-testid="single_option_element"
    {...props}
    className={styles.country_select_option}
  >
    {props.data.value.flag && (
      <div
        className={styles.flag}
        style={{
          backgroundImage: `url(${props.data.value.flag})`,
        }}
      />
    )}
    <span data-testid="single_option_label">{props.data.label}</span>
  </Option>
);
