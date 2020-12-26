import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import './Register-style.css'

function Register() {
    return (
        <section className="Form my-5 mx-5 card-login">
            <div className="container">
                <div className=" no-gutters">
                    <div className="col-lg-6">
                        <img src="assets/images/cover4.jpg" class="img-fluid img-login" alt="" />
                    </div>
                    <div className="col-lg-6 px-5 pt-3">
                        <img className="img-right" src="assets/images/book.png" alt="" />
                        <h1 className="font-weight-bold py-2 white">Register</h1>
                        <h4 className="txt-4 white">Please Register to create account</h4>
                        <form action="">
                            <div className="form-row">
                                <div className="col-lg-7">
                                    <input type="text" placeholder="Username" className="form-control my-1 p-4 box" required />
                                    <input type="text" placeholder="Fullname" className="form-control my-1 p-4 box" required />
                                    <input type="email" placeholder="Email Address" className="form-control my-1 p-4 box"
                                        required />
                                    <input type="password" placeholder="Password" className="form-control my-1 p-4 box"
                                        required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div class="col-lg-3">
                                    <button type="button" className="btn-login mt-3">Sign Up</button>
                                </div>
                                <div className="col-lg-3">
                                    <Link to="/">
                                        <button type="button"
                                            className="btn-sign-up mt-3 mb-5">Login</button>
                                    </Link>
                                </div>
                            </div>

                            <p className="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
                            <p className="txt-3"><a class="txt-3"
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
