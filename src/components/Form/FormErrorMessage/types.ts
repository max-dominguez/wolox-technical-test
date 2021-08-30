interface IErrorTranslateObject {
  key: string;
  values?: string[];
}

export type FormErrorMessageProps = {
  error: IErrorTranslateObject | string;
  className?: string;
};
