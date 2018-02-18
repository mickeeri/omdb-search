import React, { Component } from 'react';
import { func, bool } from 'prop-types';
import { Input, Form, SearchButton, ClearButton } from './styles';

class Filter extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({ query: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.query);
  };

  render() {
    const { isFetching } = this.props;
    const { query } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input
          value={query}
          onChange={this.handleChange}
          placeholder="Enter searchword"
        />
        <SearchButton type="submit" disabled={isFetching}>
          {isFetching ? 'Searching ...' : 'Search'}
        </SearchButton>
      </Form>
    );
  }
}

Filter.propTypes = {
  isFetching: bool.isRequired,
  onSearch: func.isRequired,
};

export default Filter;
