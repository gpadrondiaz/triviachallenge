import * as React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { AllHtmlEntities } from 'html-entities';

import { withRedux } from '../utils/ReduxUtils';
import * as TriviaActions from '../actions/TriviaActions';

import '../../../styles/question.scss';

const entities = new AllHtmlEntities();
const Question = ({ category, question, answerQuestion }) => {
  return (
    <div className="question">
      <h1>{category}</h1>
      <h2>{entities.decode(question)}</h2>
      <p className="response">
        <button className="trivia-button" onClick={() => answerQuestion('True')}>
          True
        </button>
        <button className="trivia-button" onClick={() => answerQuestion('False')}>
          False
        </button>
      </p>
    </div>
  );
};

Question.propTypes = {
  category: PropTypes.string.isRequired,
  question: PropTypes.string.isRequired,
  answerQuestion: PropTypes.func.isRequired,
};

@withRouter
@withRedux()
export default class Questions extends React.Component {
  static propTypes = {
    questions: PropTypes.array,
    answerQuestion: PropTypes.func.isRequired,
    questionIndex: PropTypes.number.isRequired,
    history: PropTypes.object.isRequired,
    restartTrivia: PropTypes.func.isRequired,
  };

  static mapStateToProps(state) {
    return {
      questions: state.trivia.questions,
      questionIndex: state.trivia.questionIndex,
    };
  }

  static mapDispatchToProps(dispatch) {
    return {
      answerQuestion: (answer, index) => dispatch(TriviaActions.setAnswer(answer, index)),
      restartTrivia: () => dispatch(TriviaActions.restartTrivia()),
    };
  }

  answerQuestion = answer => {
    const questionIndex = this.props.questionIndex;
    this.props.answerQuestion(answer, questionIndex);
    if (questionIndex == this.props.questions.length - 1) {
      this.props.history.push('/results');
    }
  };

  componentWillUnmount() {
    if (this.props.history.action === 'POP') {
      this.props.restartTrivia();
    }
  }

  render() {
    const { questionIndex, questions } = this.props;
    const { category, question } = questions[questionIndex];
    const progress = `${parseInt(questionIndex) + 1} / ${this.props.questions.length}`;
    return (
      <div className="quiz">
        <Question category={category} question={question} answerQuestion={this.answerQuestion} />
        <p className="progress">{progress}</p>
      </div>
    );
  }
}
