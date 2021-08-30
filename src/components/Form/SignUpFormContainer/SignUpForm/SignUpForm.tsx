import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik, Form } from 'formik';
import classNames from 'classnames';
import { SelectCountry } from '../../SelectCountry';
import { InputField } from '../../InputField';
import { SignUpFormProps } from '../types';
import { ACCEPT_TERMS_URL } from '../../../../constants/urls';

import styles from '../SignUpFormContainer.module.scss';

export const SignUpForm = ({
  initialValues,
  onSubmit,
  validationSchema,
}: SignUpFormProps) => {
  const { t } = useTranslation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ isValid, isSubmitting }) => (
        <Form role="form">
          <InputField
            type="text"
            name="firstName"
            className={styles.textfield}
            placeholder={t('text.signup_form_first_name')}
          />
          <InputField
            type="text"
            name="lastName"
            className={styles.textfield}
            placeholder={t('text.signup_form_last_name')}
          />
          <InputField
            type="text"
            name="email"
            className={styles.textfield}
            placeholder={t('text.signup_form_email')}
          />
          <InputField
            type="phone"
            name="phone"
            className={styles.textfield}
            placeholder={t('text.signup_form_phone')}
          />
          <InputField
            type="password"
            name="password"
            className={styles.textfield}
            placeholder={t('text.signup_form_password')}
          />
          <InputField
            type="password"
            name="confirmPassword"
            className={styles.textfield}
            placeholder={t('text.signup_form_confirm_password')}
          />

          <SelectCountry
            name="country"
            className={styles.select_country}
            placeholder={t('text.signup_form_select_country')}
          />

          <InputField
            type="checkbox"
            name="acceptTerms"
            className={styles.accept_terms}
            label={t('text.terms_and_conditions')}
            labelLink={ACCEPT_TERMS_URL}
          />

          <button
            type="submit"
            className={classNames(styles.submit_button, {
              [styles.submit_button_enabled]: isValid && !isSubmitting,
              [styles.submit_button_disabled]: !isValid || isSubmitting,
            })}
            disabled={!isValid || isSubmitting}
          >
            {t('text.signup_form_create_user_button')}
          </button>
        </Form>
      )}
    </Formik>
  );
};
