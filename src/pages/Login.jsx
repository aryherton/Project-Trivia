import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setLoginToken } from '../action/thunk';
import { setTokenLocalStorage } from '../server';
import { setPlayer } from '../action';
import logo from '../trivia.png';
import ConfigTrivia from '../componentes/ConfigTrivia';
import ConfigInfo from '../componentes/ConfigInfo';

import audioValid from '../audio/button.mp3';

const music = new Audio(audioValid);

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: '',
      gravatarEmail: '',
      showConfig: false,
    };
  }

  componentDidMount() {
    // const { dispatch } = this.props;

    // dispatch(setLoginToken());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  checkButton = () => {
    const { nome, gravatarEmail } = this.state;

    const regex = /\S+@\S+\.\S+/;
    const validEmail = regex.test(gravatarEmail);

    if (validEmail && nome) {
      return false;
    }

    return true;
  }

  getApiToken = async () => {
    const { history, dispatch } = this.props;

    await dispatch(setLoginToken());
    this.setLocalStore();

    history.push('/triviahome');
  }

  setLocalStore = () => {
    const { token } = this.props;

    setTokenLocalStorage(token);
  }

  renderConfig = () => {
    const { showConfig } = this.state;
    const toggle = showConfig;
    this.setState({ showConfig: !toggle });
  }

  render() {
    const { nome, gravatarEmail, showConfig } = this.state;
    const { dispatch } = this.props;

    return (
      <div
        className="h-screen w-screen flex justify-center items-center
         bg-ultra-purple font-bebas text-zinc-900 text-2xl"
      >
        <div
          className="bg-royal-purple w-4/5 h-4/5 flex flex-row justify-center
          shadow-lg shadow-neutral-900 rounded-3xl"
        >
          <div
            className="w-2/5 px-8 py-8 h-full text-slate-50"
          >
            <h2 className="font-bold text-slate-50">SIGN IN</h2>
            <label
              htmlFor="nameUser"
              className="block font-bold mb-1 md:mb-0 mt-3.5"
            >
              Nome:
              <input
                id="nameUser"
                type="text"
                name="nome"
                value={ nome }
                onChange={ this.handleChange }
                data-testid="input-player-name"
                className="px-3 py-3 placeholder-blueGray-300 text-neutral-800
                relative bg-white bg-white rounded text-sm border-0 shadow
                outline-none focus:outline-none focus:ring w-full font-comic"
              />
            </label>
            <label
              htmlFor="emailUser"
              className="block font-bold mb-1 md:mb-0 mt-3.5"
            >
              Email:
              <input
                id="emailUser"
                type="text"
                name="gravatarEmail"
                value={ gravatarEmail }
                onChange={ this.handleChange }
                data-testid="input-gravatar-email"
                className="px-3 py-3 placeholder-blueGray-300 text-neutral-800
                relative bg-white bg-white rounded text-sm border-0 shadow
                outline-none focus:outline-none focus:ring w-full font-comic"
              />
            </label>
            <button
              className="w-full text-xl mt-5 text-white bg-gradient-to-r from-purple-500
              via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4
              focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg
              shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
              font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              type="button"
              onClick={ () => {
                dispatch(setPlayer(this.state)); this.getApiToken(); music.play();
              } }
              data-testid="btn-play"
              disabled={ this.checkButton() }
            >
              Play
            </button>
            <button
              className="w-full mt-5 text-xl
               text-yellow-400 font-bold hover:text-white border
              border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300
              rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2
              dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white
              dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
              type="button"
              onClick={ () => { this.renderConfig(); music.play(); } }
              data-testid="btn-settings"
            >
              Config
            </button>
            <div>
              {(!showConfig) && <ConfigInfo renderConfig={ this.renderConfig } />}
            </div>
          </div>
          <div
            className=" rounded-r-3xl flex justify-center items-center w-3/5
           bg-style-yellow bg-center bg-cover"
          >
            { (showConfig) ? <ConfigTrivia renderConfig={ this.renderConfig } /> : <img
              src={ logo }
              alt="trivia-logo"
              className="bg-center bg-no-repeat bg-auto"
            /> }
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  token: state.token,
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Login);
