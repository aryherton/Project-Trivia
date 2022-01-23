import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Feedback extends Component {
  render() {
    const { score, assertions, history, playMusic } = this.props;
    return (
      <div
        className="
        flex flex-col justify-items-center justify-center
        max-w-xl min-h
        bg-conf bg-cover
        text-white
        shadow-2xl rounded-3xl
        shadow-gray-700"
      >
        <div
          className="flex flex-col text-center items-center"
        >
          <h1
            className="text-5xl p-10 font-bebas"
            data-testid="feedback-text"
          >
            {playMusic(assertions)}
          </h1>
          <div
            className="
            flex flex-col justify-center
            bg-yellow-500
            w-60 h-60
            rounded-full"
          >
            <span
              className="mt-12 text-8xl leading-10"
              data-testid="feedback-total-score"
            >
              {' '}
              { score }
            </span>
            <span
              className="font-bebas text-3xl p-5"
              data-testid="feedback-total-question"
            >
              Right awsers:
              {' '}
              { assertions }
            </span>
          </div>
        </div>
        <div className="flex m-10">
          <button
            className="w-full text-xl mt-5 text-white bg-gradient-to-r from-purple-500
          via-purple-600 to-purple-700 focus:bg-gradient-to-br hover:ring-4
          hover:ring-purple-300 dark:hover:ring-purple-800 shadow-lg
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
            className="
            w-full
            text-xl mt-5
            text-black
            bg-evergreen focus:bg-gradient-to-br
            from-evergreen via-teal-300 to -teal-600 hover:ring-4
            hover:ring-blue-300 dark:hover:ring-blue-800 shadow-lg
            shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
            font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            data-testid="btn-ranking"
            type="button"
            onClick={ () => history.push('/ranking') }
          >
            Ranking
          </button>
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
