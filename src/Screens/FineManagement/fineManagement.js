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
      lastCode: "",
      fineList: [],
      allList: [],
      id: "",
      fineCode: "",
      fineType: "",
      nominal: "",
      validTo: "",
      button: "Add Fine",
      a: false,
      b: false,
      c: false,
    };
  }

  componentDidMount() {
    // Click Outside
    document.addEventListener("click", this.clearModal);

    // Get Data On List
    axios.get("http://localhost:8500/api/fine/active").then((e) => {
      this.setState({ fineList: e.data });
      $(function () {
        $("#fine-list").DataTable({
          responsive: true,
        });
      });
    });
    // Get All Fine
    this.getCode();
  }

  getCode = () => {
    axios.get("http://localhost:8500/api/fine").then((e) => {
      this.setState({
        allList: e.data,
      });
      // Get Fine Code
      if (this.state.allList.length !== 0) {
        let lastDigit = this.state.allList[
          this.state.allList.length - 1
        ].fineCode.substr(3);
        let secondDigit = this.state.allList[
          this.state.allList.length - 1
        ].fineCode.substr(2, 1);
        let firstDigit = this.state.allList[
          this.state.allList.length - 1
        ].fineCode.substr(1, 1);
        if (lastDigit === 9) {
          if (secondDigit === 9) {
            let firstPlus = parseInt(firstDigit) + 1;
            let code = `F${firstPlus}00`;
            this.setState({ lastCode: code });
          } else {
            let secondPlus = parseInt(secondDigit) + 1;
            let code = `F${firstDigit}${secondPlus}0`;
            this.setState({ lastCode: code });
          }
        } else {
          let lastPlus = parseInt(lastDigit) + 1;
          let code = `F${firstDigit}${secondDigit}${lastPlus}`;
          this.setState({ lastCode: code });
        }
      } else {
        this.setState({ lastCode: "F001" });
      }
      this.setState({ fineCode: this.state.lastCode });
    });
  };

  clearModal = (e) => {
    // Check click event listener
    if (
      e.target.className === "modal fade" ||
      e.target.className === "btn btn-secondary modal-clear" ||
      e.target.className === "modal-clear" ||
      e.target.className === "fa fa-times-circle"
    ) {
      // Get Fine Code
      this.getCode();
      // Clear Modal Form
      this.setState({
        fineType: "",
        nominal: "",
        validTo: "",
      });
      document.querySelector(".add-btn").classList.add("disabled");
      if(this.state.button === "Update Fine"){
        this.setState({button : "Add Fine"})
      }
    }
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  handleChange = (event, value) => {
    let { a, b, c, button } = this.state;
    const re = /^[0-9\b]+$/;
    const date = /^[0-9/]+$/;

    if(button !== "Add Fine"){
      this.setState({a:true, b:true, c:true})
    }

    // Validate user input
    if (event.target.name === "validTo") {
      if (value === "" || date.test(value)) {
        // Day
        if (value.substring(0, 1).includes("/") || value.substring(0, 1) > 3) {
          event.target.value = event.target.value.slice(0, 0);
        }
        if (
          value.substring(1, 2).includes("/") ||
          (value.substring(0, 1) === "3" && value.substring(1, 2) > 1)
        ) {
          event.target.value = event.target.value.slice(0, 1);
        }
        if (!value.substring(2, 3).includes("/")) {
          event.target.value = event.target.value.slice(0, 2);
        }
        // Month
        if (value.substring(3, 4).includes("/") || value.substring(3, 4) > 1) {
          event.target.value = event.target.value.slice(0, 3);
        }
        if (
          value.substring(4, 5).includes("/") ||
          (value.substring(3, 4) === "1" && value.substring(4, 5) > 2)
        ) {
          event.target.value = event.target.value.slice(0, 4);
        }
        if (!value.substring(5, 6).includes("/")) {
          event.target.value = event.target.value.slice(0, 5);
        }
        // Year
        if (value.substring(6, 10).includes("/")) {
          event.target.value = event.target.value.slice(0, 6);
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
        if (value !== "" && value.length === 10) {
          this.setState({ a: true });
          if (b && c) {
            document.querySelector(".add-btn").classList.remove("disabled");
          }
        } else {
          this.setState({ a: false });
          document.querySelector(".add-btn").classList.add("disabled");
        }
      }
    }

    if (event.target.name === "nominal") {
      if (event.target.value === "" || re.test(event.target.value)) {
        this.setState({
          [event.target.name]: event.target.value,
        });
        if (value !== "" && value.length >= 3) {
          this.setState({ b: true });
          if (a && c) {
            document.querySelector(".add-btn").classList.remove("disabled");
          }
        } else {
          this.setState({ b: false });
          document.querySelector(".add-btn").classList.add("disabled");
        }
      }
    }

    if (event.target.name === "fineType") {
      if (value !== "") {
        this.setState({
          [event.target.name]: event.target.value,
          c: true
        });
        if(value !== " "){
          if (b && a) {
            document.querySelector(".add-btn").classList.remove("disabled");
          }
        }else {
          this.setState({ c: false });
          document.querySelector(".add-btn").classList.add("disabled");
        }
      }
    }
  };

  addFine = () => {
    // Check button name
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
      // Button name : Update Fine
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
    document.querySelector(".add-btn").classList.remove("disabled");
    this.setState({
      id: getId,
      button: "Update Fine",
    });

    // Get data by id and fill form
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
        {/* Header & Data Table*/}
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

        {/* Modal*/}
        <div className="modal fade" tabindex="-1" id="fineModal">
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
                  <span
                    aria-hidden="true"
                    onClick={this.clearModal}
                    className="modal-clear"
                  >
                    &times;
                  </span>
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
                        style={{ backgroundColor: "lightgray" }}
                        readOnly
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="fineType" className="col-sm-3">
                        Fine Type
                      </label>
                      <select value={this.state.fineType} name="fineType" onChange={(e) => this.handleChange(e, e.target.value)}>
                        <option value=" ">- Select -</option>
                        <option value="Late">Late</option>
                        <option value="Fold">Fold</option>
                        <option value="Torn">Torn</option>
                        <option value="Lost">Lost</option>
                      </select>
                    </div>

                    <div className="form-group row">
                      <label for="nominal" className="col-sm-3">
                        Nominal
                      </label>
                      <input
                        name="nominal"
                        className="col-sm-6"
                        id="nominal"
                        placeholder="5000"
                        autoComplete="off"
                        value={this.state.nominal}
                        onChange={(e) => this.handleChange(e, e.target.value)}
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="validTo" className="col-sm-3">
                        Valid To
                      </label>
                      <input
                        maxLength="10"
                        name="validTo"
                        className="col-sm-6"
                        placeholder="dd/mm/yyyy"
                        id="validTo"
                        autoComplete="off"
                        value={this.state.validTo}
                        onChange={(e) => this.handleChange(e, e.target.value)}
                        // onInput={this.maxLengthCheck}
                      ></input>
                    </div>
                  </form>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary modal-clear"
                  data-dismiss="modal"
                  onClick={this.clearModal}
                >
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
