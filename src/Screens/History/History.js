import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'
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
                { "rentCode": "R001", "name": "John Elder", "book": "Unbranding", "borrowed": "10/05/2020", "due": "10/11/2020", "returned": "10/09/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R002", "name": "Fiona Green", "book": "Koala Kumal", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/12/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R003", "name": "Jane Gaines", "book": "Filosofi Teras", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/15/2020", "status": "Returned", "badge": "success", "late": "3", "damage": "0", "total": "3" },
                { "rentCode": "R004", "name": "Mary Soccer", "book": "Milea: Suara dari Dilan", "borrowed": "10/07/2020", "due": "10/13/2020", "returned": "10/13/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R005", "name": "John Elder", "book": "Laut Bercerita", "borrowed": "10/08/2020", "due": "10/14/2020", "returned": "10/14/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R006", "name": "June Watanabe", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Returned", "badge": "success", "late": "2", "damage": "0", "total": "2" },
                { "rentCode": "R007", "name": "Martha Stewart", "book": "Laut Bercerita", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/16/2020", "status": "Returned", "badge": "success", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R008", "name": "Martha Stewart", "book": "Pulang", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Waiting for Payment", "badge": "info", "late": "2", "damage": "0", "total": "2" },
                { "rentCode": "R009", "name": "July August", "book": "Hujan", "borrowed": "10/23/2020", "due": "11/05/2020", "returned": "", "status": "Overdue", "badge": "danger", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R010", "name": "Fiona Green", "book": "The Book You Wish Your Parents Had Read", "borrowed": "10/28/2020", "due": "11/11/2020", "returned": "", "status": "Overdue", "badge": "danger", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R011", "name": "Mary Soccer", "book": "Book of Invisible Question", "borrowed": "11/09/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R012", "name": "Mary Soccer", "book": "The Book You Wish Your Parents Had Read", "borrowed": "11/10/2020", "due": "11/23/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R013", "name": "Angelica Smith", "book": "The Things You Can See Only When You Slow Down", "borrowed": "11/16/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R014", "name": "Devina Claire", "book": "Sapiens", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" },
                { "rentCode": "R015", "name": "Rey Frank", "book": "Educated", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "warning", "late": "0", "damage": "0", "total": "0" }
            ]
        }
    }

    componentDidMount() {
        $(function () {
            $('#history').DataTable({
                responsive: true
            });
        });
    }

    render() {
        const { data } = this.state
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Borrowed and Returned</h3>
                                    </div>
                                    <div className="card-body">
                                        <table id="history" className="table table-striped" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Rent Code</th>
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
                                                    data.map((user, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{user.rentCode}</td>
                                                                <td>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-primary btn-sm rounded-sm mr-1" data-toggle="modal" data-target="#info">
                                                                            <i className="fa fa-info-circle"></i>
                                                                        </button>
                                                                        <Link to='/page/returnForm'>
                                                                            <button className="btn btn-primary btn-sm rounded-sm">
                                                                                <i className="fa fa-exchange"></i>
                                                                            </button>
                                                                        </Link>
                                                                    </div>
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
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >

                {/* MODAL INFO */}
                <div className="modal fade" id="info" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Rent Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext" id="rentCode" defaultValue="R001" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Borrower Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext" id="borrowerName" defaultValue="User" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Book Title</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext" id="bookTitle" defaultValue="Dilan 1990" />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Date Borrowed</label>
                                        <div className="col-sm-3">
                                            <div className="input-group date" id="dateBorrowed">
                                                <input type="text" className="form-control" defaultValue="11/11/2020" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Due Date</label>
                                        <div className="col-sm-3">
                                            <div className="input-group date" id="dueDate">
                                                <input type="text" className="form-control" defaultValue="11/18/2020" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Date Returned</label>
                                        <div className="col-sm-3">
                                            <div className="input-group date" id="dateReturned">
                                                <input type="text" className="form-control" defaultValue="11/20/2020" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row pb-1">
                                        <label className="col-sm-3 col-form-label">Late</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext pb-0" id="late" defaultValue="Rp 2.000" />
                                            <small className="form-text text-muted">2 day(s) late</small>
                                        </div>
                                    </div>
                                    <div className="form-group row pb-1">
                                        <label className="col-sm-3 col-form-label">Damage</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext pb-0" id="damage" defaultValue="Rp 10.000" />
                                            <small className="form-text text-muted">Torn</small>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Total Fine</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext" id="totalfine" defaultValue="Rp 12.000" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <span className="badge badge-info">Waiting for Payment</span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default History