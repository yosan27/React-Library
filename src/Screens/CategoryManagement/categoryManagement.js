import React, { Component } from "react";

import axios from "../../Services/axios-instance";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "jquery/dist/jquery.min.js";
import $ from "jquery";

import { Link } from "react-router-dom";

export default class CategoryManagement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lastCode: "",
      categoryList: [],
      allList: [],
      id: "",
      categoryCode: "",
      categoryName: "",
      button: "Add Category",
    };
  }

  componentDidMount() {
    // Click Outside
    document.addEventListener("click", this.clearModal);

    this.findCategory();
    this.getCode();
  }

  findCategory() {
    axios.get("category").then((response) => {
      console.log(response.data);
      this.setState({
        categoryList: response.data,
      });
      $(function () {
        $("#fine-list").DataTable({
          responsive: true,
        });
      });
    });
  }

  getCode = () => {
    axios.get("category").then((e) => {
      this.setState({
        allList: e.data,
      });
      // Get Cat Code
      if (this.state.allList.length !== 0) {
        let lastDigit = this.state.allList[
          this.state.allList.length - 1
        ].categoryCode.substr(4);
        let secondDigit = this.state.allList[
          this.state.allList.length - 1
        ].categoryCode.substr(3, 1);
        let firstDigit = this.state.allList[
          this.state.allList.length - 1
        ].categoryCode.substr(2, 1);
        if (lastDigit === "9") {
          if (secondDigit === "9") {
            let firstPlus = parseInt(firstDigit) + 1;
            let code = `BC${firstPlus}00`;
            this.setState({ lastCode: code });
          } else {
            let secondPlus = parseInt(secondDigit) + 1;
            let code = `BC${firstDigit}${secondPlus}0`;
            this.setState({ lastCode: code });
          }
        } else {
          let lastPlus = parseInt(lastDigit) + 1;
          let code = `BC${firstDigit}${secondDigit}${lastPlus}`;
          this.setState({ lastCode: code });
        }
      } else {
        this.setState({ lastCode: "BC001" });
      }
      this.setState({ categoryCode: this.state.lastCode });
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
      // Get Code
      this.getCode();
      // Clear Modal Form
      this.setState({
        categoryName: "",
      });
      document.querySelector(".add-btn").classList.add("disabled");
      if (this.state.button === "Update Category") {
        this.setState({ button: "Add Category" });
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
    let { button } = this.state;

    if (button !== "Add Category") {
      document.querySelector(".add-btn").classList.remove("disabled");
    }

    if (value !== "" || value !== " ") {
      this.setState({
        [event.target.name]: event.target.value,
      });
      document.querySelector(".add-btn").classList.remove("disabled");
    } else {
      document.querySelector(".add-btn").classList.add("disabled");
    }
  };

  addCategory = () => {
    // Check button name
    if (this.state.button === "Add Category") {
      let categoryList = {
        categoryCode: this.state.categoryCode,
        categoryName: this.state.categoryName,
      };
      axios
        .post("category", categoryList)
        .then(() => window.location.reload());
    } else {
      // Button name : Update
      let categoryList = {
        categoryCode: this.state.categoryCode,
        categoryName: this.state.categoryName,
      };
      axios
        .put(
          `update-category/${this.state.id}`,
          categoryList
        )
        .then(() => window.location.reload());
    }
  };

  update = (getId) => {
    document.querySelector(".add-btn").classList.remove("disabled");
    this.setState({
      id: getId,
      button: "Update Category",
    });

    // Get data by id and fill form
    axios.get(`category/id/${getId}`).then((e) => {
      let res = e.data;
      this.setState({
        categoryCode: res.categoryCode,
        categoryName: res.categoryName,
      });
    });
  };

  delete = (getId) => {
    axios
      .delete(`delete-category/${getId}`)
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
                      <h3>Category Management</h3>
                    </div>

                    <div className="card-body">
                      <button
                        className="btn btn-success mb-5"
                        data-toggle="modal"
                        data-target="#fineModal"
                      >
                        <i class="fa fa-plus"></i> Add New Category
                      </button>

                      <table
                        responsive
                        striped
                        id="fine-list"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Category Code</th>
                            <th>Action</th>
                            <th>Category Type</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.categoryList.map((cat) => {
                            return (
                              <tr>
                                <td>{cat.categoryCode}</td>
                                <td>
                                  <div class="btn-group" role="group">
                                    <button
                                      size="sm"
                                      className="btn btn-warning"
                                      onClick={() => this.update(cat.id)}
                                      data-toggle="modal"
                                      data-target="#fineModal"
                                    >
                                      <i className="fa fa-edit"></i>
                                    </button>
                                    <button
                                      size="sm"
                                      className="btn btn-danger ml-1"
                                      onClick={() => this.delete(cat.id)}
                                    >
                                      <i className="fa fa-eraser"></i>
                                    </button>
                                  </div>
                                </td>
                                <td>{cat.categoryName}</td>
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
                <h4 className="modal-title">Category Form</h4>
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
                        Category Code
                      </label>
                      <input
                        name="fineCode"
                        className="col-sm-6"
                        id="fineCode"
                        placeholder="Category Code"
                        value={this.state.categoryCode}
                        style={{ backgroundColor: "lightgray" }}
                        onChange={(e) => this.handleChange(e, e.target.value)}
                      ></input>
                    </div>

                    <div className="form-group row">
                      <label for="categoryName" className="col-sm-3">
                        Category Type
                      </label>
                      <input
                        name="categoryName"
                        maxLength="32"
                        className="col-sm-6"
                        id="categoryName"
                        placeholder="Fiction | History | Romance"
                        autoComplete="off"
                        value={this.state.categoryName}
                        onChange={(e) => this.handleChange(e, e.target.value)}
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
                  onClick={this.addCategory}
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
