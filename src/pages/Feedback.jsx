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
      <div>
        <Header />
        <h1>Feedback</h1>
        <div data-testid="feedback-text">{this.getMessage(assertions)}</div>
        <div data-testid="feedback-total-score">
          { score }
        </div>
        <div data-testid="feedback-total-question">{ assertions }</div>
        <div>
          <button
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <button
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
