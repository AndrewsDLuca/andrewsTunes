import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    loading: false,
    check: false,
  };

  async componentDidMount() {
    const { favorita, music } = this.props;
    const finding = favorita.find((e) => e.trackId === music.trackId);
    if (finding) {
      this.setState({
        check: true,
        loading: false,
      });
    }
  }

  favoritsSong = async () => {
    const { music } = this.props;
    const { check } = this.state;
    if (check) {
      this.setState({ loading: true });
      await removeSong(music);
      this.setState({
        loading: false,
        check: false,
      });
    } else {
      this.setState({ loading: true });
      await addSong(music);
      this.setState({
        loading: false,
        check: true,
      });
    }
  };

  render() {
    const { loading, check } = this.state;
    const { music } = this.props;
    const { trackName, previewUrl, trackId } = music;
    return (
      <div>
        <h2>{ trackName }</h2>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        {
          loading ? <Loading /> : (
            <section>
              <label htmlFor="favorita">
                Favorita
                <input
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  id="favorita"
                  onChange={ () => {} }
                  onClick={ this.favoritsSong }
                  checked={ check }
                />
              </label>
            </section>
          )
        }
      </div>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.shape({
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  favorita: PropTypes.arrayOf(
    PropTypes.shape({
      trackName: PropTypes.string.isRequired,
      previewUrl: PropTypes.string.isRequired,
      trackId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};
