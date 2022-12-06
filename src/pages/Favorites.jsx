import React, { Component } from 'react';
import Header from './components/Header';
import Loading from './components/Loading';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from './components/MusicCard';

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
    loading: false,
    check: {},
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
    console.log(favoriteSongs);
    console.log(this.state);
  }

  onInputChange = ({ target }) => {
    const { name, check, id } = target;
    this.setState((prev) => ({
      check: { ...prev.check, [name]: check },
    }));
    if (!check) {
      this.setState({ loading: true }, async () => {
        const { favoriteSongs } = this.state;
        const songGet = favoriteSongs.find((song) => song.trackId === +id);
        await removeSong(songGet);
        const getFavorites = await getFavoriteSongs();
        this.setState({
          favoriteSongs: getFavorites,
          loading: false,
        });
      });
    }
  };

  render() {
    const { favoriteSongs, loading, check } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas favoritas:</h3>
        { loading ? <Loading /> : (
          favoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackId }
              music={ music }
              checked={ check[music.trackName] }
              onInputChange={ this.onInputChange }
            />
          )))}
      </div>
    );
  }
}
