import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRankingLocalStorage } from '../server';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const NEGATIVEORDER = -1;

    return (
      <div className="bg-teal-600 min-h-screen pt-4">
        <h1 data-testid="ranking-title" className="text-center text-4xl text-white font-bold">Ranking</h1>
        <div>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
            className="w-0/5 mt-5 ml-6 text-white bg-gradient-to-r from-purple-500
            via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4
            focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg
            shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
            font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Login
          </button>
        </div>
        <ul className="flex flex-col items-center">
          { JSON.parse(getRankingLocalStorage()).sort((a, b) => {
            if (a.score < b.score) {
              return 1;
            }
            if (a.score > b.score) {
              return NEGATIVEORDER;
            }
            return 0;
          }).map((obj, key) => (
            <div key={ key } className="flex mb-4 gap-4 bg-teal-300 w-3/6 rounded-full ">
              <li><img src={ obj.picture } alt="" className="rounded-full" /></li>
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
