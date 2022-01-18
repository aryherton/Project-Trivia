import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Time from './Time';

export default class Questions extends Component {
  render() {
    const {
      results,
      code,
      page,
      valid,
      error,
      alternativeButtonDisable,
      startTime,
      nextDisable,
      answers,
      testAnswersTestID,
      verifyAnswer,
      clickAnswer,
      setScoreRedux,
      disableButtons,
      changeStartTime,
      nextPage,
    } = this.props;
    return (
      <div>
        { results && code === 0 ? (
          <div>
            <h2 data-testid="question-category">{results[page].category}</h2>
            <p data-testid="question-text">{results[page].question}</p>

            <div data-testid="answer-options">
              {answers && answers.map((answer = '', index) => (
                <button
                  key={ index }
                  className={ answer === results[page].correct_answer ? valid : error }
                  data-testid={ testAnswersTestID(answer) }
                  type="button"
                  disabled={ alternativeButtonDisable }
                  onClick={ () => {
                    verifyAnswer(true);
                    clickAnswer(true);
                    setScoreRedux(
                      answer,
                      results[page].correct_answer,
                      results[page].difficulty,
                    );
                  } }
                >
                  {answer}

                </button>
              ))}
            </div>

            <Time
              disableButtons={ disableButtons }
              startTime={ startTime }
              changeStartTime={ changeStartTime }
            />

            {
              nextDisable && (
                <button
                  type="button"
                  data-testid="btn-next"
                  onClick={ () => {
                    nextPage();
                    clickAnswer(false);
                    verifyAnswer(false);
                    disableButtons(false);
                    changeStartTime(true);
                  } }
                >
                  Next
                </button>
              )
            }
          </div>
        ) : (
          null
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  code: PropTypes.number,
  page: PropTypes.number,
  valid: PropTypes.string,
  error: PropTypes.string,
  alternativeButtonDisable: PropTypes.bool,
  startTime: PropTypes.number,
  nextDisable: PropTypes.bool,
  answers: PropTypes.arrayOf(PropTypes.string),
  testAnswersTestID: PropTypes.func,
  verifyAnswer: PropTypes.func,
  clickAnswer: PropTypes.func,
  setScoreRedux: PropTypes.func,
  disableButtons: PropTypes.func,
  changeStartTime: PropTypes.func,
  nextPage: PropTypes.func,
}.isRequired;
