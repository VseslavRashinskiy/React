import { VIN_LENGTH } from 'components/constant/constant';
import React, { useState } from 'react';
import STATE from '../constant/Cars';
import CardsForm from './CardsForm';

export interface ArrState {
  id: number;
  car: string;
  model: string;
  color: string;
  vin: string;
  location: string;
}

const StateCars = STATE.cars.map((el) => el.car);
const StateModels = STATE.cars.map((el) => el.car_model);
const UniqueStateModels = Array.from(new Set(StateModels));
const UniqueStateCars = Array.from(new Set(StateCars));

const Forms = () => {
  const [colorFormDirty, setColorFormDirty] = useState(false);
  const [locationFormDirty, setLocationFormDirty] = useState(false);
  const [vinFormDirty, setVinFormDirty] = useState(false);
  const [colorDirty, setColorDirty] = useState(false);
  const [locationDirty, setLocationDirty] = useState(false);
  const [vinDirty, setVinDirty] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [addCard, setAddCard] = useState(false);
  const [arr, setArr] = useState<ArrState[]>([]);
  const [initialValuesForm, setInitialValuesForm] = useState({
    value: 'Audi',
    model: 'Cabriolet',
    color: '',
    location: '',
    vin: '',
  });

  const handleCarsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInitialValuesForm({
      ...initialValuesForm,
      value: event.target.value,
    });
  };

  const handleModelsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setInitialValuesForm({
      ...initialValuesForm,
      model: event.target.value,
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValuesForm({
      ...initialValuesForm,
      color: event.target.value,
    });
    if (event.target.value === '') {
      setColorDirty(false);
      setFormValid(false);
    } else {
      setColorDirty(true);
      setFormValid(true);
    }
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValuesForm({
      ...initialValuesForm,
      location: event.target.value,
    });
    if (event.target.value === '') {
      setLocationDirty(false);
      setFormValid(false);
    } else {
      setLocationDirty(true);
      setFormValid(true);
    }
  };

  const handleVinChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInitialValuesForm({
      ...initialValuesForm,
      vin: event.target.value,
    });
    if (event.target.value.length === VIN_LENGTH) {
      setVinDirty(true);
    } else {
      setVinDirty(false);
      setFormValid(true);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (initialValuesForm.color.length === 0) {
      setColorFormDirty(true);
      setFormValid(false);
    } else {
      setColorFormDirty(false);
      setFormValid(true);
    }
    if (initialValuesForm.location.length === 0) {
      setLocationFormDirty(true);
      setFormValid(false);
    } else {
      setLocationFormDirty(false);
      setFormValid(true);
    }
    if (initialValuesForm.vin.length !== VIN_LENGTH) {
      setVinFormDirty(true);
      setFormValid(false);
    } else {
      setVinFormDirty(false);
      setFormValid(true);
    }

    if (colorDirty && locationDirty && vinDirty) {
      arr.push({
        id: arr.length,
        car: initialValuesForm.value,
        model: initialValuesForm.model,
        color: initialValuesForm.color,
        location: initialValuesForm.location,
        vin: initialValuesForm.vin,
      });
      setInitialValuesForm({
        value: 'Audi',
        model: 'Cabriolet',
        color: '',
        location: '',
        vin: '',
      });
      setAddCard(true);
      setColorDirty(false);
      setLocationDirty(false);
      setVinDirty(false);
    } else {
      setAddCard(false);
    }
    setArr(arr);
    event.preventDefault();
  };

  return (
    <div className="container">
      {addCard && <p style={{ color: 'green' }}>You added a car</p>}
      <div className="form">
        <form className="forms" onSubmit={handleSubmit}>
          <h4>Add your car</h4>
          <label>
            Pick your Car:
            <select value={initialValuesForm.value} onChange={handleCarsChange}>
              {' '}
              {UniqueStateCars.map((element) => {
                return (
                  <option key={UniqueStateCars.indexOf(element)} value={element.toLowerCase()}>
                    {element}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Pick your Model:
            <select value={initialValuesForm.model} onChange={handleModelsChange}>
              {' '}
              {UniqueStateModels.map((element) => {
                return (
                  <option key={UniqueStateModels.indexOf(element)} value={element.toLowerCase()}>
                    {element}
                  </option>
                );
              })}
            </select>
          </label>
          <label>
            Color:
            <input
              autoComplete="off"
              name="color"
              type="text"
              value={initialValuesForm.color}
              onChange={handleColorChange}
            />
          </label>
          <div style={{ color: 'red' }}>{colorFormDirty && <p>Incorrect color</p>}</div>
          <label>
            Location:
            <input
              autoComplete="off"
              name="location"
              type="text"
              value={initialValuesForm.location}
              onChange={handleLocationChange}
            />
          </label>
          <div style={{ color: 'red' }}>{locationFormDirty && <p>Incorrect location</p>}</div>
          <label>
            Your Car VIN:
            <input
              autoComplete="off"
              name="vin"
              type="text"
              value={initialValuesForm.vin}
              onChange={handleVinChange}
            />
          </label>
          <div style={{ color: 'red' }}>
            {vinFormDirty && <p>Incorrect machine VIN(17 characters)</p>}
          </div>
          <input disabled={!formValid} type="submit" value="Submit" />
        </form>
      </div>
      <div className="cards">
        {arr.map((forms) => (
          <CardsForm key={forms.id} form={forms} />
        ))}
      </div>
    </div>
  );
};

export default Forms;
