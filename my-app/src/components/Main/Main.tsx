import React from 'react';
import { SearchBar } from './Search';
import STATE from '../constant/Cars';
import CarCards from './CarsCard';
import axios from 'axios';

interface DataCarsProps {
  cars: {
    id: number;
    car: string;
    car_model: string;
    color: string;
    car_vin: string;
    location: string;
  }[];
}

interface CarsState {
  results: {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: {
      name: string;
      url: string;
    };
    location: {
      name: string;
      url: string;
    };
    image: string;
    episode: Array<string>;
    url: string;
    created: string;
  }[];
  value: DataCarsProps;
  searchTerm: string;
  isLoaded: boolean;
  isErr: boolean;
  response: string;
}

export interface CarsProps {}

class Main extends React.Component<CarsProps, CarsState> {
  constructor(props: CarsProps) {
    super(props);
    this.state = {
      results: [],
      value: STATE,
      searchTerm: '',
      isLoaded: false,
      isErr: false,
      response: 'https://rickandmortyapi.com/api/character',
    };
    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSearchDataChange = this.handleSearchDataChange.bind(this);
  }

  async componentDidMount() {
    try {
      const response = await axios.get(this.state.response);
      this.setState({ results: response.data.results, isLoaded: true, isErr: false });
    } catch (error) {
      this.setState({ isLoaded: true, isErr: true });
    }
    if (typeof localStorage.getItem('Term') === 'string') {
      this.setState({ searchTerm: String(localStorage.getItem('Term')) });
    }
  }

  componentDidUpdate(prevProps: Readonly<CarsProps>, prevState: Readonly<CarsState>): void {
    if (prevState.response !== this.state.response) {
      this.setState({ response: this.state.response, isLoaded: false });
      this.componentDidMount();
    }
  }

  handleSearchTermChange = (searchTerm: string) => {
    localStorage.setItem('Term', searchTerm);
    localStorage.setItem('Response', this.state.response + '/?name=' + searchTerm);
    this.setState({ searchTerm });
  };

  handleSearchDataChange = () => {
    if (typeof localStorage.getItem('Response') === 'string') {
      this.setState({
        response:
          'https://rickandmortyapi.com/api/character' + '/?name=' + localStorage.getItem('Term'),
      });
    }
  };

  render() {
    return (
      <div className="main">
        <SearchBar
          searchTerm={this.state.searchTerm}
          handleSearchTermChange={this.handleSearchTermChange}
          handleSearchDataChange={this.handleSearchDataChange}
        />
        <div className="cards">
          {!this.state.isLoaded ? (
            <h1>
              Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif"></img>
            </h1>
          ) : (
            (!this.state.isErr &&
              this.state.results.map((item) => <CarCards key={item.id} item={item} />)) || (
              <h1>Not Found</h1>
            )
          )}
        </div>
      </div>
    );
  }
}

export default Main;
