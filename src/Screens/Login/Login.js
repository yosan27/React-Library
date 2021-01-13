import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Login-style.css";
import { FormErrors } from './FormErrors';
import axios from "../../Services/axios-instance";
import swal from "sweetalert";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      formErrors: { email: '', username: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false,
      user: "",
      userData: [],
      userCode: "",
    }
  }

  componentDidMount() {
    // axios.get(API_URL + "user/code/UA001").then((e) => {
    //   // console.log(e);
    //   sessionStorage.setItem('userCode', e.data.userCode)
    //   this.setState({
    //     userCode: e.data.userCode
    //   })
    // })
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
      [event.target.name]: event.target.value
    })
  }

  loginClick = () => {
    const user = {
      userName: this.state.username,
      password: this.state.password
    }
    if (!this.state.username || !this.state.password) {
      swal("Failed", "Register User", "failed");
    } else {
      axios.post('users/signin', user)
        .then((response) => {
          console.log(response)
          if (response.data.token) {
            localStorage.setItem("userFaraday", JSON.stringify(response.data));
          }
          this.props.history.push("/page/indexUser")
          window.location.reload();
        }).catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            swal("Failed", error.response.data.message, "error");
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        })
      this.setState({
        username: "",
        password: ""
      });
    }

  }

  render() {
    return (
      <section class="Form my-10 mx-5 pb-5 card-login">
        <div class="container mt-3">
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
                  <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                    <label htmlFor="username">Username</label>
                    <input type="username" required class="form-control my-2 p-4 box username" name="username"
                      placeholder="username"
                      value={this.state.username}
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
                  {/* <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck1" />
                    <label class="form-check-label grey" for="gridCheck1">
                      Remember Me
                                    </label>
                  </div> */}
                  <div class="col-lg-5">
                    <button type="button" class="btn-login mt-3 loginBtn" disabled={!this.state.username || !this.state.password} onClick={this.loginClick}>
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
