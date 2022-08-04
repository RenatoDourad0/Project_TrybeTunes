import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';

export default class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      loadingState: true,
      isDisabled: true,
      edidComplete: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState(async () => {
      const { name, email, image, description } = await getUser();
      this.setState({
        loadingState: false,
        name,
        email,
        image,
        description,
      });
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => {
      const { name: nome, email, image, description } = this.state;
      const nm = nome.length > 0;
      const em = email.length > 0;
      const im = image.length > 0;
      const desc = description.length > 0;
      const exp = email.includes('@');
      if (nm && em && im && desc && exp) {
        this.setState({
          isDisabled: false,
        });
      }
    });
  }

  handleClick() {
    this.setState({
      loadingState: true,
    }, async () => {
      const { name, email, image, description } = this.state;
      await updateUser({
        name,
        email,
        image,
        description,
      });
      this.setState({
        edidComplete: true,
      });
    });
  }

  render() {
    const { name,
      email,
      image,
      description,
      loadingState,
      isDisabled,
      edidComplete } = this.state;
    return (
      <div>
        { edidComplete && <Redirect to="/profile" /> }
        <Header />
        { loadingState
          ? (
            <Loading />
          )
          : (
            <div data-testid="page-profile-edit">
              <form action="" className="editProfileFormContainer">
                <img src={ image } alt={ name } className="editProfileImg" />
                <label htmlFor="image">
                  URL da imagem
                  <br />
                  <input
                    data-testid="edit-input-image"
                    type="text"
                    name="image"
                    value={ image }
                    onChange={ this.handleChange }
                    className="editProfileinput"
                  />
                </label>
                <br />
                <label htmlFor="name">
                  Nome
                  <br />
                  <input
                    data-testid="edit-input-name"
                    type="text"
                    name="name"
                    value={ name }
                    onChange={ this.handleChange }
                    className="editProfileinput"
                  />
                </label>
                <br />
                <label htmlFor="email">
                  Email
                  <br />
                  <input
                    data-testid="edit-input-email"
                    type="text"
                    name="email"
                    value={ email }
                    onChange={ this.handleChange }
                    className="editProfileinput"
                  />
                </label>
                <br />
                <label htmlFor="description">
                  Descrição
                  <br />
                  <textarea
                    data-testid="edit-input-description"
                    name="description"
                    cols="30"
                    rows="10"
                    value={ description }
                    onChange={ this.handleChange }
                    className="editProfileinput"
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  onClick={ this.handleClick }
                  disabled={ isDisabled }
                  className="editProfileButton"
                >
                  Salvar
                </button>
              </form>
            </div>
          )}
      </div>
    );
  }
}
