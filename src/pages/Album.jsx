import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import Loading from './components/Loading';
import MusicCard from './components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    listMusic: [],
    musicName: {},
    favorita: [],
    loading: false,
  };

  async componentDidMount() {
    const { match } = this.props;
    const [api, ...listMusic] = await getMusics(match.params.id);
    const returnFavorita = await getFavoriteSongs();
    this.setState({
      listMusic,
      musicName: api,
      favorita: returnFavorita,
    });
  }

  render() {
    const { listMusic, musicName, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <section>
          <h2 data-testid="artist-name">
            { musicName.artistName }
          </h2>
          <h2 data-testid="album-name">
            { musicName.collectionName }
          </h2>
        </section>
        {
          loading ? <Loading /> : (
            listMusic.map((music) => (
              <MusicCard key={ music.trackName } music={ music } { ...this.state } />
            ))
          )
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
}.isRequired;
