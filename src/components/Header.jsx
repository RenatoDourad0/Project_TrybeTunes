import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: undefined,
    };
  }

  async componentDidMount() {
    const userName = await getUser();
    this.setState({
      userName,
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component">
        { userName !== undefined
          ? (
            <div>
              <h1>Header</h1>
              <span data-testid="header-user-name">{ userName.name }</span>
              <nav>
                <Link to="/search" data-testid="link-to-search">Buscar</Link>
                <Link to="/favorites" data-testid="link-to-favorites">Favoritos</Link>
                <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
              </nav>
            </div>
          )
          : (
            <Loading />
          )}
      </header>
    );
  }
}
