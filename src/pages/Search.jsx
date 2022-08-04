import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

export default class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      inputValue: '',
      artistName: '',
      buttonDisabled: true,
      LoadingState: false,
      requestReturned: false,
      Data: [],
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({
      artistName: prev.inputValue,
      inputValue: '',
      LoadingState: !prev.LoadingState,
    }), async () => {
      const { artistName } = this.state;
      const data = await searchAlbumsAPI(artistName);
      this.setState((prev) => ({
        LoadingState: !prev.LoadingState,
        requestReturned: true,
        Data: data,
      }));
    });
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      inputValue: value,
    }, () => {
      const { inputValue } = this.state;
      const minLegth = 2;
      if (inputValue.length >= minLegth) {
        this.setState({
          buttonDisabled: false,
        });
      }
    });
  }

  render() {
    const { artistName,
      buttonDisabled,
      LoadingState,
      requestReturned,
      inputValue,
      Data } = this.state;
    return (
      <div data-testid="page-search" className="searchPageContainer">
        <Header />
        { LoadingState
          ? (
            <Loading />
          )
          : (
            <form action="" className="searchForm">
              <label htmlFor="artistSearchInput" className="searchInputLabel">
                <input
                  type="text"
                  name="artistSearchInput"
                  id=""
                  data-testid="search-artist-input"
                  value={ inputValue }
                  onChange={ this.handleChange }
                  className="searchInput"
                  placeholder="   Busque pelo nome do artista"
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
                className="searchInputButton"
              >
                Pesquisar
              </button>
            </form>
          )}
        { requestReturned
        && (
          <h2 className="searchResultText">
            { `Resultado de álbuns de: ${artistName}` }
          </h2>
        )}
        {
          Data.length === 0 && requestReturned
            && <h4 className="albumNotFound">Nenhum álbum foi encontrado</h4>
        }
        <div className="searchCardsContainer">
          {
            Data.length > 0 && Data.map((album) => (
              <div key={ album.collectionId } className="searchAlbumContainer">
                <img
                  src={ album.artworkUrl100 }
                  alt={ album.collectionName }
                  className="searchAlbumImage"
                />
                <h4 className="searchAlbumName">{ album.collectionName }</h4>
                <h6 className="searchAlbumArtist">{ album.artistName }</h6>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  className="searchAlbumLink"
                >
                  Mais informações
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    );
  }
}
