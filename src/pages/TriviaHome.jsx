import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGameApiThunk, setLoginToken } from '../action/thunk';
import { setScore } from '../action';
import { setTokenLocalStorage, setRankingLocalStorage } from '../server';

import Header from '../componentes/Header';
import Questions from '../componentes/Questions';

let indice = 0;

class TriviaHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      valid: '',
      error: '',
      alternativeButtonDisable: false,
      startTime: true,
      nextDisable: false,
    };

    this.nextPage = this.nextPage.bind(this);
    this.testAnswersTestID = this.testAnswersTestID.bind(this);
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getGameApiThunk());
  }

  componentDidUpdate() {
    const { code, dispatch } = this.props;
    const FAIL = 3;

    if (code === FAIL) {
      dispatch(setLoginToken());
      this.setLocalStore();

      dispatch(getGameApiThunk());
    }
  }

  componentWillUnmount() {
    setRankingLocalStorage(this.props);
  }

  setLocalStore = () => {
    const { token } = this.props;

    setTokenLocalStorage(token);
  }

  disableButtons = (disable) => {
    const { alternativeButtonDisable } = this.state;

    if (alternativeButtonDisable !== disable) {
      this.setState({ alternativeButtonDisable: disable });
    }
  };

  changeStartTime = (enable) => {
    const { startTime } = this.state;

    if (enable !== startTime) {
      this.setState({ startTime: enable });
    }
  }

  randomQuestion = (a, b) => {
    while (b.length) {
      a.splice(Math.floor(Math.random() * (a.length + 1)), 0, b.pop());
    }

    return a;
  }

  verifyAnswer = (initialize = true) => {
    if (initialize) {
      this.setState({
        valid: 'valid',
        error: 'error',
      });
    } else {
      this.setState({
        valid: '',
        error: '',
      });
    }
  }

  clickAnswer = (show) => {
    this.setState({
      nextDisable: show,
    });
  }

  // Set "score total"(placar) no LocalStorage, e "score" no state Redux.
  setScoreRedux = (answer, correct, dificulty) => {
    const { dispatch, score, assertions } = this.props;
    let scoreTemp = score;
    let countAssertions = assertions;
    const time = document.getElementById('time').innerHTML;
    if (answer === correct) {
      countAssertions += 1;
      switch (dificulty) {
      case 'easy':
        scoreTemp += Number('10') + (Number(time) * Number('1'));
        dispatch(setScore(scoreTemp, countAssertions));
        break;
      case 'medium':
        scoreTemp += Number('10') + (Number(time) * Number('2'));
        dispatch(setScore(scoreTemp, countAssertions));
        break;
      default:
        scoreTemp += Number('10') + (Number(time) * Number('3'));
        dispatch(setScore(scoreTemp, countAssertions));
      }
    }
  };

  testAnswersTestID(answer) {
    const { results } = this.props;
    const { page } = this.state;

    let dataTestID = '';

    if (answer === results[page].correct_answer) {
      dataTestID = 'correct-answer';
    } else {
      dataTestID = `wrong-answer-${indice}`;

      indice += 1;
    }

    return dataTestID;
  }

  nextPage() {
    const { page } = this.state;
    const { history } = this.props;
    const MAXNUMBER = 4;

    if (page === MAXNUMBER) {
      history.push('/feedback');
    } else {
      this.setState((state) => {
        const pageNumber = { page: state.page += 1 };

        return pageNumber;
      });
    }
  }

  render() {
    const { results, code } = this.props;
    const {
      page,
      valid,
      error,
      alternativeButtonDisable,
      startTime,
      nextDisable,
    } = this.state;
    let answers = [];

    if (results && code === 0) {
      const wrongAnswer = [...results[page].incorrect_answers];
      const correctAnswer = [results[page].correct_answer];
      answers = this.randomQuestion(correctAnswer, wrongAnswer);
    }

    return (
      <>
        <Header />
        <Questions
          results={ results }
          code={ code }
          page={ page }
          valid={ valid }
          error={ error }
          alternativeButtonDisable={ alternativeButtonDisable }
          startTime={ startTime }
          nextDisable={ nextDisable }
          answers={ answers }
          testAnswersTestID={ this.testAnswersTestID }
          verifyAnswer={ this.verifyAnswer }
          clickAnswer={ this.clickAnswer }
          setScoreRedux={ this.setScoreRedux }
          disableButtons={ this.disableButtons }
          changeStartTime={ this.changeStartTime }
          nextPage={ this.nextPage }
        />
      </>
    );
  }
}

TriviaHome.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
  results: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    type: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    correct_answer: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
  })),
  code: PropTypes.number,
  token: PropTypes.string,
  // setScore: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  results: state.gameApi.results,
  code: state.gameApi.response_code,
  token: state.token,
  score: state.player.score,
  assertions: state.player.assertions,
  nome: state.player.nome,
  email: state.player.gravatarEmail,
});

export default connect(mapStateToProps)(TriviaHome);