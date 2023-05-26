import React, { useEffect, useState } from 'react';
import { SearchBar } from './Search';
import SingleCards from './SingleCard';
import Categories from './Categories';
import Pagination from './Paginate';
import {
  fetchData,
  fetchHandleSearchDataChange,
  fetchOnChangePage,
  fetchOnClickCategory,
} from 'store/todoSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

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
  const todos = useAppSelector((state) => state.todos);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleSearchTermChange = (searchTerm: string) => {
    localStorage.setItem('Term', searchTerm);
    localStorage.setItem('Response', todos.response + searchTerm);
    setSearchTerm(searchTerm);
  };

  const handleSearchDataChange = () => {
    if (localStorage.getItem('Page')) {
      localStorage.setItem('Page', String(1));
    }
    dispatch(fetchHandleSearchDataChange(searchTerm));
  };

  const onClickCategory = (id: string) => {
    if (localStorage.getItem('Page')) {
      localStorage.setItem('Page', String(1));
    }
    if (id === 'all') {
      id = '';
    }
    localStorage.setItem('Response', todos.response + id);
    localStorage.setItem('Id', id);
    dispatch(fetchOnClickCategory(id));
  };

  const onChangePage = (currentPage: number) => {
    localStorage.setItem('Response', todos.response + currentPage);
    localStorage.setItem('Page', String(currentPage));
    dispatch(fetchOnChangePage(currentPage));
  };

  return (
    <div className="main">
      <Categories onClickCategory={(id) => onClickCategory(id)} />
      <SearchBar
        searchTerm={searchTerm}
        handleSearchTermChange={handleSearchTermChange}
        handleSearchDataChange={handleSearchDataChange}
      />
      <div className="cards">
        {todos.loading ? (
          <h1>
            Loading <img height={22} src="https://i.ibb.co/RpSP280/6.gif"></img>
          </h1>
        ) : (
          (todos.error &&
            todos.results.results.map((item) => <SingleCards key={item.id} item={item} />)) || (
            <h1>Not Found</h1>
          )
        )}
      </div>
      <Pagination
        startPage={localStorage.getItem('Page')}
        info={todos.results.info}
        onChangePage={(number) => onChangePage(number)}
      />
    </div>
  );
};

export default Main;
