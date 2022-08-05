import React from 'react';
import { FaHeart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      savingState: false,
      isChecked: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { favorite } = this.props;
    this.setState({
      isChecked: favorite,
    });
  }

  handleClick(fullMusicData) {
    this.setState({
      savingState: true,
    }, async () => {
      const { isChecked } = this.state;
      if (isChecked) {
        await removeSong(fullMusicData);
      } else {
        await addSong(fullMusicData);
      }
      this.setState((prev) => ({
        savingState: false,
        isChecked: !prev.isChecked,
      }));
    });
  }

  render() {
    const { previewUrl, trackName, fullMusicData, trackId } = this.props;
    const { savingState, isChecked } = this.state;
    return (
      !savingState
        ? (
          <div className="musicCardContainer">
            <span className="musicCardTrackName">
              { trackName }
            </span>
            <audio
              data-testid="audio-component"
              src={ previewUrl }
              controls
              className="musicCardAudio"
            >
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label
              htmlFor={ `isFavouriteInput-${trackId}` }
              className="musicCardFavoriteLabel"
            >
              <input
                type="checkbox"
                name="isFavouriteInput"
                id={ `isFavouriteInput-${trackId}` }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.handleClick(fullMusicData) }
                checked={ isChecked }
                className="musicCardFavoriteInput"
              />
              <FaHeart className="favoriteHeard" />
            </label>
          </div>
        )
        : <Loading />
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  fullMusicData: PropTypes.objectOf(PropTypes.string, PropTypes.number).isRequired,
  favorite: PropTypes.bool.isRequired,
};
