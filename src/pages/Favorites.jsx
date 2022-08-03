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
    const favoriteSongs = await getFavoriteSongs();
    const { favoriteSongs: prevFavorites } = this.state;
    if (favoriteSongs !== prevFavorites) {
      this.forceUpdate();
    }
    return favoriteSongs !== prevFavorites;
  }

  // parece que cria um looping infinito.

  async componentDidUpdate() {
    const favSongs = await getFavoriteSongs();
    console.log('aqui', favSongs);
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
            { favoriteSongs.map((song) => (<MusicCard
              key={ song.trackId }
              previewUrl={ song.previewUrl }
              trackName={ song.trackName }
              fullMusicData={ song }
              trackId={ song.trackId }
              favorite={ favorite }
            />)) }
          </div>)
    );
  }
}
