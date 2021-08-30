/* eslint-disable @typescript-eslint/no-explicit-any */

export const yupLocale = {
  mixed: {
    default: {
      key: 'validations.invalid',
    },
    required: {
      key: 'validations.required',
    },
    oneOf: (obj: any) => ({
      key: `validations.${obj.path}`,
    }),
  },
  string: {
    email: {
      key: 'validations.email',
    },
    matches: (obj: any) => ({
      key: `validations.${obj.path}`,
    }),
    min: ({ min }: any) => ({
      key: 'validations.min_length',
      values: { min },
    }),
    max: ({ max }: any) => ({
      key: 'validations.max_length',
      values: { max },
    }),
  },
  number: {},
  object: {
    required: (obj: any) => ({
      key: `validations.${obj.path}`,
    }),
  },
};
