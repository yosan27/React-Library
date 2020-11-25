import React from 'react'
import { Container, Row, Col, Image, Form, Button } from 'react-bootstrap';
import './Register-style.css'

function Register() {
    return (
        <Container className="pad-50" >
            <Row>
                <Col md={6}>
                    <Image src="img/cover4.jpg" fluid />
                </Col>
                <Col md={5} className="space-top-25">
                    <img class="img-right" src="img/book.png" alt="" />
                    <h1 class="font-weight-bold py-2 bl-2">Register</h1>
                    <h4 class="txt-2 bl-2">Please Register to Create Account</h4>

                    <Form>
                        <Form.Group>
                            <Col md={8}>
                                <Form.Control size="md" type="name" placeholder="Username" className="box-input" />
                                <Form.Control size="md" type="name" placeholder="Fullname" className="box-input" />
                                <Form.Control size="md" type="email" placeholder="Email Address" className="box-input" />
                                <Form.Control size="md" type="password" placeholder="Password" className="box-input" />
                                <Form.Check
                                    type="checkbox"
                                    id="autoSizingCheck"
                                    className="mb-2 grey"
                                    label="Remember me"
                                />
                            </Col>
                            <Button className="btn-login loginBtn" variant="secondary">Sign Up</Button>
                            <Button className="btn-sign-up" variant="outline-secondary">Login</Button>
                        </Form.Group>
                        <a href="forgotPass.html" class="forgot grey">Forgot Password?</a>
                    </Form>
                    <div class="space-top-25">
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

export default Register
