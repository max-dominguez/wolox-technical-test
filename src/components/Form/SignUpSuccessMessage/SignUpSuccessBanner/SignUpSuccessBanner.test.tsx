import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignUpSuccessBanner } from './SignUpSuccessBanner';

describe('SignUpSuccessBanner Component Tests.', () => {
  test('Should render SignUpSuccessbanner component.', () => {
    render(<SignUpSuccessBanner />);

    const successBanner = screen.getByTestId('signup_success_banner');
    expect(successBanner).toBeInTheDocument();
  });
});
