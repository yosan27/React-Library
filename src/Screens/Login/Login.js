import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import './Login-style.css'

function login() {
    return (
        <Container className="pad-50" >
            <Row>
                <Col md={6}>
                    <Image src="img/cover2.png" fluid />
                </Col>
                <Col md={5} className="space-top-50">
                    <img class="img-right" src="img/book.png" alt="" />
                    <h1 class="font-weight-bold py-2 bl-2">Login</h1>
                    <h4 class="txt-2 bl-2">Welcome Back, Please Login to your account</h4>

                    <Form>
                        <Form.Group>
                            <Col md={8}>
                                <Form.Control size="lg" type="email" placeholder="Email Address" className="box-input" />
                                <Form.Control size="lg" type="password" placeholder="Password" className="box-input" />
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2 grey"
                                    label="Remember me"
                                />
                            </Col>
                            <Button className="btn-login loginBtn" variant="secondary">Login</Button>
                            <Button className="btn-sign-up" variant="outline-secondary">Sign Up</Button>
                        </Form.Group>
                        <a href="forgotPass.html" class="forgot grey">Forgot Password?</a>
                    </Form>
                    <div class="space-top-50">
                        <p class="txt-3 mg-0">By signing up, you agree to E-Perpus's</p>
                        <p class="txt-3"><a class="txt-3"
                            href="https://web.kominfo.go.id/sites/default/files/users/4761/UU%2019%20Tahun%202016.pdf"
                            target="blank"><b>Terms and Conditions & Privacy Policy</b></a></p>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default login
