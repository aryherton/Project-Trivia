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
    return (
      <div>
        <h1 data-testid="settings-title">Configuração</h1>
        <form onChange={ this.setLocalState }>
          <select name="category">
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
          <select name="difficulty">
            <option value="any">Any Difficulty</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
          <select name="type">
            <option value="any">Any Type</option>
            <option value="multiple">Multiple Choice</option>
            <option value="boolean">True / False</option>
          </select>
          <button
            type="button"
            disabled={ this.disabledButton() }
            onClick={ () => {
              setConfigLocalStorage(this.state); this.saveChange();
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
