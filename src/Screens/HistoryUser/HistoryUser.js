import React, { Component } from 'react'
import { Card, Table, Modal, Form, Row, Col, Badge, Button } from 'react-bootstrap'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

class HistoryUser extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { "id": "202010052078", "book": "Unbranding", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "success" },
                { "id": "202010052079", "book": "Koala Kumal", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "success" },
                { "id": "202010082453", "book": "Laut Bercerita", "borrowed": "2020/10/08", "due": "2020/10/14", "returned": "2020/10/14", "status": "Returned", "badge": "success" },
                { "id": "202010092605", "book": "Pulang", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/14", "status": "Returned", "badge": "success" },
                { "id": "202010092606", "book": "Becoming", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/16", "status": "Returned", "badge": "success" },
                { "id": "202010163390", "book": "The Book You Wish Your Parents Had Read", "borrowed": "2020/10/16", "due": "2020/10/22", "returned": "2020/10/21", "status": "Returned", "badge": "success" },
                { "id": "202010305132", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "success" },
                { "id": "202010305133", "book": "Book of Invisible Question", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "success" },
                { "id": "202011065898", "book": "Atomic Habits", "borrowed": "2020/11/06", "due": "2020/11/12", "returned": "2020/11/13", "status": "Returned", "badge": "success" },
                { "id": "202011126431", "book": "Hujan", "borrowed": "2020/11/12", "due": "2020/11/18", "returned": "", "status": "Overdue", "badge": "danger" },
                { "id": "202011166876", "book": "Dilan 1990", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "warning" },
                { "id": "202011166877", "book": "Dilan 1991", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "warning" }
            ],
            showInfo: false
        }
    }

    componentDidMount() {
        // Initialize datatable
        $(function () {
            $('#historyUser').DataTable({
                responsive: true
            });
        });
    }

    handleShowInfo = () => {
        this.setState({ showInfo: true })
    }

    handleCloseInfo = () => {
        this.setState({ showInfo: false })
    }

    render() {
        const { data, showInfo } = this.state
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <Card>
                                    <Card.Header>
                                        <h3>Borrowed and Returned</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive striped id="historyUser" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Transaction ID</th>
                                                    <th>Action</th>
                                                    <th>Book Title</th>
                                                    <th>Date Borrowed</th>
                                                    <th>Due Date</th>
                                                    <th>Date Returned</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map(user => {
                                                        return (
                                                            <tr>
                                                                <td>{user.id}</td>
                                                                <td>
                                                                    <Button variant="primary" size="sm" data-toggle="modal" onClick={this.handleShowInfo}>
                                                                        <i className="fa fa-info-circle"></i>
                                                                    </Button>
                                                                </td>
                                                                <td>{user.book}</td>
                                                                <td>{user.borrowed}</td>
                                                                <td>{user.due}</td>
                                                                <td>{user.returned}</td>
                                                                <td><Badge variant={user.badge}>{user.status}</Badge></td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div >
                </section >

                <Modal size="lg" show={showInfo} onHide={this.handleCloseInfo}>
                    <Modal.Header closeButton>
                        <Modal.Title>Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="transactionID">
                                <Form.Label column sm="3">
                                    Transaction ID
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="202011202011" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="borrowerName">
                                <Form.Label column sm="3">
                                    Borrower Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="User" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="bookTitle">
                                <Form.Label column sm="3">
                                    Book Title
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="Dilan 1990" />
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} controlId="dateBorrowed">
                                <Form.Label column sm="3">
                                    Date Borrowed
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="11/11/2020" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="dueDate">
                                <Form.Label column sm="3">
                                    Due Date
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="11/18/2020" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="dateReturned">
                                <Form.Label column sm="3">
                                    Date Returned
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="11/18/2020" />
                                </Col>
                            </Form.Group>
                            <hr />
                            <Form.Group as={Row} controlId="late">
                                <Form.Label column sm="3">
                                    Late
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="Rp 0" />
                                    <Form.Text className="text-muted desc">0 day(s) late</Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="damage">
                                <Form.Label column sm="3">
                                    Damage
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="Rp 0" />
                                    <Form.Text className="text-muted desc">No damage</Form.Text>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="totalfine">
                                <Form.Label column sm="3">
                                    Total Fine
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue="Rp 0" />
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row} controlId="status">
                                <Form.Label column sm="3">
                                    Status
                                </Form.Label>
                                <Col sm="9">
                                    <Badge variant="success">Returned</Badge>
                                </Col>
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleCloseInfo}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div >
        )
    }
}

export default HistoryUser