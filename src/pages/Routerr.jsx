import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class Routerr extends Component {
  render() {
    return (
      <main>
        <div>
          <Switch>
            <Route exact path="/" Component={ Login } />
            <Route exact path="search" Component={ Search } />
            <Route exact path="/album/:id" Component={ Album } />
            <Route exact path="favorites" Component={ Favorites } />
            <Route exact path="Profile" Component={ Profile } />
            <Route exact path="/profile/edit" Component={ ProfileEdit } />
            <Route exact path="" Component={ NotFound } />
          </Switch>
        </div>
      </main>
    );
  }
}

export default Routerr;
