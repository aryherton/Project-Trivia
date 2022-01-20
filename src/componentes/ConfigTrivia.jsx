import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { setConfigLocalStorage } from '../server';

export default class ConfigTrivia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: 'any',
      difficulty: 'any',
      type: 'any',
      saveSucessfull: false };
  }

  saveChange = () => {
    this.setState({ saveSucessfull: true });
  }

  setLocalState = ({ target: { name, value } }) => {
    switch (name) {
    case 'category':
      this.setState({ category: value });
      break;
    case 'difficulty':
      this.setState({ difficulty: value });
      break;
    default:
      this.setState({ type: value });
      break;
    }
  };

  disabledButton = () => {
    const { category, difficulty, type } = this.state;
    return (!!(category === 'any' || difficulty === 'any' || type === 'any'));
  };

  render() {
    const { saveSucessfull } = this.state;
    const { renderConfig } = this.props;
    return (
      <div className="flex m-auto">
        <form className="flex flex-col" onChange={ this.setLocalState }>
          <h1
            className="text-white text-2xl my-10"
            data-testid="settings-title"
          >
            Configuração

          </h1>
          <select className="p-4 rounded-xl" name="category">
            <option value="any">Any Category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime Manga</option>
            <option value="32">Entertainment: Cartoon Animations</option>
          </select>
          <select className="my-10 p-4 rounded-xl" name="difficulty">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select className="p-4 rounded-xl" name="type">
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button
            className=" disabled:opacity-50
            w-full text-xl mt-10 text-white bg-gradient-to-r from-purple-500
              via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4
              focus:ring-purple-300 dark:focus:ring-purple-800 hover:shadow-lg
              shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80
              font-bold rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            type="button"
            disabled={ this.disabledButton() }
            onClick={ () => {
              setConfigLocalStorage(this.state); renderConfig();
            } }
          >
            Salvar
          </button>
        </form>
        {(saveSucessfull) && <h2>Save Sucessfull!!!</h2>}
      </div>
    );
  }
}

ConfigTrivia.propTypes = {
  history: PropTypes.object.isRequired,
}.isRequired;
