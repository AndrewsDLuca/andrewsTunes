import React, { Component } from 'react';
import Header from './components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from './components/MusicCard';

export default class Favorites extends Component {
  state = {
    favoriteSongs: [],
  };

  async componentDidMount() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
    });
    console.log(favoriteSongs);
    console.log(this.state);
  }

  render() {
    const { favoriteSongs } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <h3>Músicas favoritas:</h3>
        {favoriteSongs.map((music) => (
          <MusicCard key={ music.trackId } music={ music } { ...this.state } />
        ))}
      </div>
    );
  }
}
