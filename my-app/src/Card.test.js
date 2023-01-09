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
    expect(screen.getByText(/model: cabriolet/i)).toBeInTheDocument();
  });
});
