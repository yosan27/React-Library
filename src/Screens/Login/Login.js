import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login-style.css";
import { FormErrors } from './FormErrors';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      user: ""
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
      
  userHandling = (event) => {
    this.setState({
        [event.target.name] : event.target.value
    })
}

loginClick = () => {
    this.props.history.push(`/${this.state.user}`)
}

  userHandling = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  loginClick = () => {
    this.props.history.push(`/${this.state.user}`)
  }


  render() {
    return (
      <section class="Form my-10 mx-5 pb-5 card-login">
        <div class="container">
          <div class="row no-gutters row-box">
            <div class="col-lg-5">
              <img src="assets/images/cover2.png" class="img-fluid img-page" alt="" />
            </div>
            <div class="col-lg-7 px-5 pt-3">
              <img class="img-right img-page" src="assets/images/book.png" alt="" />
              <h1 class="font-weight-bold py-2 bl-2">Login</h1>
              <h4 class="txt-2 bl-2">
                Welcome Back, Please Login to your account
              </h4>

              <form className="demoForm">
                <div class="col-lg-7">
                  <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
                    <label htmlFor="email">Email address</label>
                    <input type="email" required class="form-control my-2 p-4 box email" name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleUserInput} />
                  </div>
                  <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
                    <label htmlFor="password">Password</label>
                    <input type="password" class="form-control my-2 p-4 box password" name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.handleUserInput} />
                  </div>
                  <i className="wrong-user"><FormErrors formErrors={this.state.formErrors} /></i>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck1" />
                    <label class="form-check-label grey" for="gridCheck1">
                      Remember Me
                                    </label>
                  </div>
                  <div class="col-lg-5">
                    <button type="button" class="btn-login mt-3 loginBtn" disabled={!this.state.formValid} onClick={this.loginClick}>
                      Login
                    </button>
                  </div>
                  <div class="col-lg-5">
                    <Link to="/register">
                      <button type="button" class="btn-sign-up mt-3 mb-2">
                        Sign Up
                        </button>
                    </Link>
                  </div>
                </div>
              </form>

              <Link to="/forgot-password">
                <a href="forgotPass.html" class="forgot mb-5 grey">Forgot Password?</a>
              </Link>

              <p class="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
              <p class="txt-3">
                <a
                  class="txt-3"
                  href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                  target="blank"
                >
                  <b>Terms and Conditions & Privacy Policy</b>
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(Login);
