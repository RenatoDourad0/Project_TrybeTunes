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
        requestReturned: !prev.requestReturned,
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
      <div data-testid="page-search">
        <Header />
        { LoadingState
          ? (
            <Loading />
          )
          : (
            <form action="">
              <label htmlFor="artistSearchInput">
                Busque pelo artista:
                <input
                  type="text"
                  name="artistSearchInput"
                  id=""
                  data-testid="search-artist-input"
                  value={ inputValue }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                data-testid="search-artist-button"
                onClick={ this.handleClick }
                disabled={ buttonDisabled }
              >
                Pesquisar
              </button>
            </form>
          )}
        { requestReturned
        && (
          <h2>
            { `Resultado de álbuns de: ${artistName}` }
          </h2>
        )}
        {
          Data.length === 0 && <h4>Nenhum álbum foi encontrado</h4>
        }
        {
          Data.length > 0 && Data.map((album) => (
            <div key={ album.collectionId }>
              <img src={ album.artworkUrl100 } alt={ album.collectionName } />
              <h4>{ album.collectionName }</h4>
              <h6>{ album.artistName }</h6>
              <Link
                to={ `/album/${album.collectionId}` }
                data-testid={ `link-to-album-${album.collectionId}` }
              >
                Mais informações
              </Link>
            </div>
          ))
        }
      </div>
    );
  }
}
