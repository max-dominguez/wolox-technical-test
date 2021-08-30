import React from 'react';
import { render, screen } from '@testing-library/react';
import { SignUpBanner } from './SignUpBanner';

describe('SignUpBanner Component Tests.', () => {
  test('Should render Sign Up Banner image.', () => {
    render(<SignUpBanner />);

    const signUpBannerImage = screen.getByRole('complementary');
    expect(signUpBannerImage).toBeInTheDocument();
  });
});
