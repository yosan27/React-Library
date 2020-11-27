import React, { Component } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import './Form.style.css'

class ReturnForm extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            detail: {}
        }
    }

    alertSubmit = () => {
        swal("Success!", "Book has been returned", "success");
    }

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <Card>
                                    <Card.Header>
                                        <h3>Return Form</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form>
                                            <Form.Group as={Row} controlId="transactionID">
                                                <Form.Label column sm="3">Transaction ID</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly value="202011202011" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="borrowerName">
                                                <Form.Label column sm="3">Borrower Name</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly value="User" />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="bookTitle">
                                                <Form.Label column sm="3">Book Title</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly value="Dilan 1990" />
                                                </Col>
                                            </Form.Group>
                                            <hr />
                                            <Form.Group as={Row} controlId="dateBorrowed">
                                                <Form.Label column sm="3">Date Borrowed</Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="text" value="11/11/2020" readOnly />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="dueDate">
                                                <Form.Label column sm="3">Due Date</Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="text" value="11/18/2020" readOnly />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="dateReturned">
                                                <Form.Label column sm="3">Date Returned</Form.Label>
                                                <Col sm="4">
                                                    <Form.Control type="date" />
                                                </Col>
                                            </Form.Group>
                                            <hr />
                                            <Form.Group as={Row} controlId="late">
                                                <Form.Label column sm="3">Late</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly value="0" />
                                                    <Form.Text className="text-muted desc">0 day(s) late</Form.Text>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="damage">
                                                <Form.Label column sm="3">Damage</Form.Label>
                                                <Col sm="9">
                                                    <Form.Group id="damageCheck">
                                                        <Form.Check type="checkbox" value="1000" label="Folded - Rp 1.000" />
                                                        <Form.Check type="checkbox" value="10000" label="Torn - Rp 10.000" />
                                                        <Form.Check type="checkbox" value="100000" label="Lost - Rp 100.000" />
                                                    </Form.Group>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} controlId="totalfine">
                                                <Form.Label column sm="3">Total Fine</Form.Label>
                                                <Col sm="9">
                                                    <Form.Control plaintext readOnly value="0" />
                                                </Col>
                                            </Form.Group>
                                            <hr />
                                            <div style={{ float: 'right' }}>
                                                <Button variant="success" onClick={this.alertSubmit}>Submit</Button>
                                                <Link to='/history'>
                                                    <Button variant="secondary">Cancel</Button>
                                                </Link>
                                            </div>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        )
    }
}

export default ReturnForm