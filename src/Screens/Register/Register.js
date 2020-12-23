import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Register-style.css'

function Register() {
    return (
        <section class="Form my-5 mx-5 pb-5 card-login">
            <div class="container">
                <div class="row no-gutters row-box">
                    <div class="col-lg-6">
                        <img src="assets/images/cover4.jpg" class="img-fluid img-page" alt="" />
                    </div>
                    <div class="col-lg-6 px-5 pt-3">
                        <img class="img-right img-page" src="assets/images/book.png" alt="" />
                        <h1 class="font-weight-bold py-2 bl-2">Register</h1>
                        <h4 class="txt-4 bl-2">Please Register to create account</h4>
                        <form action="">
                            <div class="form-row">
                                <div class="col-lg-7">
                                    <input type="text" placeholder="Username" class="form-control my-1 p-4 box" required />
                                    <input type="text" placeholder="Fullname" class="form-control my-1 p-4 box" required />
                                    <input type="email" placeholder="Email Address" class="form-control my-1 p-4 box"
                                        required />
                                    <input type="password" placeholder="Password" class="form-control my-1 p-4 box"
                                        required />
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="col-lg-3">
                                    <button type="button" class="btn-login mt-3">Sign Up</button>
                                </div>
                                <div class="col-lg-3">
                                    <Link to="/login">
                                        <a href="login.html"><button type="button"
                                            class="btn-sign-up mt-3 mb-5">Login</button></a>
                                    </Link>
                                </div>
                            </div>

                            <p class="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
                            <p class="txt-3"><a class="txt-3"
                                href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                                target="blank"><b>Terms and Conditions & Privacy Policy</b></a></p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(Register);
