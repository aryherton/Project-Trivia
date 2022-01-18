import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRankingLocalStorage } from '../server';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const NEGATIVEORDER = -1;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <div>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
          >
            Login
          </button>
        </div>
        <ul>
          { JSON.parse(getRankingLocalStorage()).sort((a, b) => {
            if (a.score < b.score) {
              return 1;
            }
            if (a.score > b.score) {
              return NEGATIVEORDER;
            }
            return 0;
          }).map((obj, key) => (
            <div key={ key }>
              <li><img src={ obj.picture } alt="" /></li>
              <li data-testid={ `player-name-${key}` }>{obj.nome}</li>
              <li data-testid={ `player-score-${key}` }>{obj.score}</li>
            </div>))}
        </ul>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);
