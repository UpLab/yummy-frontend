/* eslint-disable no-nested-ternary */
import React from 'react';
import { Button } from 'react-bootstrap';
import RecipeListGrid from '../components/recipe/RecipeListGrid';
import MockDataService from '../services/MockDataService';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipeList: [],
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({
      hasError: true,
    });
  }

  addRecipe = () => {
    const { recipeList } = this.state;
    const recipe = MockDataService.generateRecipe();

    this.setState({
      recipeList: [recipe, ...recipeList],
    });
  };

  resetRecipes = () => {
    this.setState({ recipeList: [], hasError: false });
  };

  render() {
    const { recipeList, hasError } = this.state;
    return (
      <>
        <h1>Recipe List</h1>
        <Button onClick={this.addRecipe}>Add recipe</Button>
        <Button onClick={this.resetRecipes}>Reset</Button>
        {recipeList.length ? (
          hasError ? (
            <div>Oops. Component crashed. Please reload page</div>
          ) : (
            <RecipeListGrid recipeList={recipeList} />
          )
        ) : (
          <div>
            No recipes in your list. Please click on "Add recipe" button
          </div>
        )}
      </>
    );
  }
}
