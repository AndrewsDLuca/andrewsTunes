import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import MusicCard from './components/MusicCard';
import getMusics from '../services/musicsAPI';

export default class Album extends Component {
  state = {
    listMusic: [],
    musicName: {},
  };

  async componentDidMount() {
    const { match } = this.props;
    const [api, ...listMusic] = await getMusics(match.params.id);
    this.setState({
      listMusic,
      musicName: api,
    });
  }

  render() {
    const { listMusic, musicName } = this.state;
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
          listMusic.map((music) => (
            <MusicCard key={ music.trackName } music={ music } { ...this.state } />
          ))
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
