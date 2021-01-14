import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import Axios from '../../Services/axios-instance'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

class History extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rent: [],
            fine: [],
            rentCode: '',
            userName: '',
            fullName: '',
            bookCode: '',
            bookTitle: '',
            dateBorrow: '',
            dueDate: '',
            dateReturn: '',
            status: '',
            totalFine: '',
        }
    }

    componentDidMount() {
        this.getAll()
        document.addEventListener('click', this.clearModal);
    }

    getAll() {
        Axios.get('rent').then((res) => {
            this.setState({ rent: res.data })

            $(function () {
                $('#history').DataTable({
                    responsive: true,
                    order: [[ 4, 'desc' ]]
                })
            })
        })
    }

    getById(id) {
        Axios.get(`rent/id/${id}`).then((res) => {
            this.setState({
                rentCode: res.data.rentCode,
                userName: res.data.userEntity.userName,
                fullName: res.data.userEntity.fullName,
                bookCode: res.data.bookEntity.bookCode,
                bookTitle: res.data.bookEntity.bookDetailsEntity.bookTitle,
                dateBorrow: res.data.dateBorrow,
                dueDate: res.data.dueDate,
                dateReturn: res.data.dateReturn,
                status: res.data.status
            })

            Axios.get(`transaction-detail/rent/${this.state.rentCode}`).then((res) => {
                res.data.forEach((d) => {
                    this.setState({ fine: [ ...this.state.fine, d ] })
                })
            })
        })
    }

    getByRentCode(rentcode) {
        Axios.get(`transaction-detail/rent/${rentcode}`).then((res) => {
            this.setState({
                fineType: res.data.fineType,
                nominal: res.data.nominal
            })
        })
    }

    setDateReturn(date) {
        if(date === null) {
            return "-"
        } else {
            return date
        }
    }

    setStatus(status) {
        if(status === 1) {
            return <span className="badge badge-secondary">Pending</span>
        } else if(status === 2) {
            return <span className="badge badge-warning">Borrowed</span>
        } else if(status === 3) {
            return <span className="badge badge-danger">Overdue</span>
        } else if(status === 4) {
            return <span className="badge badge-info">Waiting for Payment</span>
        } else if(status === 5) {
            return <span className="badge badge-success">Returned</span>
        } else if(status === 6) {
            return <span className="badge badge-dark">Cancel</span>
        }
    }

    setReturnButton(status) {
        if(status === 2 || status === 3) {
            return <button className="btn btn-primary btn-sm rounded-sm"><i className="fa fa-exchange"></i></button>
        }
    }

    setTakeButton(status, id) {
        if(status === 1) {
            return <button className="btn btn-primary btn-sm rounded-sm" onClick={() => this.updateTakeBook(id)}><i className="fa fa-book"></i></button>
        }
    }

    updateTakeBook = (id) => {
        swal({
            title: "Did the borrower take the books?",
            text: "Make sure the borrower takes the book!",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: "Confirm",
            }
        }).then((ok) => {
            if (ok) {
                let take = {
                    status: 2 // change pending to borrowed
                }
                Axios.put(`rent/${id}`, take).then(() => {
                    swal("Success!", "Borrow Books Successfully", "success").then(() => {
                        window.location.reload()
                    })
                })
            } else {
                swal("Cancelled!", "The books are still in the library", "error")
            }
        })
    }

    clearModal = (e) => {
        if (e.target.className === "modal fade" || e.target.className === "modal-clear" || e.target.className === "btn btn-secondary modal-clear") {
            this.setState({ dateReturn: '', fine: [] })
        }
    }

    render() {
        const {rent}  = this.state;
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
                                                    <th>Book</th>
                                                    <th>Date Borrowed</th>
                                                    <th>Due Date</th>
                                                    <th>Date Returned</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                rent.map((rent, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{rent.rentCode}</td>
                                                            <td>
                                                                <div className="btn-group" role="group">
                                                                    <span type="button" className="btn btn-primary btn-sm rounded-sm mr-1" data-toggle="modal" data-target="#info" onClick={() => this.getById(rent.id)}>
                                                                        <i className="fa fa-info-circle"></i>
                                                                    </span>
                                                                    <span>{this.setTakeButton(rent.status, rent.id)}</span>
                                                                    <Link to={`/page/return/${rent.id}`}>{this.setReturnButton(rent.status)}</Link>
                                                                </div>
                                                            </td>
                                                            <td>{rent.userEntity.fullName}</td>
                                                            <td>{rent.bookEntity.bookCode + " - " + rent.bookEntity.bookDetailsEntity.bookTitle}</td>
                                                            <td>{rent.dateBorrow}</td>
                                                            <td>{rent.dueDate}</td>
                                                            <td>{rent.dateReturn}</td>
                                                            <td>{this.setStatus(rent.status)}</td>
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
                <div className="modal fade" id="info" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="modal-clear">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Rent Code</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" value={this.state.rentCode} readOnly />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">User</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" value={this.state.userName} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Borrower Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" value={this.state.fullName} readOnly />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Book Code</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" value={this.state.bookCode} readOnly />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Book Title</label>
                                        <div className="col-sm-8">
                                            <input type="text" className="form-control-plaintext" value={this.state.bookTitle} readOnly />
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Date Borrowed</label>
                                        <div className="col-sm-5">
                                            <div className="input-group date">
                                                <input type="text" className="form-control" value={this.state.dateBorrow} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Due Date</label>
                                        <div className="col-sm-5">
                                            <div className="input-group date">
                                                <input type="text" className="form-control" value={this.state.dueDate} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Date Returned</label>
                                        <div className="col-sm-5">
                                            <div className="input-group date">
                                                <input type="text" className="form-control" value={this.setDateReturn(this.state.dateReturn)} disabled />
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Status</label>
                                        <div className="col-sm-8">
                                            {this.setStatus(this.state.status)}
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label"><b>Fine</b></label>
                                        <div className="col-sm-8 ml-0 pl-0">
                                        {
                                            this.state.fine.map((fine, index) => {
                                                return(
                                                    <div className="col-sm-8" key={index}>
                                                        <input type="text" className="form-control-plaintext pb-0" value={fine.kredit} />
                                                        <small className="form-text text-muted">{fine.fineEntity.fineType}</small>
                                                    </div>
                                                )
                                            })
                                        }
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary modal-clear" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default History