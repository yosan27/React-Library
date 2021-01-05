import React, { Component } from "react";
import axios from "axios";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "jquery/dist/jquery.min.js";
import $ from "jquery";
import { Link } from "react-router-dom";

export default class FineManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastCode:"",
      fineList: [],
      allList: [],
      id: "",
      fineCode: "",
      fineType: "",
      nominal: "",
      validTo: "",
      button: "Add Fine",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8500/api/fine/active").then((e) => {
      this.setState({ fineList: e.data });
    });

    axios.get("http://localhost:8500/api/fine").then((e) => {
      this.setState({
        allList : e.data
      });
      if(this.state.allList.length !== 0){
        let lastDigit = this.state.allList[this.state.allList.length-1].fineCode.substr(3);
        let secondDigit = this.state.allList[this.state.allList.length-1].fineCode.substr(2,1);
        let firstDigit = this.state.allList[this.state.allList.length-1].fineCode.substr(1,1);
        if(lastDigit === 9){
          if(secondDigit === 9){
            let firstPlus = parseInt(firstDigit)+1;
            let code = `F${firstPlus}00`;
            this.setState({lastCode : code});
          }else{
            let secondPlus = parseInt(secondDigit)+1;
            let code = `F${firstDigit}${secondPlus}0`;
            this.setState({lastCode : code});
          }
        }else{
          let lastPlus = parseInt(lastDigit)+1;
          let code = `F${firstDigit}${secondDigit}${lastPlus}`;
          this.setState({lastCode : code});
        }
      }else{
        this.setState({lastCode : "F001"});
      }
      this.setState({fineCode: this.state.lastCode});

      $(function () {
        $("#fine-list").DataTable({
          responsive: true,
        });
      });
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });

    if (
      this.state.fineCode !== "" &&
      this.state.fineList !== "" &&
      this.state.nominal !== "" &&
      this.state.validFrom !== "" &&
      this.state.validTo !== ""
    ) {
      document.querySelector(".add-btn").classList.remove("disabled");
    }
  };

  addFine = () => {
    if (this.state.button === "Add Fine") {
      let fineList = {
        fineCode: this.state.fineCode,
        fineType: this.state.fineType,
        nominal: this.state.nominal,
        validTo: this.state.validTo,
      };
      axios
        .post("http://localhost:8500/api/fine", fineList)
        .then(() => window.location.reload());
    } else {
      let fineList = {
        fineCode: this.state.fineCode,
        fineType: this.state.fineType,
        nominal: this.state.nominal,
        validTo: this.state.validTo,
      };
      axios
        .put(`http://localhost:8500/api/fine/${this.state.id}`, fineList)
        .then(() => window.location.reload());
    }
  };

  update = (getId) => {
    this.setState({
      id: getId,
      button: "Update Fine",
    });

    axios.get(`http://localhost:8500/api/fine/id/${getId}`).then((e) => {
      let res = e.data;
      this.setState({
        fineCode: res.fineCode,
        fineType: res.fineType,
        nominal: res.nominal,
        validFrom: res.validFrom,
        validTo: res.validTo,
      });
    });
  };

  delete = (getId) => {
    axios
      .delete(`http://localhost:8500/api/fine/${getId}`)
      .then(() => window.location.reload());
  };

  render() {
    return (
      <>
        <div className="right_col" role="main">
          <section className="mt-5 pt-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h3>Fine Management</h3>
                    </div>

                    <div className="card-body">
                      <button
                        className="btn btn-success mb-5"
                        onClick={this.handleShowAdd}
                        data-toggle="modal"
                        data-target="#fineModal"
                      >
                        <i class="fa fa-plus"></i> Add Fine
                      </button>

                      <table
                        responsive
                        striped
                        id="fine-list"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Fine Code</th>
                            <th>Action</th>
                            <th>Fine Type</th>
                            <th>Nominal</th>
                            <th>Valid From</th>
                            <th>Valid To</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.fineList.map((fine) => {
                            return (
                              <tr>
                                <td>{fine.fineCode}</td>
                                <td>
                                  <div class="btn-group" role="group">
                                    <button
                                      size="sm"
                                      className="btn btn-warning"
                                      onClick={() => this.update(fine.id)}
                                      data-toggle="modal"
                                      data-target="#fineModal"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button
                                      size="sm"
                                      className="btn btn-danger ml-1"
                                      onClick={() => this.delete(fine.id)}
                                    >
                                      <i className="fa fa-eraser"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>{fine.fineType}</td>
                                <td>{fine.nominal}</td>
                                <td>{fine.validFrom}</td>
                                <td>{fine.validTo}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div
          className="modal fade"
          tabindex="-1"
          id="fineModal"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Fine Form</h4>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="container">
                  <form className="mb-4">
                    <div className="form-group row">
                      <label for="fineCode" className="col-sm-3">
                        Fine Code
                      </label>
                      <input
                        name="fineCode"
                        className="col-sm-6"
                        id="fineCode"
                        placeholder="Fine Code"
                        value={this.state.fineCode}
                        onChange={(e) => this.handleChange(e)}
                        style={{backgroundColor : "lightgray"}}
                        readOnly
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="fineType" className="col-sm-3">
                        Fine Type
                      </label>
                      <input
                        name="fineType"
                        className="col-sm-6"
                        id="fineType"
                        placeholder="Fine Type"
                        autoComplete="off"
                        required
                        autoFocus
                        value={this.state.fineType}
                        onChange={(e) => this.handleChange(e)}
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="nominal" className="col-sm-3">
                        Nominal
                      </label>
                      <input
                        name="nominal"
                        className="col-sm-6"
                        id="nominal"
                        placeholder="Nominal"
                        autoComplete="off"
                        required
                        autoFocus
                        value={this.state.nominal}
                        onChange={(e) => this.handleChange(e)}
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="validTo" className="col-sm-3">
                        Valid To
                      </label>
                      <input
                        name="validTo"
                        className="col-sm-6"
                        id="validTo"
                        placeholder="31/12/9999"
                        autoComplete="off"
                        required
                        autoFocus
                        value={this.state.validTo}
                        onChange={(e) => this.handleChange(e)}
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
               <button className="btn btn-secondary" data-dismiss="modal">
                  <i class="fa fa-times-circle"></i> Close
                </button>
                <Link
                  className="btn btn-success disabled add-btn"
                  onClick={this.addFine}
                >
                  <i class="fa fa-plus mr-1"></i>
                  {this.state.button}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
