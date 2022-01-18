import { SET_PLAYER, SET_SCORE } from '../action';

const INITIAL_STATE = {
  nome: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',

};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER:
    return {
      nome: action.payload.nome,
      gravatarEmail: action.payload.gravatarEmail,
      score: 0,
      assertions: 0,
    };
    /* return { ...state,
      nome: action.payload.nome,
      gravatarEmail: action.payload.gravatarEmail }; */
  case SET_SCORE:
    return { ...state, score: action.score, assertions: action.assertions };
  default:
    return state;
  }
};

export default player;
