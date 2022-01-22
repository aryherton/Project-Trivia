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
      <div className=" bg-ultra-purple pt-4 h-screen">
        <h1
          data-testid="ranking-title"
          className="text-center text-8xl text-white font-bebas"
        >
          Ranking
        </h1>
        <div>
          <button
            data-testid="btn-go-home"
            type="button"
            onClick={ () => history.push('/') }
            className="text-white ml-10 font-comic text-3xl"
          >
            &#8592;
            Login
          </button>
        </div>
        <div className="flex justify-center w-full">
          <ul
            className="flex flex-col items-center
            bg-conf bg-cover w-4/6 rounded-3xl py-6 mb-4
            shadow-2xl rounded-3xl shadow-gray-700"
          >
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
                className="flex mb-4 gap-4 text-xl text-white
                bg-gradient-to-r from-gray-800 to-gray-900 w-4/5 rounded-full"
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
