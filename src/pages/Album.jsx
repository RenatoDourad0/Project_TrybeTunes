import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

// requisito 7

export default class Album extends React.Component {
  render() {
    const { match: { params: { id } } } = this.props;
    return (
      <div data-testid="page-album">
        <Header />
        <h1>{ id }</h1>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};
