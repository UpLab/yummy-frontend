/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeListCard from './RecipeListCard';

export default class RecipeListGrid extends Component {
  render() {
    const { recipeList } = this.props;
    return (
      <Row>
        {recipeList.map((recipe) => (
          <Col key={recipe._id} lg="3" md="4" sm="6" xs="6" className="mb-4">
            <RecipeListCard recipe={recipe} />
          </Col>
        ))}
      </Row>
    );
  }
}
