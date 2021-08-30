import React from 'react';
import ReactDOM from 'react-dom';
import * as yup from 'yup';
import App from './App';
import { yupLocale } from './i18n/yupLocale';
import './i18n/config';

import './index.scss';

yup.setLocale(yupLocale);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
