/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import RecipeListCard from './RecipeListCard';

export default class RecipeListGrid extends Component {
  renderCount = 0;

  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      currentScrollY: 0,
    };
  }

  componentDidMount() {
    console.log('component did mount', this.renderCount);
    // this.intervalId = setInterval(() => {
    //   // console.log('interval call');
    //   this.setState({ currentDate: new Date() });
    // }, 1000);

    document.addEventListener('scroll', this.updateScrollY);

    // setTimeout(() => {
    //   this.setState({
    //     currentDate: null,
    //   });
    // }, 5000);
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   const { recipeList } = this.props;
  //   // const { currentScrollY, currentDate } = this.state;
  //   const recipeListChanged = recipeList !== nextProps.recipeList;
  //   // const scrollChanged = nextState.currentScrollY !== currentScrollY;
  //   // const currentDateChanged = nextState.currentDate !== currentDate;

  //   if (recipeListChanged) {
  //     return true;
  //   }

  //   return false;
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('component did update', this.renderCount);
    // console.log('props', prevProps, this.props);
    // console.log('state', prevState, this.state);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.updateScrollY);
    console.log('component will unmount', this.renderCount);
    clearInterval(this.intervalId);
  }

  updateScrollY = () => {
    this.setState({
      currentScrollY: document.documentElement.scrollTop,
    });
  };

  // componentDidUpdate() {

  // }

  render() {
    this.renderCount += 1;
    console.log('render', this.renderCount);

    const { recipeList } = this.props;
    const { currentDate, currentScrollY } = this.state;
    return (
      <>
        <div>{currentDate.toLocaleTimeString()}</div>
        <div>{currentScrollY}</div>

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
