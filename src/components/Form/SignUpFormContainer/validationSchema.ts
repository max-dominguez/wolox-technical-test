/* eslint-disable react/forbid-prop-types */
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().max(30),
  lastName: yup.string().required().max(30),
  email: yup.string().required().email(),
  phone: yup.string().required().matches(/^\d+$/).max(10),
  password: yup
    .string()
    .required()
    .matches(/^[a-z0-9]+$/i)
    .min(6),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref('password'), null]),
  country: yup.object({
    country: yup.string().required(),
    capital: yup.string().required(),
  }),
  acceptTerms: yup.bool().oneOf([true]),
});

export default validationSchema;
