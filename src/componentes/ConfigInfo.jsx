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
      <div className="my-10 text-lg">
        <p className="text-gray-400 p-1">
          <span className="font-bold">Category:</span>
          {' '}
          {categoryArr[category]}
        </p>
        <p className="text-gray-400 p-1">
          <span className="font-bold">Difficulty:</span>
          {' '}
          {difficulty}
        </p>
        <p className="text-gray-400 p-1">
          <span className="font-bold">Type:</span>
          {' '}
          {type}
        </p>
        <button
          type="button"
          onClick={ () => {
            deleteConfigLocalStorage();
            this.changeDelete();
          } }
        >
          <img src={ trash } alt="trash" className="w-8" />
        </button>
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
