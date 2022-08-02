import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
      userNameInputValue: '',
      LoadingState: false,
      isLogedIn: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState((prev) => ({
      LoadingState: !prev.LoadingState,
    }), async () => {
      const { userNameInputValue } = this.state;
      await createUser({ name: userNameInputValue });
      this.setState((prev) => ({
        LoadingState: !prev.LoadingState,
        isLogedIn: !prev.isLogedIn,
      }));
    });
  }

  handleChange({ target }) {
    const { value } = target;
    this.setState({
      userNameInputValue: value,
    }, () => {
      const { userNameInputValue } = this.state;
      const minLegth = 3;
      if (userNameInputValue.length >= minLegth) {
        this.setState({
          buttonDisabled: false,
        });
      }
    });
  }

  render() {
    const { buttonDisabled, userNameInputValue, LoadingState, isLogedIn } = this.state;
    return (
      !LoadingState
        ? (
          <div data-testid="page-login">
            <form action="">
              <label htmlFor="userName">
                Usuário:
                <input
                  type="text"
                  name="userName"
                  id=""
                  data-testid="login-name-input"
                  value={ userNameInputValue }
                  onChange={ this.handleChange }
                />
              </label>
              <button
                type="button"
                disabled={ buttonDisabled }
                data-testid="login-submit-button"
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
            { isLogedIn && <Redirect to="/search" /> }
          </div>)
        : <Loading />
    );
  }
}
