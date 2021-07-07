/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import _ from 'lodash';
import { recipeListFactory } from '../../../__mocks__/recipe';
import useRenderDuration from '../hooks/useRenderDuration';

const data = recipeListFactory(100);

export default function MemoDemo() {
  const [search, setSearch] = useState('');

  const sortedData = useMemo(() => {
    return _.sortBy(data, 'name').filter(({ name }) =>
      search ? name.includes(search) : true
    );
  }, [search]);

  useEffect(() => {
    console.log('sortedData changed');
  }, [sortedData]);

  // const renderDuration = useRenderDuration();

  // const ref = useRef();

  const renderCount = useRef(0);
  // const [renderCount, setRenderCount] = useState(0);
  useEffect(() => {
    // renderCount += 1;
    // setRenderCount((c) => c + 1);
    renderCount.current += 1;
  });

  console.log('renderCount', renderCount.current);

  return (
    <>
      {/* <p>Component is rendered for {renderDuration} seconds</p> */}
      {/* <SearchBar ref={ref} />
      <Button
        onClick={() => {
          ref.current.reset();
        }}
      >
        Reset
      </Button> */}
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Cook Time</th>
            <th>Servings</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((recipe) => (
            <tr key={recipe._id}>
              <td>{recipe._id}</td>
              <td>{recipe.name}</td>
              <td>{recipe.cookTimeMinutes}</td>
              <td>{recipe.servings}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  reset = () => {
    this.setState({ search: '' });
  };

  setSearch = (v) => {
    this.setState({ search: v });
  };

  render() {
    const { search } = this.state;
    return (
      <input
        type="text"
        value={search}
        onChange={(e) => this.setSearch(e.target.value)}
      />
    );
  }
}
