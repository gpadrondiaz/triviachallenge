import * as React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';

import { withRedux } from '../utils/ReduxUtils';
import * as TriviaActions from '../actions/TriviaActions';

@withRouter 
@withRedux() 
export default class Home extends React.Component {
  static propTypes = {
    questions: PropTypes.array,
    loading: PropTypes.bool,
    getQuestions: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  static defaultProps = {
    questions: [],
    loading: true,
  };

  static mapStateToProps(state) {
    return {
      questions: state.trivia.questions,
      loading: state.trivia.loading,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      getQuestions: () => dispatch(TriviaActions.getTriviaQuestions()),
    };
  }

  componentDidMount() {
    this.props.getQuestions();
  }

  startTrivia = () => {
    this.props.history.push('/questions');
  };

  render() {
    if (this.props.loading === true) {
      return (
        <div className="home">
          <Loader type="TailSpin" color="#3cf" />
          <p>Loading Quiz</p>
        </div>
      );
    } else {
      return (
        <div className="home">
          <h1>Welcome to the Trivia Challenge!</h1>
          <p>You will be presented with {this.props.questions.length} True or False questions.</p>
          <p>Can you score 100%?</p>
          <p>
            <button className="trivia-button" onClick={() => this.startTrivia()}>
              Begin
            </button>
          </p>
        </div>
      );
    }
  }
}
