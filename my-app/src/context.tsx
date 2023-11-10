import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  handleSearchTermChange: (searchTerm: string) => void;
  handleSearchDataChange: () => void;
}

export const ContextMain = React.createContext<SearchBarProps>({
  searchTerm: '',
  handleSearchTermChange: () => {},
  handleSearchDataChange: () => {},
});
