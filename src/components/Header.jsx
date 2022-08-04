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

  componentWillUnmount() {
    this.setState({
      userName: undefined,
    });
  }

  render() {
    const { userName } = this.state;
    return (
      <header data-testid="header-component" className="headerContainer">
        { userName !== undefined
          ? (
            <div>
              <h1 className="headerTitle">TrybeTunes</h1>
              <span
                data-testid="header-user-name"
                className="headerUsername"
              >
                { `Olá ${userName.name}` }
              </span>
              <nav className="headerNav">
                <Link
                  to="/search"
                  data-testid="link-to-search"
                  className="headerLink"
                >
                  Buscar
                </Link>
                <Link
                  to="/favorites"
                  data-testid="link-to-favorites"
                  className="headerLink"
                >
                  Favoritos
                </Link>
                <Link
                  to="/profile"
                  data-testid="link-to-profile"
                  className="headerLink"
                >
                  Perfil
                </Link>
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
