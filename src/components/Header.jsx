import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Link, Redirect } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: undefined,
      redirect: false,
    };
    this.redirectToMain = this.redirectToMain.bind(this);
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

  redirectToMain() {
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { userName, redirect } = this.state;
    return (
      <header data-testid="header-component" className="headerContainer">
        { userName !== undefined
          ? (
            <div>
              { redirect && <Redirect to="/Project_TrybeTunes" /> }
              <label htmlFor="redirectButton">
                <button
                  type="button"
                  name="redirectButton"
                  id="redirectButton"
                  onClick={ this.redirectToMain }
                >
                  .
                </button>
                <h1
                  className="headerTitle"
                >
                  TrybeTunes
                </h1>
              </label>
              <div className="userConatiner">
                { userName.image
                  ? (
                    <img
                      className="headerUserImage uploadedImg"
                      src={ userName.image }
                      alt=""
                    />)
                  : <FaUserCircle className="headerUserImage" /> }
                <span
                  data-testid="header-user-name"
                  className="headerUsername"
                >
                  { `Olá ${userName.name.split(' ')[0]}` }
                </span>
              </div>
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
            <div className="headerLoading">
              <br />
              <Loading />
            </div>
          )}
      </header>
    );
  }
}
