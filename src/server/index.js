import md5 from 'crypto-js/md5';

export const fetchToken = async () => {
  const URL = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(URL);
  const data = await response.json();

  return data;
};

const urlApiGame = 'https://opentdb.com/api.php?amount=5&token=';

export const getConfigLocalStorage = () => JSON.parse(localStorage.getItem('config'));

export const fetchGame = async (token) => {
  const configLocalStorage = getConfigLocalStorage();
  if (configLocalStorage) {
    const { category, difficulty, type } = configLocalStorage;
    const configUrl = `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}&encode=url3986&token=${token}`;
    console.log(configLocalStorage);
    const response = await fetch(configUrl);
    const data = await response.json();

    return data;
  }
  const response = await fetch(`${urlApiGame}${token}`);
  const data = await response.json();

  return data;
};
// LocalStorage
export const setTokenLocalStorage = (token) => {
  localStorage.setItem('token', token);
};

export const getRankingLocalStorage = () => localStorage.getItem('ranking');

export const setRankingLocalStorage = ({ nome, email, score }) => {
  const myScore = JSON.parse(getRankingLocalStorage());
  const objScore = myScore === null ? [] : myScore;
  const picture = `https://www.gravatar.com/avatar/${md5(email).toString()}`;
  objScore.push({ nome, score, picture });
  localStorage.setItem('ranking', JSON.stringify(objScore));
};

export const getTokenLocalStorage = () => localStorage.getItem('token');

export const getScoreLocalStorage = () => localStorage.getItem('score');

export const setConfigLocalStorage = (arrConfig) => {
  localStorage.setItem('config', JSON.stringify(arrConfig));
};
