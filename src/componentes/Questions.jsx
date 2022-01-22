import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Time from './Time';
import audioValid from '../audio/valid.mp3';
import audioError from '../audio/error.mp3';

const music = new Audio(audioValid);
const erro = new Audio(audioError);

export default class Questions extends Component {
  playMusic = (answer) => {
    const { results, page } = this.props;
    if (answer === results[page].correct_answer) {
      music.play();
    } else {
      erro.play();
    }
  }

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
      <div
        className="flex items-start w-full p-3 pb-9"
      >
        { results && code === 0 ? (
          <div className="flex flex-col flex-auto justify-center items-center w-full">
            <div className="flex justify-between items-center w-9/12 text-gray-200">
              <h2
                className="my-2.5 text-5xl font-bebas sm:text-lg"
                data-testid="question-category"
              >
                {decodeURIComponent(results[page].category)}
              </h2>

              <Time
                disableButtons={ disableButtons }
                startTime={ startTime }
                changeStartTime={ changeStartTime }
              />
            </div>

            <div className="text-xl bg-gray-100 my-6 p-14 sm:p-6 w-9/12 rounded-2xl">
              <p
                data-testid="question-text"
                className="break-all text-center"
              >
                {decodeURIComponent(results[page].question)}
              </p>
            </div>

            <div data-testid="answer-options" className="flex flex-col w-9/12">
              {answers && answers.map((answer = '', index) => (
                <button
                  key={ index }
                  className={
                    `text-white text-xl
                    bg-violet-700 hover:bg-evergreen hover:text-black font-medium 
                    rounded-lg text-sm px-4 py-4 
                    text-center mr-2 mb-2 cursor-pointer
                    my-2.5 w-full break-all 
                    ${answer === results[page].correct_answer ? valid : error}`
                  }
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
                    this.playMusic(answer);
                  } }
                >
                  {decodeURIComponent(answer)}

                </button>
              ))}
            </div>

            {
              nextDisable && (
                <button
                  className="text-white bg-gradient-to-r from-purple-500 via-purple-600
                  to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300
                  dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg
                  dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5
                  text-center mr-2 mb-2"
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
