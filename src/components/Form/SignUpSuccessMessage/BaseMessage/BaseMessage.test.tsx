import React from 'react';
import { render, screen } from '@testing-library/react';
import { BaseMessage } from './BaseMessage';

describe('BaseMessage Component Tests.', () => {
  test('Should render Base Message component.', () => {
    render(<BaseMessage />);

    const baseMessage = screen.getByTestId('signup_form_success');
    expect(baseMessage).toBeInTheDocument();
  });
});
