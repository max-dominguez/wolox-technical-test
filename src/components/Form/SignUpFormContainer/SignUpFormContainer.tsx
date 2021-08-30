import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ISignUpFormFields, ISignUpAPIRequestBody } from './types';
import initialValues from './initialValues';
import validationSchema from './validationSchema';
import { Card } from '../../UI/Card/Card';
import { Loading } from '../../UI/Loading';
import { SignUpBanner } from '../SignUpBanner';
import { SignUpForm } from './SignUpForm';
import { UserContext } from '../../../context/UserContext';
import { SIGNUP_API_URL } from '../../../constants/api';

import styles from './SignUpFormContainer.module.scss';

export const SignUpFormContainer = () => {
  const { t } = useTranslation();
  const { login } = useContext(UserContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (values: ISignUpFormFields) => {
    try {
      if (values) {
        const requestBody: ISignUpAPIRequestBody = {
          name: values.firstName,
          last_name: values.lastName,
          mail: values.email,
          phone: values.phone,
          password: values.password,
          country: values.country.country,
          province: values.country.capital,
        };

        setIsSubmitting(true);

        const res = await fetch(SIGNUP_API_URL, {
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(t('text.signup_form_error_message'));
        }

        const data = await res.json();
        const registeredUser = {
          ...data,
          ...values,
        };

        // Delete values which we don't want to save into the state and LocalStorage
        delete registeredUser.password;
        delete registeredUser.confirmPassword;
        delete registeredUser.acceptTerms;

        login(registeredUser);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error?.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isSubmitting && <Loading />}
      <ToastContainer position="top-center" />
      <Card>
        <section className={styles.signup_form_container}>
          <h1 className={styles.form_title}>{t('text.signup_form_title')}</h1>
          <p className={styles.form_subtitle}>
            {t('text.signup_form_subtitle')}
          </p>
          <SignUpForm
            initialValues={initialValues}
            onSubmit={onSubmitHandler}
            validationSchema={validationSchema}
          />
        </section>
        <SignUpBanner />
      </Card>
    </>
  );
};
