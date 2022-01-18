import { combineReducers } from 'redux';

import player from './player';
import token from './token';
import gameApi from './game';

const rootReducers = combineReducers({ player, token, gameApi });

export default rootReducers;
