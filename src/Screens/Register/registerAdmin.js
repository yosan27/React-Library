import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Register-style.css'
import { FormErrors } from '../Login/FormErrors';
import swal from "sweetalert";
import axios from "../../Services/axios-instance";
// import axios from "axios";
import AuthService from "../../Services/auth.service";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fullname: '',
            email: '',
            username: '',
            password: '',
            phone: '',
            address: '',
            profilePict: 'profile.jpg',
            formErrors: { fullname: '', email: '', username: '', password: '', phone: '', address: '' },
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
                // passwordValid = value.length >= 6;
                // fieldValidationErrors.fullname = nameValid ? '' : ' is too short';
                break;
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 8;
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

    registerUser = () => {
        const user = {
            fullName: this.state.fullname,
            email: this.state.email,
            userName: this.state.username,
            password: this.state.password,
            phone: this.state.phone,
            address: this.state.address,
            profilePict: this.state.profilePict,
        }

        // const API_URL = AuthService.api_Url()
        // console.log(user)
        // console.log(API_URL)
        if (!this.state.fullname || !this.state.email || !this.state.username || !this.state.password || !this.state.phone || !this.state.address || (this.state.phone.length - 1) < 12) {
            swal("Register User Failed", "datfa cannot be empty", "failed");
        } else {
            axios.post('users/admin', user)
                .then((response) => {
                    console.log(response);
                    console.log(response.status)
                    swal("Successfully", "Registered User", "success");
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
                fullname: "",
                email: "",
                username: "",
                password: "",
                phone: "",
                address: "",
            });
        }

    }
    render() {
        return (
            <section class="Form my-8 mx-5 pb-5 card-login">
                <div class="container">
                    <div class="row no-gutters row-box">
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
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.username)}`}>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" required class="form-control my-2 p-4 box username" name="username"
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
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.phone)}`}>
                                        <label htmlFor="phone">Phone</label>
                                        <input type="number" required class="form-control my-2 p-4 box phone" name="phone"
                                            placeholder="phone"
                                            value={this.state.phone}
                                            onChange={this.handleUserInput} />
                                        <small className="text-danger">
                                            {(this.state.phone.length - 1) < 12 ? '- Minimal 12 digit -' : ""}
                                        </small>
                                    </div>
                                    <div className={`form-group ${this.errorClass(this.state.formErrors.address)}`}>
                                        <label htmlFor="address">Address</label>
                                        <textarea required className="form-control my-2 p-4 box" placeholder="Address" name="address" rows="3" value={this.state.address} onChange={this.handleUserInput}></textarea>
                                    </div>
                                    <i className="wrong-user"><FormErrors formErrors={this.state.formErrors} /></i>

                                    <div class="col-lg-5">
                                        <button disabled={!this.state.fullname || !this.state.email || !this.state.username || !this.state.password || !this.state.phone || !this.state.address || (this.state.phone.length - 1) < 12 || !this.state.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)} type="button" onClick={this.registerUser} class="btn-login mt-3">Sign Up</button>
                                    </div>
                                    <div class="col-lg-5">
                                        <Link to="/">
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

                        <div class="col-lg-6">
                            <img src="assets/images/cover.jpg" class="img-fluid img-page" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Register);
