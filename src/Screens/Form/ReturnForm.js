import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import swal from "sweetalert";
import Axios from "../../Services/axios-instance";

class ReturnForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            rentCode: "",
            fullName: "",
            bookCode: "",
            bookTitle: "",
            dateBorrow: "",
            dueDate: "",
            status: "",
            late: "",
            lateDays: "",
            fine: [],
            lateNominal: "", //+
            lostNominal: "",
            fineChecked: [], //+
            detailCode: "", //+
            userCode: "", //+
            total: "", //+
            fineLateCode: "", //+
            fineLostCode: "",
            lostChecked: false,
            lostDisabled: false,
            fineListDisabled: false
        };
    }

    componentDidMount() {
        this.getData(this.state.id).then(() => {
            this.getTransactionDetailCode(); //+
            this.getFine();
        });
    }

    async getData(id) {
        await Axios.get(`rent/id/${id}`).then((res) => {
            let rent = res.data;
            this.setState({
                rentCode: rent.rentCode,
                fullName: rent.userEntity.fullName,
                userCode: rent.userEntity.userCode,
                bookCode: rent.bookEntity.bookCode,
                bookTitle: rent.bookEntity.bookDetailsEntity.bookTitle,
                dateBorrow: rent.dateBorrow,
                dueDate: rent.dueDate,
                status: rent.status,
            });
        });
    }

    getTransactionDetailCode() {
        // Get Transaction Detail Code
        Axios
            .get(
                `transaction-detail/user/${this.state.userCode}`
            )
            .then((record) => {
                let idCode = this.state.userCode.substring(
                    2,
                    this.state.userCode.length
                );
                if (record.data.length !== 0) {
                    let code = record.data[record.data.length - 1].detailCode;
                    this.setState({ detailCode: code.substring(4, code.length) });
                } else {
                    this.setState({ detailCode: `${idCode}000` });
                }
            });
    }

    getFine() {
        Axios.get("fine/active").then((res) => {
            console.log(res.data);
            res.data.forEach((e) => {
                //+
                if (e.fineType === "Late") {
                    this.setState({ lateNominal: e.nominal, fineLateCode: e.fineCode });
                } else {
                    if(e.fineType === "Lost") {
                        this.setState({ lostNominal: e.nominal, fineLostCode: e.fineCode });
                    } else {
                        this.setState({ fine: [...this.state.fine, e] });
                    }
                }
            });
            this.setLate(this.state.dueDate);
        });
    }

    setLate = (due) => {
        this.setState({ dateReturn: moment(Date.now()).format('YYYY-MM-DD') });

        var limit = new Date(due);
        var current = new Date(this.state.dateReturn);

        if (limit < current) {
            var diffTime = Math.abs(current - limit);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            var latefine = diffDays * parseFloat(this.state.lateNominal); //+
        } else {
            diffDays = 0;
            latefine = 0;
        }

        this.setState({ late: latefine, lateDays: diffDays });
        this.setTotal(1); //+ note: isinya sebenernya bebas cuma buat parameter aja
    };

    setTotal = (e) => {
        let { fineChecked, late, total } = this.state; //+
        this.setState({ total: late });

        // +
        if (e !== 1) {
            if (fineChecked.includes(e)) {
                const filter = fineChecked.filter((f) => f !== e);
                this.setState({
                    fineChecked: filter
                });
                
                if(this.state.lostChecked === false) {
                    this.setState({
                        total: late
                    })
                } else {
                    this.setState({
                        total: parseInt(total) - e.nominal,
                    });
                }
            }
            if (!fineChecked.includes(e)) {
                this.setState({
                    fineChecked: [...this.state.fineChecked, e],
                    total: parseInt(total) + e.nominal,
                });
            }
        }
    };

    setLost = () => {
        if(this.state.lostChecked === false) {
            this.setState({
                total: this.state.lostNominal + this.state.late,
                lostChecked: true,
                fineListDisabled: true
            })
        } else {
            this.setState({
                total: this.state.total - this.state.lostNominal,
                lostChecked: false,
                fineListDisabled: false,
            })
        }
    };

    alertSubmit = () => {
        swal({
            title: "Are you sure?",
            text: "Make sure the data is correct!",
            icon: "warning",
            buttons: {
                cancel: true,
                confirm: "Confirm",
            }
        }).then((ok) => {
            if (ok) {
                this.submit();
            } else {
                swal("Canceled!", "The book has not been returned", "error");
            }
        })
    }

    submit = () => {
        let bookStatus, totalLost;
        let date = this.state.dateReturn;
        
        if (this.state.lostChecked === true) {
            bookStatus = { status: 0 };
        } else {
            bookStatus = { status: 1 };
        }

        // Change book status
        Axios.put('book/status/' + this.state.bookCode, bookStatus)

        // Jika tidak ada denda
        if (this.state.late === 0 && this.state.fineChecked.length === 0) {
            let updateStat = {
                //+
                status: 5,
                dateReturn: date,
            };
            Axios
                .put(
                    `rent/code/${this.state.rentCode}`,
                    updateStat
                ) //+
                .then(() => {
                    this.state.fineChecked.forEach((e, i) => {
                        //+
                        let tempoCode = `${parseInt(this.state.detailCode) + (i + 1)}`;
                        let idCode = this.state.userCode.substring(
                            2,
                            this.state.userCode.length
                        );
                        let fixCode = `TD${idCode}${tempoCode.substring(1)}`;
                        let detail = {
                            detailCode: fixCode,
                            description: e.fineType,
                            debet: 0,
                            kredit: e.nominal,
                            fineCode: e.fineCode,
                            rentCode: this.state.rentCode,
                            userCode: this.state.userCode,
                            transactionCode: "NULL"
                        };
                        Axios.post("transaction-detail", detail);
                    });
                    swal("Success!", "Book has been returned", "success").then(() => {
                        window.open("http://localhost:3000/page/history", "_self");
                    });
                });
        }
        else if(this.state.late === 0){
                let updateStat = {
                    status: 4,
                    dateReturn: date,
                };
    
                if (this.state.lostChecked === true) {
                    totalLost = {
                        fineType: "Lost",
                        nominal: this.state.lostNominal,
                        fineCode: this.state.fineLostCode,
                    };
                    this.setState({ fineChecked: [totalLost] });
                } else {
                    this.setState({ fineChecked: [...this.state.fineChecked] });
                }
                
                Axios
                    .put(
                        `rent/code/${this.state.rentCode}`,
                        updateStat
                    ) //+
                    .then(() => {
                        this.state.fineChecked.forEach((e, i) => {
                            //+
                            let tempoCode = `${parseInt(this.state.detailCode) + (i + 1)}`;
                            let idCode = this.state.userCode.substring(
                                2,
                                this.state.userCode.length
                            );
                            let fixCode = `TD${idCode}${tempoCode.substring(1)}`;
                            let detail = {
                                detailCode: fixCode,
                                description: e.fineType,
                                debet: 0,
                                kredit: e.nominal,
                                fineCode: e.fineCode,
                                rentCode: this.state.rentCode,
                                userCode: this.state.userCode,
                                transactionCode: "NULL"
                            };
                            Axios.post("transaction-detail", detail);
                        });
                        swal("Success!", "Book has been returned", "success").then(() => {
                            window.open("http://localhost:3000/page/history", "_self");
                        });
                    });
        }
        // Jika ada denda 
        else {
            let updateStat = {
                status: 4,
                dateReturn: date,
            };
            let totalLate = {
                fineType: "Late",
                nominal: this.state.late,
                fineCode: this.state.fineLateCode,
            };

            if (this.state.lostChecked === true) {
                totalLost = {
                    fineType: "Lost",
                    nominal: this.state.lostNominal,
                    fineCode: this.state.fineLostCode,
                };
                this.setState({ fineChecked: [totalLate, totalLost] });
            } else {
                this.setState({ fineChecked: [...this.state.fineChecked, totalLate] });
            }
            
            Axios
                .put(
                    `rent/code/${this.state.rentCode}`,
                    updateStat
                ) //+
                .then(() => {
                    this.state.fineChecked.forEach((e, i) => {
                        //+
                        let tempoCode = `${parseInt(this.state.detailCode) + (i + 1)}`;
                        let idCode = this.state.userCode.substring(
                            2,
                            this.state.userCode.length
                        );
                        let fixCode = `TD${idCode}${tempoCode.substring(1)}`;
                        let detail = {
                            detailCode: fixCode,
                            description: e.fineType,
                            debet: 0,
                            kredit: e.nominal,
                            fineCode: e.fineCode,
                            rentCode: this.state.rentCode,
                            userCode: this.state.userCode,
                            transactionCode: "NULL"
                        };
                        Axios.post("transaction-detail", detail);
                    });
                    swal("Success!", "Book has been returned", "success").then(() => {
                        window.open("http://localhost:3000/page/history", "_self");
                    });
                });
        }
    };

    render() {
        const { fine } = this.state;
        return (
            <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
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
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        value={this.state.rentCode}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Borrower Name</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        value={this.state.fullName}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Book Title</label>
                                                <div className="col-sm-9">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control-plaintext"
                                                        value={this.state.bookTitle}
                                                    />
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Borrowed</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={this.state.dateBorrow}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Due Date</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={this.state.dueDate}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Date Returned</label>
                                                <div className="col-sm-3">
                                                    <div className="input-group date">
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            value={this.state.dateReturn}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="form-group row pb-2">
                                                <label className="col-sm-3 col-form-label">Late</label>
                                                <div className="col-sm-3">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={"Rp " + this.state.late}
                                                        disabled
                                                    />
                                                    <small className="form-text text-muted">
                                                        {this.state.lateDays + " day(s) late"}
                                                    </small>
                                                </div>
                                            </div>
                                            <div className="form-group row pb-2">
                                                <label className="col-sm-3 col-form-label">Damage</label>
                                                <div className="col-sm-9">
                                                    {fine.map((fine, index) => {
                                                        return (
                                                            <div className="form-group pb-1" key={index}>
                                                                <div className="form-check">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="form-check-input list"
                                                                        id={"damage" + index}
                                                                        value={fine.nominal}
                                                                        onClick={() => this.setTotal(fine)}
                                                                        disabled={this.state.fineListDisabled}
                                                                    />
                                                                    {/* + */}
                                                                    <label className="form-check-label" htmlFor={"damage" + index}>
                                                                        {fine.fineType + " - Rp " + fine.nominal}
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div className="form-check pb-1">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="lost"
                                                            id="lost"
                                                            value={this.state.lostNominal}
                                                            onChange={this.setLost}
                                                            checked={this.state.lostChecked}
                                                            disabled={this.state.lostDisabled}
                                                        />
                                                        <label className="form-check-label" htmlFor="lost">
                                                            {"Lost - Rp " + this.state.lostNominal}
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label">Total Fine</label>
                                                <div className="col-sm-3">
                                                    <input
                                                        type="text"
                                                        readOnly
                                                        className="form-control totalfine"
                                                        value={"Rp " + this.state.total}
                                                        disabled
                                                    />{" "}
                                                    {/* + */}
                                                </div>
                                            </div>
                                            <hr></hr>
                                            <div className="d-flex justify-content-end">
                                                <Link
                                                    className="btn btn-success"
                                                    onClick={this.alertSubmit}
                                                >
                                                    Submit
                                                </Link>
                                                {/* + */}
                                                <Link to="/page/history">
                                                    <button className="btn btn-secondary">Cancel</button>
                                                </Link>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default withRouter(ReturnForm);