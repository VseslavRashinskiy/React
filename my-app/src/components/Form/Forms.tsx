import { VIN_LENGTH } from 'components/constant/Сonstant';
import React from 'react';
import STATE from '../constant/Cars';
import CardsForm from './CardsForm';

export interface CardsState {
  id: number;
  car: string;
  model: string;
  color: string;
  vin: string;
  location: string;
}

interface FormsState {
  initialValuesForm: {
    value: string;
    model: string;
    color: string;
    location: string;
    vin: string;
  };
  colorFormDirty: boolean;
  vinFormDirty: boolean;
  locationFormDirty: boolean;
  colorDirty: boolean;
  vinDirty: boolean;
  locationDirty: boolean;
  formValid: boolean;
  addCard: boolean;
  arr: Array<CardsState>;
}

interface FormsProps {}

const StateCars = STATE.cars.map((el) => el.car);
const StateModels = STATE.cars.map((el) => el.car_model);
const UniqueStateModels = Array.from(new Set(StateModels));
const UniqueStateCars = Array.from(new Set(StateCars));

class Forms extends React.Component<FormsProps, FormsState> {
  constructor(props: FormsProps) {
    super(props);
    this.state = {
      initialValuesForm: {
        value: 'Audi',
        model: 'Cabriolet',
        color: '',
        location: '',
        vin: '',
      },
      colorFormDirty: false,
      locationFormDirty: false,
      vinFormDirty: false,
      colorDirty: false,
      locationDirty: false,
      vinDirty: false,
      formValid: false,
      addCard: false,
      arr: [],
    };

    this.handleCarsChange = this.handleCarsChange.bind(this);
    this.handleModelsChange = this.handleModelsChange.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleVinChange = this.handleVinChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCarsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        initialValuesForm: {
          ...prevState.initialValuesForm,
          value: event.target.value,
        },
      };
    });
  }

  handleModelsChange(event: React.ChangeEvent<HTMLSelectElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        initialValuesForm: {
          ...prevState.initialValuesForm,
          model: event.target.value,
        },
      };
    });
  }

  handleColorChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        initialValuesForm: {
          ...prevState.initialValuesForm,
          color: event.target.value,
        },
      };
    });
    if (event.target.value === '') {
      this.setState({ colorDirty: false, formValid: false });
    } else {
      this.setState({ colorDirty: true, formValid: true });
    }
  }

  handleLocationChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        initialValuesForm: {
          ...prevState.initialValuesForm,
          location: event.target.value,
        },
      };
    });
    if (event.target.value === '') {
      this.setState({ locationDirty: false, formValid: false });
    } else {
      this.setState({ locationDirty: true, formValid: true });
    }
  }

  handleVinChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState((prevState) => {
      return {
        ...prevState,
        initialValuesForm: {
          ...prevState.initialValuesForm,
          vin: event.target.value,
        },
      };
    });
    if (event.target.value.length === VIN_LENGTH) {
      this.setState({ vinDirty: true });
    } else {
      this.setState({ vinDirty: false, formValid: true });
    }
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    if (this.state.initialValuesForm.color.length === 0) {
      this.setState({ colorFormDirty: true, formValid: false });
    } else {
      this.setState({ colorFormDirty: false, formValid: true });
    }
    if (this.state.initialValuesForm.location.length === 0) {
      this.setState({ locationFormDirty: true, formValid: false });
    } else {
      this.setState({ locationFormDirty: false, formValid: true });
    }
    if (this.state.initialValuesForm.vin.length !== VIN_LENGTH) {
      this.setState({ vinFormDirty: true, formValid: false });
    } else {
      this.setState({ vinFormDirty: false, formValid: true });
    }

    if (this.state.colorDirty && this.state.locationDirty && this.state.vinDirty) {
      this.state.arr.push({
        id: this.state.arr.length,
        car: this.state.initialValuesForm.value,
        model: this.state.initialValuesForm.model,
        color: this.state.initialValuesForm.color,
        location: this.state.initialValuesForm.location,
        vin: this.state.initialValuesForm.vin,
      });
      this.setState({
        initialValuesForm: {
          value: 'Audi',
          model: 'Cabriolet',
          color: '',
          location: '',
          vin: '',
        },
        addCard: true,
        colorDirty: false,
        locationDirty: false,
        vinDirty: false,
      });
    } else {
      this.setState({ addCard: false });
    }
    this.setState({ arr: this.state.arr });
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        {this.state.addCard && <p style={{ color: 'green' }}>You added a car</p>}
        <div className="form">
          <form className="forms" onSubmit={this.handleSubmit}>
            <h4>Add your car</h4>
            <label>
              Pick your Car:
              <select value={this.state.initialValuesForm.value} onChange={this.handleCarsChange}>
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
              <select value={this.state.initialValuesForm.model} onChange={this.handleModelsChange}>
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
                value={this.state.initialValuesForm.color}
                onChange={this.handleColorChange}
              />
            </label>
            <div style={{ color: 'red' }}>
              {this.state.colorFormDirty && <p>Incorrect color</p>}
            </div>
            <label>
              Location:
              <input
                autoComplete="off"
                name="location"
                type="text"
                value={this.state.initialValuesForm.location}
                onChange={this.handleLocationChange}
              />
            </label>
            <div style={{ color: 'red' }}>
              {this.state.locationFormDirty && <p>Incorrect location</p>}
            </div>
            <label>
              Your Car VIN:
              <input
                autoComplete="off"
                name="vin"
                type="text"
                value={this.state.initialValuesForm.vin}
                onChange={this.handleVinChange}
              />
            </label>
            <div style={{ color: 'red' }}>
              {this.state.vinFormDirty && <p>Incorrect machine VIN(17 characters)</p>}
            </div>
            <input disabled={!this.state.formValid} type="submit" value="Submit" />
          </form>
        </div>
        <div className="cards">
          {this.state.arr.map((forms) => (
            <CardsForm key={forms.id} form={forms} />
          ))}
        </div>
      </div>
    );
  }
}

export default Forms;
