import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Forms from '../Form/Forms';
import '@testing-library/jest-dom';

describe('Add input', () => {
  it('should render input element', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    expect(inputColorElement).toBeInTheDocument();
  });

  it('should be able to type in input', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    const inputLocationElement = screen.getByLabelText(/Location:/i);
    const inputVinElement = screen.getByLabelText(/Your Car VIN:/i);
    fireEvent.change(inputColorElement, { target: { value: 'red' } });
    fireEvent.change(inputLocationElement, { target: { value: 'Georgia' } });
    fireEvent.change(inputVinElement, { target: { value: '12345678912345678' } });
    expect(inputColorElement.value).toBe('red');
    expect(inputLocationElement.value).toBe('Georgia');
    expect(inputVinElement.value).toBe('12345678912345678');
  });

  it('should have empty input when add button submit is clicked', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    const inputLocationElement = screen.getByLabelText(/Location:/i);
    const inputVinElement = screen.getByLabelText(/Your Car VIN:/i);
    const buttonElement = screen.getByRole('button');
    fireEvent.change(inputColorElement, { target: { value: 'red' } });
    fireEvent.change(inputLocationElement, { target: { value: 'Georgia' } });
    fireEvent.change(inputVinElement, { target: { value: '12345678912345678' } });
    fireEvent.click(buttonElement);
    expect(inputColorElement.value).toBe('');
    expect(inputLocationElement.value).toBe('');
    expect(inputVinElement.value).toBe('');
  });

  it('should render text congratulation when add button submit is clicked', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    const inputLocationElement = screen.getByLabelText(/Location:/i);
    const inputVinElement = screen.getByLabelText(/Your Car VIN:/i);
    const buttonElement = screen.getByRole('button');
    const congratulationElementNull = screen.queryByText(/you added a car/i);
    fireEvent.change(inputColorElement, { target: { value: 'red' } });
    fireEvent.change(inputLocationElement, { target: { value: 'Georgia' } });
    fireEvent.change(inputVinElement, { target: { value: '12345678912345678' } });
    expect(congratulationElementNull).toBeNull();
    fireEvent.click(buttonElement);
    expect(screen.getByText(/you added a car/i)).toBeInTheDocument();
  });

  it('should render card when add button submit is clicked', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    const inputLocationElement = screen.getByLabelText(/Location:/i);
    const inputVinElement = screen.getByLabelText(/Your Car VIN:/i);
    const buttonElement = screen.getByRole('button');
    const colorElementNull = screen.queryAllByText(/color: red/i);
    const locationElementNull = screen.queryAllByText(/location: Georgia/i);
    const vinElementNull = screen.queryAllByText(/Car VIN: 12345678912345678/i);
    fireEvent.change(inputColorElement, { target: { value: 'red' } });
    fireEvent.change(inputLocationElement, { target: { value: 'Georgia' } });
    fireEvent.change(inputVinElement, { target: { value: '12345678912345678' } });
    expect(colorElementNull).toHaveLength(2);
    expect(locationElementNull).toHaveLength(2);
    expect(vinElementNull).toHaveLength(2);
    fireEvent.click(buttonElement);
    expect(screen.getAllByText(/color: red/i)).toHaveLength(3);
    expect(screen.getAllByText(/location: Georgia/i)).toHaveLength(3);
    expect(screen.getAllByText(/Car VIN: 12345678912345678/i)).toHaveLength(3);
  });

  it('should render error message when add button submit is clicked without one property', () => {
    render(<Forms />);
    const inputColorElement = screen.getByLabelText(/color:/i);
    const inputLocationElement = screen.getByLabelText(/Location:/i);
    const inputVinElement = screen.getByLabelText(/Your Car VIN:/i);
    const buttonElement = screen.getByRole('button');
    const errorElement = screen.queryByText(/incorrect color/i);
    fireEvent.change(inputColorElement, { target: { value: '' } });
    fireEvent.change(inputLocationElement, { target: { value: 'Georgia' } });
    fireEvent.change(inputVinElement, { target: { value: '12345678912345678' } });
    expect(errorElement).toBeNull();
    fireEvent.click(buttonElement);
    expect(screen.getByText(/incorrect color/i)).toBeInTheDocument();
  });
});
