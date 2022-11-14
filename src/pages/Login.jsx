import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    userName: '',
    buttonLogin: true,
    loading: false,
    redirect: false,
  };

  loginCheck = (event) => {
    const { value } = event.target;
    const minLength = 3;
    const verify = value.length < minLength;

    this.setState({
      userName: value,
      buttonLogin: verify,
    });
  };

  handleClick = async () => {
    const { userName } = this.state;

    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ redirect: true });
  };

  render() {
    const { buttonLogin, loading, redirect } = this.state;
    if (redirect) return <Redirect to="/search" />;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <input
            id="input-username"
            data-testid="login-name-input"
            type="text"
            placeholder="nome"
            onChange={ this.loginCheck }
          />
          <p />
          <button
            id="button-login"
            data-testid="login-submit-button"
            type="button"
            disabled={ buttonLogin }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}
