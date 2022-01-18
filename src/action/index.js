export const SET_PLAYER = 'SET_PLAYER';
export const SET_TOKEN = 'SET_TOKEN';
export const GET_GAME_API = 'GET_GAME_API';
export const SET_SCORE = 'SET_SCORE';

export const setPlayer = ({ nome, gravatarEmail }) => ({
  type: SET_PLAYER,
  payload: { nome, gravatarEmail },
});

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const getGameApi = (payload) => ({
  type: GET_GAME_API,
  payload,
});

export const setScore = (score, assertions) => (
  { type: SET_SCORE, score, assertions });
