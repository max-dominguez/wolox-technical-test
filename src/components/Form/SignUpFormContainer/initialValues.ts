import { ISignUpFormFields } from './types';

const initialValues: ISignUpFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  country: { country: '', capital: '', flag: '' },
  acceptTerms: false,
};

export default initialValues;
