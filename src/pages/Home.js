import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import RecipeListCard from '../components/recipe/RecipeListCard';
import MockDataService from '../services/MockDataService';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
    };
  }

  addRecipe = () => {
    const { recipeList } = this.state;
    const recipe = MockDataService.generateRecipe();

    this.setState({
      recipeList: [recipe, ...recipeList],
    });
  };

  render() {
    const { recipeList } = this.state;
    return (
      <>
        <h1>Recipe List</h1>
        <Button onClick={this.addRecipe}>Add recipe</Button>
        <Row>
          {recipeList.map((recipe) => (
            <Col key={recipe._id} lg="3" md="4" sm="6" xs="6" className="mb-4">
              <RecipeListCard recipe={recipe} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}
