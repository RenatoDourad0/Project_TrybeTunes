import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

export default class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      userData: {},
      loadingState: true,
    };
  }

  async componentDidMount() {
    const data = await getUser();
    this.setState({
      userData: data,
      loadingState: false,
    });
  }

  render() {
    const { userData, loadingState } = this.state;
    return (
      <div>
        <Header />
        { loadingState
          ? (
            <div>
              <br />
              <Loading />
            </div>
          )
          : (
            <div data-testid="page-profile">
              <div className="profileContainer">
                { userData.image
                  ? (
                    <img
                      className="profileImg uploadedImg"
                      src={ userData.image }
                      alt=" "
                    />)
                  : <FaUserCircle className="profileUserImage" /> }
                <div className="profileInfo">
                  <h3>Nome:</h3>
                  <h2 className="profileName">{ userData.name }</h2>
                  <br />
                  <h3>Email:</h3>
                  <h3 className="profileEmail">{ userData.email }</h3>
                  <br />
                  <h3>Descrição:</h3>
                  <h3 className="profileDescription">{ userData.description }</h3>
                </div>
                <Link
                  to="/profile/edit"
                  className="profileLink"
                >
                  Editar perfil
                </Link>
              </div>
            </div>)}
      </div>
    );
  }
}
