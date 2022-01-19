import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRankingLocalStorage } from '../server';
import goldMedal from '../img/medalha_ouro.png';
import silverMedal from '../img/medalha_prata.png';
import bronzeMedal from '../img/medalha_bronze.png';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    const NEGATIVEORDER = -1;

    return (
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 min-h-screen pt-4">
        <h1
          data-testid="ranking-title"
          className="text-center text-4xl text-white font-bold"
        >
          Ranking
        </h1>
        <div>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
            className="text-white ml-10 font-bold text-lg"
          >
            {'<-- Login'}
          </button>
        </div>
        <div className="flex justify-center w-full">
          <ul className="flex flex-col items-center bg-white bg-opacity-5 w-4/6 rounded-3xl py-6 mb-4">
            { JSON.parse(getRankingLocalStorage()).sort((a, b) => {
              if (a.score < b.score) {
                return 1;
              }
              if (a.score > b.score) {
                return NEGATIVEORDER;
              }
              return 0;
            }).map((obj, key) => (
              <div
                key={ key }
                className="flex mb-4 gap-4 text-xl text-white bg-gradient-to-r from-gray-800 to-gray-900 w-4/5 rounded-full"
              >
                <li>
                  <img
                    src={ obj.picture }
                    alt=""
                    className="rounded-full"
                  />

                </li>
                <div className="flex justify-between items-center w-4/5">
                  <li
                    data-testid={ `player-name-${key}` }
                    className="w-14 text-ellipsis"
                  >
                    {obj.nome}
                  </li>

                  {key === 0 && <li><img src={ goldMedal } alt="" className="w-8" /></li>}

                  {key === 1
                    && <li><img src={ silverMedal } alt="" className="w-8" /></li>}

                  {key === 2
                    && <li><img src={ bronzeMedal } alt="" className="w-9" /></li>}

                  <li data-testid={ `player-score-${key}` }>{obj.score}</li>
                </div>
              </div>))}
          </ul>
        </div>
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
