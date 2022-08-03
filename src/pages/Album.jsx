import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      data: undefined,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        { data
          ? (
            <div>
              <h1 data-testid="album-name">{ data[0].collectionName }</h1>
              <h2 data-testid="artist-name">{ data[0].artistName }</h2>
              <img src={ data[0].artworkUrl100 } alt="" />
              { data && data.slice(1, data.length)
                .map((music) => (
                  <MusicCard
                    key={ music.trackId }
                    previewUrl={ music.previewUrl }
                    trackName={ music.trackName }
                    trackId={ music.trackId }
                    fullMusicData={ music }
                  />))}
            </div>
          )
          : (<Loading />)}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.func.isRequired,
};
