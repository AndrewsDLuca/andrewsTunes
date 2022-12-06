import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Loading from './components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends Component {
  state = {
    name: '',
    email: '',
    description: '',
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });
    const naruto = await getUser();
    this.setState({
      name: naruto.name,
      email: naruto.email,
      description: naruto.description,
      image: naruto.image,
      loading: false,
    });
  }

  render() {
    const { name, email, description, image, loading } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {
          loading ? <Loading /> : (
            <div>
              <img
                src={ image }
                alt={ name }
                data-testid="profile-image"
              />
              <div />
              <h2>{name}</h2>
              <h2>{email}</h2>
              <h2>{description}</h2>
              <p><Link to="profile/edit">Editar perfil</Link></p>
            </div>
          )
        }
      </div>
    );
  }
}

export default Profile;
