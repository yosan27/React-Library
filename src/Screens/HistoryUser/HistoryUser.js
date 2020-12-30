import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'

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
                { "rentCode": "R001", "book": "Unbranding", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "success" },
                { "rentCode": "R002", "book": "Koala Kumal", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "success" },
                { "rentCode": "R003", "book": "Laut Bercerita", "borrowed": "2020/10/08", "due": "2020/10/14", "returned": "2020/10/14", "status": "Returned", "badge": "success" },
                { "rentCode": "R004", "book": "Pulang", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/14", "status": "Returned", "badge": "success" },
                { "rentCode": "R005", "book": "Becoming", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/16", "status": "Returned", "badge": "success" },
                { "rentCode": "R006", "book": "The Book You Wish Your Parents Had Read", "borrowed": "2020/10/16", "due": "2020/10/22", "returned": "2020/10/21", "status": "Returned", "badge": "success" },
                { "rentCode": "R007", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "success" },
                { "rentCode": "R008", "book": "Book of Invisible Question", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "success" },
                { "rentCode": "R009", "book": "Atomic Habits", "borrowed": "2020/11/06", "due": "2020/11/12", "returned": "2020/11/13", "status": "Returned", "badge": "success" },
                { "rentCode": "R010", "book": "Hujan", "borrowed": "2020/11/12", "due": "2020/11/18", "returned": "", "status": "Overdue", "badge": "danger" },
                { "rentCode": "R011", "book": "Dilan 1990", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "warning" },
                { "rentCode": "R012", "book": "Dilan 1991", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "warning" }
            ],
        }
    }

    componentDidMount() {
        $(function () {
            $('#historyUser').DataTable({
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
                                        <table id="historyUser" className="table table-striped" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Rent Code</th>
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
                                                    data.map((user, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{user.rentCode}</td>
                                                                <td>
                                                                    <button className="btn btn-primary btn-sm rounded-sm mr-1" data-toggle="modal" data-target="#info">
                                                                        <i className="fa fa-info-circle"></i>
                                                                    </button>
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
                                                <input type="text" className="form-control" defaultValue="11/18/2020" disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row pb-1">
                                        <label className="col-sm-3 col-form-label">Late</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext pb-0" id="late" defaultValue="Rp 0" />
                                            <small className="form-text text-muted">0 day(s) late</small>
                                        </div>
                                    </div>
                                    <div className="form-group row pb-1">
                                        <label className="col-sm-3 col-form-label">Damage</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext pb-0" id="damage" defaultValue="Rp 0" />
                                            <small className="form-text text-muted">No Damage</small>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Total Fine</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control-plaintext" id="totalfine" defaultValue="Rp 0" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Status</label>
                                        <div className="col-sm-9">
                                            <span className="badge badge-success">Returned</span>
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

export default HistoryUser