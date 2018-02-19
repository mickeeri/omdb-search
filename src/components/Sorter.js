import React from 'react';
import { SortItem } from './styles';

const Sorter = ({ onSort, order: { title, year } }) => (
  <div>
    <SortItem
      active={title.active}
      asc={title.asc}
      onClick={() => {
        onSort('title');
      }}
    >
      Sort by title{' '}
    </SortItem>
    <SortItem
      active={year.active}
      asc={year.asc}
      onClick={() => {
        onSort('year');
      }}
    >
      Sort by year
    </SortItem>
  </div>
);

export default Sorter;
