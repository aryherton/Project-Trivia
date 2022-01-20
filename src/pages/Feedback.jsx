import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../componentes/Header';

class Feedback extends Component {
  getMessage = (punctuation) => {
    const MESSAGE_01 = 'Could be better...';
    const MESSAGE_02 = 'Well Done!';
    const NUMBER = 3;
    const RETURNED_MENSAGE = (punctuation < NUMBER) ? MESSAGE_01 : MESSAGE_02;

    return RETURNED_MENSAGE;
  };

  render() {
    const { history, score, assertions } = this.props;
    return (
      <div
        className="
          flex flex-col items-center
          min-h-full
          h-screen
          bg-gradient-to-r from-purple-900 to-gray-900"
      >
        <Header />
        <div
          className="
            flex flex-col justify-items-center justify-center
            max-w-xl min-h-96
            bg-white
            shadow-xl rounded-3xl border"
        >
          <div
            className="flex flex-col text-center"
          >
            <h1
              className="text-5xl p-10"
              data-testid="feedback-text"
            >
              {this.getMessage(assertions)}
            </h1>
            <span className="text-2xl leading-10" data-testid="feedback-total-score">
              Score:
              {' '}
              { score }
            </span>
            <span className="text-2xl p-5" data-testid="feedback-total-question">
              Right awsers:
              {' '}
              { assertions }
            </span>
          </div>
          <div className="flex realtive m-20">
            <button
              className="w-full text-xl mt-5 text-white bg-gradient-to-r from-purple-500
              via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4
              focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg
              shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              data-testid="btn-play-again"
              type="button"
              onClick={ () => history.push('/') }
            >
              Play Again
            </button>
            <div />
            <button
              className="w-full mt-5 text-xl text-yellow-400 hover:text-white border
              border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300
              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
              dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white
              dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              data-testid="btn-ranking"
              type="button"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,

});

Feedback.propTypes = { history: PropTypes.object }.isRequired;

export default connect(mapStateToProps)(Feedback);
