import Axios from 'axios';
import * as TriviaConstants from '../constants/TriviaConstants';

const API_URL = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const getQuestionsStart = () => ({
  type: TriviaConstants.TRIVIA_QUESTIONS_GET_REQUESTED,
});

const getQuestionsError = () => ({
  type: TriviaConstants.TRIVIA_QUESTIONS_GET_ERROR,
});

const getQuestionsSuccessful = ({ results }) => ({
  type: TriviaConstants.TRIVIA_QUESTIONS_GET_SUCCESSFUL,
  payload: results,
});

export const getTriviaQuestions = () => (dispatch) => {
  dispatch(getQuestionsStart());

  return Axios.get(API_URL)
    .then(response => response.data)
    .then(data => dispatch(getQuestionsSuccessful(data)))
    .catch(() => getQuestionsError());
};

export const setAnswer = (answer, index) => ({
  type: TriviaConstants.TRIVIA_SET_ANSWER,
  answer,
  index,
});

export const restartTrivia = () => ({
  type: TriviaConstants.TRIVIA_RESTART,
});
