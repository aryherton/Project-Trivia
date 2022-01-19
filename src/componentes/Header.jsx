import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player: { nome, gravatarEmail, score } } = this.props;
    return (
      <div
        className="header flex flex-col w-full space-x-16 p-3
        items-center text-gray-200"
      >
        <div className="flex justify-end items-center w-9/12 pt-10 sm:pt-3">
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
            alt="imgUser"
            className="rounded-full w-8 mx-5"
          />
          <ul className="flex justify-center items-center">
            <li className="mx-5" data-testid="header-player-name">{nome}</li>
            <li data-testid="header-score">{ score }</li>
          </ul>
        </div>
      </div>
    );
  }
}

Header.propTypes = { player: PropTypes.object }.isRequired;

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Header);
