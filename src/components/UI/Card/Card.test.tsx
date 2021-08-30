import React from 'react';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

const childrenComponent = (
  <div>
    <p>This is a children component</p>
  </div>
);

describe('Card Component Tests.', () => {
  test('Should render Card component with children.', () => {
    render(<Card>{childrenComponent}</Card>);

    const cardComponent = screen.getByRole('article');
    expect(cardComponent).toBeInTheDocument();
    expect(cardComponent.children.length).toBe(1);
  });

  test('Should render Card component with className and children.', () => {
    const className = 'some_class';

    render(<Card className={className}>{childrenComponent}</Card>);

    const cardComponent = screen.getByRole('article');
    expect(cardComponent).toBeInTheDocument();
    expect(cardComponent).toHaveClass(className);
    expect(cardComponent.children.length).toBe(1);
  });
});
