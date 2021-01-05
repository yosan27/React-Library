import React, { Component } from 'react'
import axios from 'axios'
import { Link, withRouter } from 'react-router-dom'
import swal from 'sweetalert'

class ReturnForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            rentCode: '',
            fullName: '',
            bookTitle: '',
            dateBorrow: '',
            dueDate: '',
            status: '',
            fine: []
        }
    }

    componentDidMount() {
        this.getData(this.state.id)
        this.getFine()
    }

    async getData(id) {
        await axios.get(`http://localhost:8500/api/rent/id/${id}`).then((res) => {
            let rent = res.data
            this.setState({
                rentCode: rent.rentCode,
                fullName: rent.userEntity.fullName,
                bookTitle: rent.bookEntity.bookDetailsEntity.bookTitle,
                dateBorrow: rent.dateBorrow,
                dueDate: rent.dueDate,
                status: rent.status
            })

            this.setLate(rent.dueDate)
        })
    }

    getFine() {
        axios.get('http://localhost:8500/api/fine').then((res) => {
            this.setState({ fine: res.data })
        })
    }

    formatDate(date) {
        var d = new Date(date)
        var year = d.getFullYear()
        var month = '' + (d.getMonth() + 1)
        var day = '' + d.getDate()
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    setLate = (due) => {
        var today = this.formatDate(Date.now())
        var limit = new Date(due)
        var current = new Date(today)
        var diffTime = Math.abs(current - limit)
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
        var fine = diffDays * 1000;

        document.getElementById("dateReturn").value = today
        document.getElementById("latePrice").value = "Rp " + fine
        document.getElementById("lateDays").innerText = diffDays + " day(s) late"

        this.setTotal(fine)
    }

    setTotal = (late) => {
        var input = document.getElementsByClassName("damage")
        var total = 9000

        for (var i = 0; i < input.length; i++) {
            if (input[i].checked) {
                total += parseFloat(input[i].value)
            }
        }
        
        document.getElementsByClassName("totalfine")[0].value = "Rp " + total.toFixed(0)
      }

    alertSubmit = () => {
        swal("Success!", "Book has been returned", "success")
    }

    render() {
        const { fine } = this.state;
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
                                                    <input type="text" readOnly className="form-control-plaintext" value={this.state.rentCode} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Borrower Name</label>
                                                <div className="col-sm-9">
                                                    <input type="text" readOnly className="form-control-plaintext" value={this.state.fullName} />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Book Title</label>
                                                <div className="col-sm-9">
                                                    <input type="text" readOnly className="form-control-plaintext" value={this.state.bookTitle} />
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Borrowed</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input type="text" className="form-control" value={this.state.dateBorrow} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Due Date</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input type="text" className="form-control" value={this.state.dueDate} disabled />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Returned</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input type="text" className="form-control" id="dateReturn" disabled />
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
                                                    {
                                                        fine.map((fine, index) => {
                                                            return(
                                                                <div className="form-group" key={index}>
                                                                    <div className="form-check">
                                                                        <input type="checkbox" className="form-check-input damage" value={fine.nominal} onClick={this.setTotal} />
                                                                        <label className="form-check-label">{fine.fineType + " - " + fine.nominal}</label>
                                                                    </div>
                                                                    <div className="mt-2">
                                                                        <input type="number" className="replyNumber" min="0" defaultValue="0" data-bind="value:replyNumber" hidden="true" />
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
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

export default withRouter(ReturnForm)