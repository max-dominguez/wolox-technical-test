import * as yup from 'yup';
import { yupLocale } from './yupLocale';

const validationSchema = yup.object().shape({
  firstName: yup.string().required().max(30),
  email: yup.string().required().email(),
  phone: yup.string().required().matches(/^\d+$/).max(10),
});

describe('Yup Locale Tests.', () => {
  test('Should return a valid Yup Locale config file.', () => {
    expect(yupLocale).not.toBeUndefined();
    expect(yupLocale).not.toBeNull();
  });

  test('Should mark as valid an valid object.', async () => {
    yup.setLocale(yupLocale);

    const validObject = {
      firstName: 'Thomas Anderson',
      email: 'thomas_anderson@gmail.com',
      phone: 1234567890,
    };

    let hasError = false;
    try {
      await validationSchema.validate(validObject, {
        stripUnknown: true,
        abortEarly: false,
      });
    } catch (error) {
      hasError = true;
    }

    expect(hasError).not.toBeTruthy();
  });

  test('Should return translation key in each function.', () => {
    let obj;
    let res;

    obj = { path: 'required' };
    res = yupLocale.mixed.oneOf(obj);
    expect(res).toStrictEqual({ key: `validations.${obj.path}` });

    res = yupLocale.string.matches(obj);
    expect(res).toStrictEqual({ key: `validations.${obj.path}` });

    obj = { min: '6' };
    res = yupLocale.string.min(obj);
    expect(res).toStrictEqual({
      key: 'validations.min_length',
      values: { min: obj.min },
    });

    obj = { max: '30' };
    res = yupLocale.string.max(obj);
    expect(res).toStrictEqual({
      key: 'validations.max_length',
      values: { max: obj.max },
    });

    obj = { path: 'required' };
    res = yupLocale.object.required(obj);
    expect(res).toStrictEqual({ key: `validations.${obj.path}` });
  });
});
