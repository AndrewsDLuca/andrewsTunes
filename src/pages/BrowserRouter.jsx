import React, { Componet } from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './Album';
import Favorites from './Favorites';
import Login from './Login';
import NotFound from './NotFound';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';
import Search from './Search';

class BrowserRouter extends Componet {
  render() {
    return (
      <main>
        <div>
          <Switch>
            <Route exact path="/" Componet={ Login } />
            <Route exact path="search" Componet={ Search } />
            <Route exact path="/album/:id" Componet={ Album } />
            <Route exact path="favorites" Componet={ Favorites } />
            <Route exact path="Profile" Componet={ Profile } />
            <Route exact path="/profile/edit" Componet={ ProfileEdit } />
            <Route exact path="" Componet={ NotFound } />
          </Switch>
        </div>
      </main>
    );
  }
}

export default BrowserRouter;
