import React, { Component } from 'react';
import Loading from './Loading';
import { getUser } from '../../services/userAPI';

export default class Header extends Component {
  state = {
    userApi: '',
    loading: true,
  };

  async componentDidMount() {
    const getUserApi = await getUser();
    this.setState({
      userApi: getUserApi.name,
      loading: false,
    });
  }

  render() {
    const { userApi, loading } = this.state;
    return (
      <header data-testid="header-component">
        {
          loading ? <Loading /> : <h2 data-testid="header-user-name">{ userApi }</h2>
        }
      </header>
    );
  }
}
