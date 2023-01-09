import React from 'react';
import { render, screen } from '@testing-library/react';
import axios from 'axios';
import Main from '../Main/Main';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

jest.mock('axios');

const results = [
  {
    gender: 'Male',
    id: 2,
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
    name: 'Morty Smith',
    species: 'Human',
    status: 'Alive',
    location: {
      name: 'Citadel of Ricks',
    },
  },
  {
    gender: 'Female',
    id: 3,
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
    name: 'Summer Smith',
    species: 'Human',
    status: 'Alive',
    location: {
      name: 'Earth (Replacement Dimension)',
    },
  },
];

describe('render Home component', () => {
  it('should render Error message', async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error()));
    render(<Main />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/not found/i)).toBeNull();
    expect(await screen.findByText(/Not Found/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading/i)).toBeNull();
  });
});
