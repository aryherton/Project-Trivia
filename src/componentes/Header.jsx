import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Header extends Component {
  render() {
    const { player: { nome, gravatarEmail, score } } = this.props;
    return (
      <div className="header">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${md5(gravatarEmail).toString()}` }
          alt="imgUser"
        />
        <ul>
          <li data-testid="header-player-name">{nome}</li>
          <li data-testid="header-score">{ score }</li>
        </ul>
      </div>
    );
  }
}

Header.propTypes = { player: PropTypes.object }.isRequired;

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(Header);
