import { getGameApi, setToken } from '.';
import { fetchGame, fetchToken, getTokenLocalStorage } from '../server';

export const setLoginToken = () => async (dispatch) => {
  const token = await fetchToken();

  dispatch(setToken(token.token));
};

export const getGameApiThunk = () => async (dispatch) => {
  const token = getTokenLocalStorage();
  const gameApi = await fetchGame(token);

  dispatch(getGameApi(gameApi));
};
