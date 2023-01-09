import React, { useEffect, useState } from 'react';
import { SearchBar } from './Search';
import CarCards from './CarsCard';
import axios from 'axios';

interface Data {
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
}

const Main = () => {
  const [results, setResults] = useState<Data[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [response, setResponse] = useState('https://rickandmortyapi.com/api/character');

  useEffect(() => {
    async function componentDidMount() {
      try {
        const result = await axios.get(response);
        setResults(result.data.results);
        setIsLoaded(true);
        setIsErr(false);
      } catch (error) {
        setIsLoaded(true);
        setIsErr(true);
      }
      if (typeof localStorage.getItem('Term') === 'string') {
        setSearchTerm(String(localStorage.getItem('Term')));
      }
    }
    componentDidMount();
  }, [response]);

  useEffect(() => {
    setIsLoaded(false);
  }, [response]);

  const handleSearchTermChange = (searchTerm: string) => {
    localStorage.setItem('Term', searchTerm);
    localStorage.setItem('Response', response + '/?name=' + searchTerm);
    setSearchTerm(searchTerm);
  };

  const handleSearchDataChange = () => {
    if (typeof localStorage.getItem('Response') === 'string') {
      setResponse(
        'https://rickandmortyapi.com/api/character' + '/?name=' + localStorage.getItem('Term')
      );
    }
  };

  return (
    <div className="main">
      <SearchBar
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        handleSearchDataChange={handleSearchDataChange}
      />
      <div className="cards">
        {!isLoaded ? (
          <h1>
            Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif"></img>
          </h1>
        ) : (
          (!isErr && results.map((item) => <CarCards key={item.id} item={item} />)) || (
            <h1>Not Found</h1>
          )
        )}
      </div>
    </div>
  );
};

export default Main;
