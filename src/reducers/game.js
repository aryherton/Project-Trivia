import { GET_GAME_API } from '../action';

const INITIAL_STATE = {
  payload: '',
};

const gameApi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_GAME_API:
    return { ...action.payload };

  default:
    return state;
  }
};

export default gameApi;
