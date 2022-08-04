import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

export default class favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoriteSongs: [],
      loadingState: true,
      favorite: true,
    };
  }

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loadingState: false,
    });
  }

  async shouldComponentUpdate() {
    // const favoriteSongs = await getFavoriteSongs();
    // const { favoriteSongs: prevFavorites } = this.state;
    // if (favoriteSongs !== prevFavorites) {
    //   this.forceUpdate();
    // }
    // return favoriteSongs !== prevFavorites;
  }

  // cria um looping infinito. precisa renderizar a lista novamente apos atualizar

  async componentDidUpdate() {
    // const favSongs = await getFavoriteSongs();
    // this.setState({
    //   loadingState: true,
    // }, () => {
    //   this.setState({
    //     favoriteSongs: favSongs,
    //     loadingState: false,
    //   });
    // });
  }

  render() {
    const { favoriteSongs, loadingState, favorite } = this.state;
    return (
      loadingState
        ? <Loading />
        : (
          <div data-testid="page-favorites">
            <Header />
            <div className="favoritesContainer">
              <hr className="AlbumMusicCardHr" />
              { favoriteSongs.map((song) => (
                <div key={ song.trackId }>
                  <MusicCard
                    previewUrl={ song.previewUrl }
                    trackName={ song.trackName }
                    fullMusicData={ song }
                    trackId={ song.trackId }
                    favorite={ favorite }
                  />
                  <hr className="AlbumMusicCardHr" />
                </div>
              )) }
            </div>
          </div>)
    );
  }
}
