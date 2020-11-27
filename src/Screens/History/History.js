import React, { Component } from 'react'
import { Card, Table, Modal, Form, Row, Col, Badge, Button, ButtonGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

class History extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { "id": "202010052078", "name": "John Elder", "book": "Unbranding", "borrowed": "10/05/2020", "due": "10/11/2020", "returned": "10/09/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010062201", "name": "Fiona Green", "book": "Koala Kumal", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/12/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010062219", "name": "Jane Gaines", "book": "Filosofi Teras", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/15/2020", "status": "Returned", "badge": "success", "late": "3", "damage": "0", "total": "3" },
                { "id": "202010072324", "name": "Mary Soccer", "book": "Milea: Suara dari Dilan", "borrowed": "10/07/2020", "due": "10/13/2020", "returned": "10/13/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010082453", "name": "John Elder", "book": "Laut Bercerita", "borrowed": "10/08/2020", "due": "10/14/2020", "returned": "10/14/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010122921", "name": "June Watanabe", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Returned", "badge": "success", "late": "2", "damage": "0", "total": "2" },
                { "id": "202010122934", "name": "Martha Stewart", "book": "Laut Bercerita", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/16/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010122946", "name": "Martha Stewart", "book": "Pulang", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Waiting for Payment", "badge": "info", "late": "2", "damage": "0", "total": "2" },
                { "id": "202010234187", "name": "July August", "book": "Hujan", "borrowed": "10/23/2020", "due": "11/05/2020", "returned": "", "status": "Overdue", "badge": "danger", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010284763", "name": "Fiona Green", "book": "The Book You Wish Your Parents Had Read", "borrowed": "10/28/2020", "due": "11/11/2020", "returned": "", "status": "Overdue", "badge": "danger", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011097654", "name": "Mary Soccer", "book": "Book of Invisible Question", "borrowed": "11/09/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011107710", "name": "Mary Soccer", "book": "The Book You Wish Your Parents Had Read", "borrowed": "11/10/2020", "due": "11/23/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011168109", "name": "Angelica Smith", "book": "The Things You Can See Only When You Slow Down", "borrowed": "11/16/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011198732", "name": "Devina Claire", "book": "Sapiens", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011198765", "name": "Rey Frank", "book": "Educated", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" }
            ],
            showInfo: false
        }
    }

    componentDidMount() {
        // Initialize datatable
        $(function () {
            $('#history').DataTable({
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
                                        <Table responsive striped id="history" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Transaction ID</th>
                                                    <th>Action</th>
                                                    <th>Borrower Name</th>
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
                                                                    <ButtonGroup>
                                                                        <Button size="sm" data-toggle="modal" onClick={this.handleShowInfo}>
                                                                            <i className="fa fa-info-circle"></i>
                                                                        </Button>
                                                                        <Link to='/extendForm'>
                                                                            <Button size="sm" className="ml-1"><i className="fa fa-edit"></i></Button>
                                                                        </Link>
                                                                        <Link to='/returnForm'>
                                                                            <Button size="sm" className="ml-1"><i className="fa fa-exchange"></i></Button>
                                                                        </Link>
                                                                    </ButtonGroup>
                                                                </td>
                                                                <td>{user.name}</td>
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

export default History