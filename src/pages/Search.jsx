import React, { Component } from 'react';
import Header from './components/Header';

class Search extends Component {
  state = {
    buttonLogin: true,
  };

  loginCheck = (event) => {
    const { value } = event.target;
    const minLength = 2;
    const verify = value.length < minLength;

    this.setState({
      buttonLogin: verify,
    });
  };

  render() {
    const { buttonLogin } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.loginCheck }
        />
        <button
          data-testid="search-artist-button"
          type="button"
          disabled={ buttonLogin }
        >
          Pesquisar
        </button>

      </div>
    );
  }
}

export default Search;
