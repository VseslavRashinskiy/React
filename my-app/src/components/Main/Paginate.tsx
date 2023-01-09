import React from 'react';
import ReactPaginate from 'react-paginate';
import { Info } from './Main';

const Pagination: React.FunctionComponent<{
  startPage: string | null;
  info: Info;
  onChangePage: (number: number) => void;
}> = ({ onChangePage, info, startPage }) => {
  return (
    <ReactPaginate
      className="root"
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={10}
      pageCount={info.pages}
      forcePage={Number(startPage) - 1}
      previousLabel="<"
    />
  );
};
export default Pagination;
