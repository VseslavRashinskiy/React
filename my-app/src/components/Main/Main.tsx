import React, { useEffect, useState } from 'react';
import { SearchBar } from './Search';
import CarCards from './CarsCard';
import axios from 'axios';
import { ContextMain } from '../../context';
import Categories from './Categories';
import Pagination from './Paginate';

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface Data {
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
  const [info, setInfo] = useState<Info>({
    count: 826,
    next: 'https://rickandmortyapi.com/api/character/?page=2',
    pages: 42,
    prev: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErr, setIsErr] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState('https://rickandmortyapi.com/api/character/?name=');

  useEffect(() => {
    setIsLoaded(false);
    async function componentDidMount() {
      try {
        const result = await axios.get(response);
        setResults(result.data.results);
        setInfo(result.data.info);
        setIsLoaded(true);
        setIsErr(false);
      } catch (error) {
        setIsLoaded(true);
        setIsErr(true);
      }
      if (typeof localStorage.getItem('Term') === 'string') {
        setSearchTerm(String(localStorage.getItem('Term')));
      }
      if (typeof localStorage.getItem('Id') === 'string') {
        setCategoryId(String(localStorage.getItem('Id')));
      }
      if (typeof localStorage.getItem('Response') === 'string') {
        setResponse(
          `https://rickandmortyapi.com/api/character/?name=${
            localStorage.getItem('Term') ? localStorage.getItem('Term') : ''
          }&status=${localStorage.getItem('Id') ? localStorage.getItem('Id') : ''}&page=${
            localStorage.getItem('Page') ? localStorage.getItem('Page') : 1
          }`
        );
      }
    }
    componentDidMount();
  }, [response, categoryId, currentPage]);

  useEffect(() => {
    setIsLoaded(false);
  }, [response]);

  const handleSearchTermChange = (searchTerm: string) => {
    localStorage.setItem('Term', searchTerm);
    localStorage.setItem('Response', response + searchTerm);
    setSearchTerm(searchTerm);
  };

  const handleSearchDataChange = () => {
    if (typeof localStorage.getItem('Response') === 'string') {
      setResponse(
        'https://rickandmortyapi.com/api/character/?name=' + localStorage.getItem('Term')
      );
    }
    if (localStorage.getItem('Page')) {
      console.log(currentPage);
      localStorage.setItem('Page', String(1));
    }
  };

  const onClickCategory = (id: string) => {
    if (localStorage.getItem('Page')) {
      localStorage.setItem('Page', String(1));
    }
    if (id === 'all') {
      id = '';
    }
    localStorage.setItem('Response', response + id);
    localStorage.setItem('Id', id);
    setCategoryId(id);
  };

  const onChangePage = (number: number) => {
    localStorage.setItem('Response', response + number);
    localStorage.setItem('Page', String(number));
    setCurrentPage(number);
  };

  return (
    <ContextMain.Provider
      value={{
        searchTerm,
        handleSearchTermChange,
        handleSearchDataChange,
      }}
    >
      <div className="main">
        <Categories value={categoryId} onClickCategory={(id) => onClickCategory(id)} />
        <SearchBar />
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
        <Pagination
          startPage={localStorage.getItem('Page')}
          info={info}
          onChangePage={(number) => onChangePage(number)}
        />
      </div>
    </ContextMain.Provider>
  );
};

export default Main;
