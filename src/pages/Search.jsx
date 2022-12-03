import React, { Component } from 'react';
import Header from './components/Header';
import searchAlbumApi from '../services/searchAlbumsAPI';
import Loading from './components/Loading';
import Album from './Album';

class Search extends Component {
  state = {
    buttonLogin: true,
    loading: false,
    searchArtist: '',
    albums: [],
    searching: '',
  };

  loginCheck = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { searchArtist } = this.state;
      if (searchArtist.length >= 2) {
        this.setState({ buttonLogin: false });
      }
    });
  };

  buttonSearch = async () => {
    this.state({ loading: true });
    const { searchArtist } = this.state;
    const getAlbum = await searchAlbumApi(searchArtist);
    this.setState({
      searchArtist: '',
      loading: false,
      albums: getAlbum,
      searching: searchArtist,
    });
  };

  render() {
    const { buttonLogin, searchArtist, loading, albums, searching } = this.state;
    return (loading ? (<Loading />) : (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.loginCheck }
          value={ searchArtist }
          name="searchArtist"
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonLogin }
          onClick={ this.buttonSearch }
        >
          Pesquisar
        </button>
        { albums.length > 0
          ? <h3>{`Resultado de álbuns de: ${searching}` }</h3>
          : <h3>Nenhum álbuns foi encontrado</h3>}
        {
          albums.length > 0 && albums.map((element) => {
            const { collectionId } = element;
            return (
              <Album key={ collectionId } { ...element } />
            );
          })
        }
      </div>
    )
    );
  }
}

export default Search;
