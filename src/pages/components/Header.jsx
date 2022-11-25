import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../../services/userAPI';

export default class Header extends Component {
  state = {
    userApiii: '',
    loading: true,
  };

  async componentDidMount() {
    const getUserApi = await getUser();
    this.setState({
      userApiii: getUserApi.name,
      loading: false,
    });
  }

  render() {
    const { userApiii, loading } = this.state;
    return (
      <div>
        <header data-testid="header-component">
          {
            loading ? <Loading /> : <h2 data-testid="header-user-name">{ userApiii }</h2>
          }
        </header>
        <ul>
          <li>
            <Link
              data-testid="link-to-search"
              to="/search"
            >
              Procurar
            </Link>
          </li>
          <li>
            <Link
              data-testid="link-to-favorites"
              to="/favorites"
            >
              Favoritos
            </Link>
          </li>
          <li>
            <Link
              data-testid="link-to-profile"
              to="/profile"
            >

              Perfil
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}
