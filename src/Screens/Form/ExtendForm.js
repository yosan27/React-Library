import React, { Component } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class ExtendForm extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            detail: {}
        }
    }

    alertSubmit = () => {
        swal("Success!", "Due date has been changed", "success");
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
                                        <h3>Extend Form</h3>
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
                                                    <Form.Control type="date" />
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

export default ExtendForm