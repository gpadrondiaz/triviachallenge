import * as React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { AllHtmlEntities } from 'html-entities';

import { withRedux } from '../utils/ReduxUtils';
import * as TriviaActions from '../actions/TriviaActions';

import '../../../styles/result.scss';

const entities = new AllHtmlEntities();
const Result = ({ question, isCorrect }) => (
  <div className={`result ${isCorrect ? 'correct' : 'incorrect'}`}>
    <div className="icon">{isCorrect ? '+' : '-'}</div>
    <div className="question">{entities.decode(question)}</div>
  </div>
);

Result.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  question: PropTypes.string.isRequired,
};

@withRouter
@withRedux()
export default class Results extends React.Component {
  static propTypes = {
    questions: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired,
    restartTrivia: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  static mapStateToProps(state) {
    return {
      questions: state.trivia.questions,
      score: state.trivia.score,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      restartTrivia: () => dispatch(TriviaActions.restartTrivia()),
    };
  }

  componentWillUnmount() {
    this.props.restartTrivia();
    this.props.history.push('/home');
  }

  render() {
    const { questions, score } = this.props;

    const results = questions.map((question, i) => (
      <Result key={i} question={question.question} isCorrect={question.isCorrect} />
    ));

    return (
      <div className="results">
        <h1>
          You scored {score} / {questions.length}
        </h1>
        <div className="questions">{results}</div>
        <p>
          <Link className="trivia-button" to="/">
            PLAY AGAIN?
          </Link>
        </p>
      </div>
    );
  }
}
