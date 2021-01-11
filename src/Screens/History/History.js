import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

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
            fullName: '',
            bookTitle: '',
            dateBorrow: '',
            dueDate: '',
            dateReturn: '',
            status: '',
            totalFine: ''
        }
    }

    componentDidMount() {
        this.getAll()
        document.addEventListener('click', this.clearModal);
        
    }

    getAll() {
        axios.get('http://localhost:8500/api/rent').then((res) => {
            this.setState({ rent: res.data })

            $(function () {
                $('#history').DataTable({
                    responsive: true
                })
            })
        })
    }

    getById(id) {
        axios.get(`http://localhost:8500/api/rent/id/${id}`).then((res) => {
            this.setState({
                rentCode: res.data.rentCode,
                fullName: res.data.userEntity.fullName,
                bookTitle: res.data.bookEntity.bookDetailsEntity.bookTitle,
                dateBorrow: res.data.dateBorrow,
                dueDate: res.data.dueDate,
                dateReturn: res.data.dateReturn,
                status: res.data.status
            })

            axios.get(`http://localhost:8500/api/transaction-detail/get-by-rent-code/${this.state.rentCode}`).then((res) => {
                res.data.map((d) => {
                    this.setState({
                        fine: [ ...this.state.fine, d ]
                    })
                })
            })
        })
    }

    getByRentCode(rentcode) {
        axios.get(`http://localhost:8500/api/transaction-detail/get-by-rent-code/${rentcode}`).then((res) => {
            this.setState({
                fineType: res.data.fineType,
                nominal: res.data.nominal
            })
        })
    }

    alertTakeBook = () => {
        swal("Success!", "the book has been taken by the borrower", "success")
        window.location.reload()
    }

    setStatusTakeBook = (id) => {
        axios.put(`http://localhost:8500/api/rent/status/${id}`).then(() => {
            this.alertTakeBook()
        })
    }

    setTakeBook(status, id) {
        if(status === 1) {
            return <button className="btn btn-primary btn-sm rounded-sm" data-toggle="modal" data-target="#takeBook" onClick={() => this.setStatusTakeBook(id)}><i className="fa fa-book"></i></button>
        }
    }

    setReturn(status) {
        if(status === 2 || status === 3) {
            return <button className="btn btn-primary btn-sm rounded-sm"><i className="fa fa-exchange"></i></button>
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
                                                    <th>Book Title</th>
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
                                                                    <button className="btn btn-primary btn-sm rounded-sm mr-1" data-toggle="modal" data-target="#info" onClick={() => this.getById(rent.id)}>
                                                                        <i className="fa fa-info-circle"></i>
                                                                    </button>
                                                                    <span>{this.setTakeBook(rent.status, rent.id)}</span>
                                                                    <Link to={`/page/return/${rent.id}`}>{this.setReturn(rent.status)}</Link>
                                                                </div>
                                                            </td>
                                                            <td>{rent.userEntity.fullName}</td>
                                                            <td>{rent.bookEntity.bookDetailsEntity.bookTitle}</td>
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
                <div className="modal fade" id="info" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="modal-clear">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Rent Code</label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.rentCode} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Borrower Name</label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.fullName} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-4 col-form-label">Book Title</label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.bookTitle} />
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
                                                <input type="text" className="form-control" value={this.state.dateReturn} disabled />
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
                                    {/* <div className="form-group row">
                                        <label className="col-sm-4 col-form-label"><b>Total Fine</b></label>
                                        <div className="col-sm-8">
                                            <input type="text" readOnly className="form-control-plaintext" defaultValue="0" />
                                        </div>
                                    </div> */}
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary modal-clear" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL TAKE BOOK */}
                <div className="modal fade" id="takeBook" tabIndex="-1" aria-labelledby="takeBookLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="takeBookLabel">Take Book</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure the borrower has taken the book?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default History