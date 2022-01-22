import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NotFound extends Component {
  render() {
    const { history } = this.props;
    return (
      <div
        className="
          flex items-center justify-center
          min-h-screen
          bg-ultra-purple"
      >
        <div
          className="
            flex flex-col items-center justify-center
            w-1/2 h-96
            bg-gray-800
            shadow-2xl rounded-3xl
            shadow-gray-700"
        >
          <span className="flex flex-col items-center text-yellow-500 text-5xl">
            <h1>OPS!</h1>
            <h1>Página não encontrada</h1>
          </span>
          <button
            className="w-full text-xl mt-9 text-white bg-gradient-to-r from-purple-500
              via-purple-600 to-purple-700 focus:bg-gradient-to-br hover:ring-4
              hover:ring-purple-300 dark:hover:ring-purple-800 shadow-lg
              shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
              font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            data-testid="btn-play-again"
            type="button"
            onClick={ () => history.push('/') }
          >
            Login
          </button>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
