import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/Project_TrybeTunes" component={ Login } />
            <Route path="/Project_TrybeTunes/search" component={ Search } />
            <Route path="/Project_TrybeTunes/album/:id" component={ Album } />
            <Route path="/Project_TrybeTunes/favorites" component={ favorites } />
            <Route exact path="/Project_TrybeTunes/profile" component={ Profile } />
            <Route
              exact
              path="/Project_TrybeTunes/profile/edit"
              component={ ProfileEdit }
            />
            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
