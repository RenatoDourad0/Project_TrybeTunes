import React from 'react';
import { Link } from 'react-router-dom';
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
          ? <Loading />
          : (
            <div data-testid="page-profile">
              <div>
                <img
                  data-testid="profile-image"
                  src={ userData.image }
                  alt={ userData.name }
                />
                <h2>{ userData.name }</h2>
                <h2>{ userData.name }</h2>
                <h3>{ userData.email }</h3>
                <h3>{ userData.description }</h3>
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            </div>)}
      </div>
    );
  }
}
