import * as TriviaConstants from '../constants/TriviaConstants';

const initialState = {
  loading: false,
  questions: [],
  questionIndex: 0,
  score: 0,
};

export default (state = initialState, action) => {
  const {
    type,
    payload,
    answer,
    index,
  } = action;

  switch (type) {
    case TriviaConstants.TRIVIA_QUESTIONS_GET_REQUESTED: {
      return {
        ...state,
        loading: true,
      };
    }
    case TriviaConstants.TRIVIA_QUESTIONS_GET_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case TriviaConstants.TRIVIA_QUESTIONS_GET_SUCCESSFUL: {
      return {
        ...state,
        loading: false,
        questions: payload,
      };
    }
    case TriviaConstants.TRIVIA_SET_ANSWER: {
      let { questions, questionIndex, score } = state;
      const isCorrect = questions[index].correct_answer === answer;

      if (index < questions.length - 1) {
        questionIndex = index + 1;
      }
      questions = [
        ...questions.slice(0, index),
        {
          ...questions[index],
          isCorrect,
        },
        ...questions.slice(index + 1),
      ];

      if (isCorrect) {
        score += 1;
      }

      return {
        ...state,
        questionIndex,
        questions,
        score,
      };
    }
    case TriviaConstants.TRIVIA_RESTART: {
      return {
        ...state,
        questions: [],
        questionIndex: 0,
        score: 0,
      };
    }
    default:
      return state;
  }
};
