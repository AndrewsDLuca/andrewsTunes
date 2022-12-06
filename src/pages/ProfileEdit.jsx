import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from './components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './components/Loading';

export default class ProfileEdit extends Component {
  state = {
    namee: '',
    emaill: '',
    descriptionn: '',
    imagee: '',
    loading: false,
    isButtonSubmitDisabled: true,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const naruto = await getUser();
    this.setState({
      namee: naruto.name,
      emaill: naruto.email,
      descriptionn: naruto.description,
      imagee: naruto.image,
      loading: false,
    });
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { namee } = this.state;
      const validation = 3;
      const userValidation = (namee.length < validation);
      this.setState({ isButtonSubmitDisabled: userValidation });
    });
  };

  buttonSubmit = async (e) => {
    e.preventDefault();
    const { namee, emaill, descriptionn, imagee } = this.state;
    this.setState({ loading: true }, async () => {
      await updateUser({
        name: namee,
        email: emaill,
        description: descriptionn,
        image: imagee,
      });
      this.setState({
        loading: false,
      });
      const { history } = this.props;
      history.push('/profile');
    });
  };

  render() {
    const { namee, emaill, descriptionn, imagee, loading,
      isButtonSubmitDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <Loading />
          : (
            <forms>
              <input
                type="text"
                data-testid="edit-input-name"
                name="namee"
                value={ namee }
                onChange={ this.onInputChange }
              />
              <input
                type="email"
                data-testid="edit-input-email"
                name="emaill"
                value={ emaill }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                data-testid="edit-input-description"
                name="descriptionn"
                value={ descriptionn }
                onChange={ this.onInputChange }
              />
              <input
                type="text"
                data-testid="edit-input-image"
                name="imagee"
                value={ imagee }
                onChange={ this.onInputChange }
              />
              <button
                type="button"
                data-testid="edit-button-save"
                disabled={ isButtonSubmitDisabled }
                onClick={ this.buttonSubmit }
              >
                Editar Perfil
              </button>
            </forms>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
