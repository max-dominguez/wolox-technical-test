import { ReactChild, ReactChildren } from 'react';

export type CardProps = {
  className?: string;
  children: ReactChild | ReactChildren | ReactChild[] | ReactChildren[];
};
