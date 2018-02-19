import React from 'react';
import { func, shape, bool } from 'prop-types';
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

Sorter.propTypes = {
  onSort: func.isRequired,
  order: shape({
    title: shape({ active: bool, asc: bool }),
    year: shape({ active: bool, asc: bool }),
  }),
};

export default Sorter;
