import React from 'react';
import { SearchBar } from './Search';
import STATE from '../constant/Cars';
import CarCards from './CarsCard';

export interface DataCarsProps {
  cars: {
    id: number;
    car: string;
    car_model: string;
    color: string;
    car_vin: string;
    location: string;
  }[];
}

export interface CarsState {
  value: DataCarsProps;
  searchTerm: string;
}

export interface CarsProps {}

class Main extends React.Component<CarsProps, CarsState> {
  constructor(props: CarsProps) {
    super(props);
    this.state = {
      value: STATE,
      searchTerm: '',
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
  }

  componentDidMount() {
    if (typeof localStorage.getItem('Term') === 'string') {
      this.setState({ searchTerm: String(localStorage.getItem('Term')) });
    }
  }

  handleSearchTermChange = (searchTerm: string): void => {
    localStorage.setItem('Term', searchTerm);
    this.setState({ searchTerm });
  };

  render() {
    return (
      <div className="main">
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleSearchTermChange={this.handleSearchTermChange}
        />
        <div className="cards">
          {this.state.value.cars
            .filter(
              (i) =>
                i.car
                  .toLowerCase()
                  .split(' ')
                  .join('')
                  .indexOf(this.state.searchTerm.toLowerCase().split(' ').join('')) != -1
            )
            .map((cars) => (
              <CarCards key={cars.id} cars={cars} />
            ))}
        </div>
      </div>
    );
  }
}

export default Main;
