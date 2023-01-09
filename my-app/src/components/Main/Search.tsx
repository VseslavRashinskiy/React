import { ContextMain } from 'context';
import React, { useContext } from 'react';

export const SearchBar = () => {
  const { searchTerm, handleSearchTermChange, handleSearchDataChange } = useContext(ContextMain);
  return (
    <div className="search">
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="text"
              placeholder="Search"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => handleSearchTermChange(e.target.value)}
            />
            <button
              data-testid="search"
              className="btn btn-outline-success"
              type="button"
              onClick={() => handleSearchDataChange()}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
