import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '../componentes/Header';
import FeedbackScore from '../componentes/FeedbackScore';
import audioValid from '../audio/ranking.mp3';
// import audioError from '../audio/ranking_erro.mp3';
import { getTokenLocalStorage } from '../server';

import VideoError from '../componentes/VideoError';

const music = new Audio(audioValid);
// const erro = new Audio(audioError);
const WELLDONE = 'Well Done!';

class Feedback extends Component {
  getMessage = (punctuation) => {
    const MESSAGE_01 = 'Could be better...';
    const MESSAGE_02 = WELLDONE;
    const NUMBER = 3;
    const RETURNED_MENSAGE = (punctuation < NUMBER) ? MESSAGE_01 : MESSAGE_02;

    return RETURNED_MENSAGE;
  };

  playMusic = (punctuation) => {
    const message = this.getMessage(punctuation);

    if (message === WELLDONE) {
      music.play();
    } /* else {
      erro.play();
    } */

    return message;
  }

  redirectPage = (path) => {
    const { history } = this.props;
    history.push(path);
  };

  render() {
    const { history, assertions } = this.props;
    return (
      getTokenLocalStorage() ? (
        <div
          className="
          flex flex-col items-center
          min-h-screen
          bg-ultra-purple"
        >
          <Header />
          <div className="flex justify-end items-center">
            <FeedbackScore
              playMusic={ this.playMusic }
              redirectPage={ this.redirectPage }
            />
          </div>
          <aside
            className="absolute top-1/3 left-2/3"
          >
            { this.getMessage(assertions) !== WELLDONE && <VideoError /> }
          </aside>
        </div>
      ) : (<div>{history.push('/NotFound')}</div>)
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,

});

Feedback.propTypes = { history: PropTypes.object }.isRequired;

export default connect(mapStateToProps)(Feedback);
