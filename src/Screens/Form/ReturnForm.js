import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'

class ReturnForm extends Component {
    constructor() {
        super()
        this.state = {
            id: '',
            detail: {}
        }
    }

    componentDidMount() {
        this.late();
        this.totalIt();
    }

    late = () => {
        var getDate = (new Date().getMonth() + 1) + "/" + new Date().getDate() + "/" + new Date().getFullYear()

        var limit = new Date("11/20/2020");
        var today = new Date(getDate);
        var diffTime = Math.abs(today - limit);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        var fine = diffDays * 1000;

        document.getElementById("latePrice").value = "Rp " + fine;
        document.getElementById("lateDays").innerText = diffDays + " day(s) late";
    }

    totalIt = () => {
        var input = document.getElementsByClassName("damage");
        var total = 0;
    
        for (var i = 0; i < input.length; i++) {
          if (input[i].checked) {
            total += parseFloat(input[i].value);
          }
        }

        document.getElementsByClassName("totalfine")[0].value = "Rp " + total.toFixed(0);
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
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Return Form</h3>
                                    </div>
                                    <div className="card-body">
                                        <form>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Rent Code</label>
                                                <div className="col-sm-9">
                                                    <input type="text" readOnly className="form-control-plaintext" id="rentCode" value="R001" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Borrower Name</label>
                                                <div className="col-sm-9">
                                                    <input type="text" readOnly className="form-control-plaintext" id="borrowerName" value="User" />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Book Title</label>
                                                <div className="col-sm-9">
                                                    <input type="text" readOnly className="form-control-plaintext" id="bookTitle" value="Dilan 1990" />
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Borrowed</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date" id="dateBorrowed">
                                                        <input type="text" className="form-control" value="11/11/2020" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Due Date</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date" id="dueDate">
                                                        <input type="text" className="form-control" value="11/18/2020" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Returned</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date" id="dateReturned">
                                                        <input type="text" className="form-control" value="11/20/2020" disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="form-group row pb-2">
                                                <label className="col-sm-3 col-form-label">Late</label>
                                                <div className="col-sm-3">
                                                    <input type="text" readOnly className="form-control" id="latePrice" disabled />
                                                    <small className="form-text text-muted" id="lateDays"></small>
                                                </div>
                                            </div>
                                            <div className="form-group row pb-2">
                                                <label className="col-sm-3 col-form-label">Damage</label>
                                                <div className="col-sm-9">
                                                    <div className="form-check">
                                                        <input className="form-check-input damage" type="checkbox" value="1000" onClick={this.totalIt} />
                                                        <label className="form-check-label">Folded (Rp 1.000)</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input damage" type="checkbox" value="10000" onClick={this.totalIt} />
                                                        <label className="form-check-label">Torn (Rp 10.000)</label>
                                                    </div>
                                                    <div className="form-check">
                                                        <input className="form-check-input damage" type="checkbox" value="100000" onClick={this.totalIt} />
                                                        <label className="form-check-label">Lost (Rp 100.000)</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Total Fine</label>
                                                <div className="col-sm-3">
                                                    <input type="text" readOnly className="form-control totalfine" value="Rp 0" disabled />
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="d-flex justify-content-end">
                                                <Link to='/page/history'>
                                                    <button className="btn btn-success" onClick={this.alertSubmit}>Submit</button>
                                                </Link>
                                                <Link to='/page/history'>
                                                    <button className="btn btn-secondary">Cancel</button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        )
    }
}

export default ReturnForm