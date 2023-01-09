import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => void;
  handleSearchDataChange: () => void;
}

export const SearchBar = (props: SearchBarProps) => {
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
              value={props.searchTerm}
              onChange={(e) => props.handleSearchTermChange(e.target.value)}
            />
            <button
              data-testid="search"
              className="btn btn-outline-success"
              type="button"
              onClick={() => props.handleSearchDataChange()}
            >
              Search
            </button>
          </form>
        </div>
      </nav>
    </div>
  );
};
