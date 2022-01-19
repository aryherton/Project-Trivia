import React, { Component } from 'react';
import { getRankingLocalStorage } from '../server';

export default class RankingScores extends Component {
  render() {
    const NEGATIVEORDER = -1;
    return (
      <div className="flex flex-col">
        <h2 className="my-0 mx-auto py-11">Ranking</h2>
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
            <div key={ key } className="grid grid-cols-3 items-center my-6">
              <li>
                <img src={ obj.picture } alt="" className="rounded-full w-4 mx-5" />
              </li>
              <li
                data-testid={ `player-name-${key}` }
              >
                {obj.nome}
              </li>
              <li
                data-testid={ `player-score-${key}` }
              >
                {obj.score}
              </li>
            </div>))}
        </ul>
      </div>
    );
  }
}
