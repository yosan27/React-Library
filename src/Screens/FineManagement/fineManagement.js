import React, { Component } from "react";
import axios from "axios";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "jquery/dist/jquery.min.js";
import $ from "jquery";

export default class FineManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fineList: [],
      id: "",
      fineCode: "",
      fineType: "",
      nominal: "",
      validFrom: "",
      validTo: "",
      button: "Add Fine",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8500/api/fine/get-active").then((e) => {
      this.setState({ fineList: e.data });
    });

    $(function () {
      $("#fine-list").DataTable({
        responsive: true,
      });
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  addFine = () => {
    if (this.state.button === "Add Fine") {
      let fineList = {
        fineCode: this.state.fineCode,
        fineType: this.state.fineType,
        nominal: this.state.nominal,
        validFrom: this.state.validFrom,
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
        validFrom: this.state.validFrom,
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
      button : "Update Fine" 
    });

    axios.get(`http://localhost:8500/api/fine/get-by-id/${getId}`).then((e) => {
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
    axios.delete(`http://localhost:8500/api/fine/${getId}`)
      .then(()=>window.location.reload())
  }

  render() {
    return (
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
                    <form className="mb-4">
                      <div className="form-group row">
                        <label for="fineCode" className="col-sm-2">
                          Fine Code
                        </label>
                        <input
                          name="fineCode"
                          className="col-sm-3"
                          id="fineCode"
                          placeholder="Fine Code"
                          autoComplete="off"
                          required
                          autoFocus
                          value={this.state.fineCode}
                          onChange={(e) => this.handleChange(e)}
                        ></input>
                      </div>

                      <div className="form-group row">
                        <label for="fineType" className="col-sm-2">
                          Fine Type
                        </label>
                        <input
                          name="fineType"
                          className="col-sm-3"
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
                        <label for="nominal" className="col-sm-2">
                          Nominal
                        </label>
                        <input
                          name="nominal"
                          className="col-sm-3"
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
                        <label for="validFrom" className="col-sm-2">
                          Valid From
                        </label>
                        <input
                          name="validFrom"
                          className="col-sm-3"
                          id="validFrom"
                          placeholder="Valid From"
                          autoComplete="off"
                          required
                          autoFocus
                          value={this.state.validFrom}
                          onChange={(e) => this.handleChange(e)}
                        ></input>
                      </div>

                      <div className="form-group row">
                        <label for="validTo" className="col-sm-2">
                          Valid To
                        </label>
                        <input
                          name="validTo"
                          className="col-sm-3"
                          id="validTo"
                          placeholder="Valid To"
                          autoComplete="off"
                          required
                          autoFocus
                          value={this.state.validTo}
                          onChange={(e) => this.handleChange(e)}
                        ></input>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={this.addFine}
                      >
                        {this.state.button}
                      </button>
                    </form>

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
                                    className="btn btn-primary"
                                    onClick={() => this.update(fine.id)}
                                  >
                                    <i className="fa fa-edit"></i>
                                  </button>
                                  <button
                                    size="sm"
                                    className="btn btn-primary ml-1"
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
    );
  }
}
