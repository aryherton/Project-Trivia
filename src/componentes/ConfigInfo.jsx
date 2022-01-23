import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { deleteConfigLocalStorage, getConfigLocalStorage } from '../server';
import trash from '../img/trash.png';

export default class ConfigInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      delete: false,
    };
  }

  changeDelete = () => {
    this.setState((state) => (
      { delete: !state.delete }
    ));
  }

  renderPage = () => {
    const configLocalStorage = getConfigLocalStorage();
    const { category, difficulty, type } = configLocalStorage;
    const categoryArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8',
      'General Knowledge',
      'Entertainment: Books',
      'Entertainment: Film',
      'Entertainment: Music',
      'Entertainment: Musicals Theatres',
      'Entertainment: Television',
      'Entertainment: Video Games',
      'Entertainment: Board Games',
      'Science Nature',
      'Science: Computers',
      'Science: Mathematics',
      'Mythology',
      'Sports',
      'Geography',
      'History',
      'Politics',
      'Art',
      'Celebrities',
      'Animals',
      'Vehicles',
      'Entertainment: Comics',
      'Science: Gadgets',
      'Entertainment: Japanese Anime Manga',
      'Entertainment: Cartoon Animations',

    ];
    return (
      <div className="flex my-10 text-lg">
        <div>
          <p className="font-mono text-xl text-yellow-400 p-1">
            <span className="font-bold">Category:</span>
            {' '}
            <span className="text-yellow-600">{categoryArr[category]}</span>
          </p>
          <p className="font-mono text-xl text-yellow-400 p-1">
            <span className="font-bold">Difficulty:</span>
            {' '}
            <span className="text-yellow-600">{difficulty}</span>
          </p>
          <p className="font-mono text-xl text-yellow-400 p-1">
            <span className="font-bold">Type:</span>
            {' '}
            <span className="text-yellow-600">{type}</span>
          </p>
        </div>
        <div className="ml-10">
          <button
            type="button"
            onClick={ () => {
              deleteConfigLocalStorage();
              this.changeDelete();
            } }
          >
            <img src={ trash } alt="trash" className="w-10" />
          </button>
        </div>
      </div>);
  }

  render() {
    return (
      <div>
        {(getConfigLocalStorage() !== null && this.renderPage())}
      </div>
    );
  }
}

ConfigInfo.propTypes = {
  renderConfig: PropTypes.func,
}.isRequired;
