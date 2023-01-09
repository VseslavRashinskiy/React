import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

describe('render App component', () => {
  it('should render the App component', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const cardsComponents = screen.getAllByTestId('cards');
    expect(cardsComponents.length).toBe(50);
  });
});
