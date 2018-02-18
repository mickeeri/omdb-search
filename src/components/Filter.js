import React from 'react';
import { Input, Form, SearchButton } from './styles';

const Filter = ({}) => (
  <Form>
    <Input placeholder="Enter searchword" />
    <SearchButton type="submit">Search</SearchButton>
  </Form>
);

export default Filter;
