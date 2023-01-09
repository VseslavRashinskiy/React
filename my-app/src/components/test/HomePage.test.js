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
  it('should render Cards component', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { results } }));
    render(<Main />);
    expect(screen.queryAllByTestId('cards')).toHaveLength(0);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(await screen.findAllByTestId('cards')).toHaveLength(2);
    expect(screen.queryByText(/Loading/i)).toBeNull();
    //Additional
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
  });

  it('should render Error message', async () => {
    axios.get.mockImplementation(() => Promise.reject(new Error()));
    render(<Main />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(screen.queryByText(/not found/i)).toBeNull();
    expect(await screen.findByText(/Not Found/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading/i)).toBeNull();
  });

  it('api address should change', async () => {
    axios.get.mockImplementation(() => Promise.resolve({ data: { results } }));
    render(<Main />);
    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
    expect(await screen.findAllByTestId('cards')).toHaveLength(2);
    userEvent.type(screen.getByRole('textbox'), 'Morty');
    userEvent.click(screen.getByTestId('search'));
    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
    expect(axios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/?name=Morty');
  });
});
