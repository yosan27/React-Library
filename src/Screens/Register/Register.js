import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Register-style.css'
import { FormErrors } from '../Login/FormErrors';

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            password: '',
            formErrors: { fullname: '', email: '', password: '' },
            nameValid: false,
            emailValid: false,
            passwordValid: false,
            formValid: false
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
        let nameValid = this.state.nameValid;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch (fieldName) {
            case 'fullname':
                passwordValid = value.length >= 6;
                fieldValidationErrors.fullname = nameValid ? '' : ' is too short';
                break;
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
            nameValid: nameValid,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
    }
    render() {
        return (
            <section class="Form my-8 mx-5 pb-5 card-login">
                <div class="container">
                    <div class="row no-gutters row-box">
                        <div class="col-lg-6">
                            <img src="assets/images/cover4.jpg" class="img-fluid img-page" alt="" />
                        </div>
                        <div class="col-lg-6 px-5 pt-3">
                            <img class="img-right img-page" src="assets/images/book.png" alt="" />
                            <h1 class="font-weight-bold py-2 bl-2">Register</h1>
                            <form className="demoForm">
                                <div class="col-lg-7">
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.fullname)}`}>
                                        <label htmlFor="email">Enter Your Name</label>
                                        <input type="tedt" size="sm" required class="form-control my-2 p-4 box email" name="fullname"
                                            placeholder="Fullname"
                                            value={this.state.fullname}
                                            onChange={this.handleUserInput} />
                                    </div>
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

                                    <div class="col-lg-5">
                                        <button type="button" class="btn-login mt-3">Sign Up</button>
                                    </div>
                                    <div class="col-lg-5">
                                        <Link to="/login">
                                            <a href="login.html"><button type="button"
                                                class="btn-sign-up mt-3 mb-5">Login</button></a>
                                        </Link>
                                    </div>
                                </div>
                            </form>


                            <p className="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
                            <p className="txt-3"><a class="txt-3"
                                href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                                target="blank"><b>Terms and Conditions & Privacy Policy</b></a></p>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);
