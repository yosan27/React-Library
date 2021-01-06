import React, { Component } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import $ from "jquery";

class ManageDonation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donationList: [],
      allList: [],
      id: "",
      bookTitle: "",
      author: "",
      year: "",
      description: "",
      photo: "",
      status: "",
      categoryCode: ""
    }
    this.donationChange = this.donationChange.bind(this)
  }

  donationChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentDidMount() {
    this.findPerson();
  }

  findPerson() {
    axios.get("http://localhost:8500/api/donation")
      .then((response) => {
        console.log(response);
        this.setState({
          donationList: response.data
        })
        $(function () {
          $("#donation-list").DataTable({
            responsive: true,
          });
        });
      });
  }

  delete = (getId) => {
    axios
      .delete(`http://localhost:8500/api/donation/${getId}`)
      .then(() => window.location.reload());
  };


  getDetail = (getId) => {
    axios.get(`http://localhost:8500/api/donation/id/${getId}`).then((e) => {
      let res = e.data;
      this.setState({
        author: res.author,
        bookTitle: res.bookTitle,
        year: res.year,
        description: res.description,
        photo: res.photo,
        status: res.status,
        categoryCode: res.categoryCode
      });
    });
  };


  // componentDidMount() {
  //   axios.get("http://localhost:8500/api/donation").then((e) => {
  //     this.setState({
  //       allList: e.data
  //     });

  //     $(function () {
  //       $("#donation-list").DataTable({
  //         responsive: true,
  //       });
  //     });
  //   });
  // }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value,
  //   });

  // };



  submitReject = () => {
    swal("Rejected", "Book Donation Rejected", "warning");
  };

  submitAccept = () => {
    swal("Thank You", "Book Donation Successfully Received", "success");
  };



  render() {
    const { author, bookTitle, year, description, photo, status } = this.state;
    return (
      <>
        <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
          <section className="mt-5 pt-5">
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h3 className="card-title">Donation Management</h3>
                    </div>
                    <div className="card-body">
                      <Table
                        responsive
                        striped
                        id="donation-list"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Book ID</th>
                            <th>Action</th>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Categories</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.donationList.map((donation, index) => {
                            return (
                              <tr>
                                <td>{donation.id}</td>
                                <td>
                                  <span className="d-flex justify-content-center">
                                    <button
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#edit"
                                      onClick={() => this.getDetail(donation.id)}
                                    >
                                      <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-success"
                                      data-toggle="modal"
                                      data-target="#delete"
                                    >
                                      <i className="fa fa-check"></i>
                                    </button>
                                    <button
                                      className="btn btn-danger"
                                      onClick={() => this.delete(donation.id)}
                                    >
                                      <i className="fa fa-eraser"></i>
                                    </button>
                                  </span>
                                </td>
                                <td>{donation.bookTitle}</td>
                                <td>{donation.author}</td>
                                <td>{donation.categoryEntity.categoryName}</td>
                                {donation.status === 3 && <td>Rejected</td>}
                                {donation.status === 2 && <td>Accepted</td>}
                                {donation.status === 1 && <td>Pending</td>}
                              </tr>
                            );
                          })}
                        </tbody>
                      </Table>
                    </div>
                  </div>

                  {/* MODAL */}

                  <div
                    class="modal fade"
                    id="edit"
                    tabindex="-1"
                    aria-labelledby="editModalLabel"
                    aria-hidden="true"
                    key={this.state.id}
                  >
                    <div class="modal-dialog modal-lg">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="editModalLabel">
                            Donation
                          </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="container" id="demo">
                            <div class="row justify-content-md-center">
                              <img
                                src="https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg"
                                height="350"
                                alt="Donation Book"
                              />
                            </div>
                            <br />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Title
                            </label>
                              <h5 class="col-lg-8 text-center">
                                {this.state.bookTitle}
                              </h5>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Author
                            </label>
                              <h5 class="col-lg-8 text-center">{this.state.author} </h5>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Category
                            </label>
                              <h5 class="col-lg-8 text-center">
                                {this.state.categoryCode}
                              </h5>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Year
                            </label>
                              <h5 class="col-lg-8 text-center">{this.state.year}</h5>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Condition
                            </label>
                              <p class="col-lg-8 text-center">
                                {this.state.description}
                              </p>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Donatur
                            </label>
                              <h5 class="col-lg-8 text-center">{this.state.author}</h5>
                            </div>
                            <hr />
                            <div class="row justify-content-md-center">
                              <label
                                for="editTitle"
                                class="col-sm-1 col-form-label"
                              >
                                Status
                            </label>
                              {this.state.status === 3 && <h5 class="col-lg-8 text-center">Rejected</h5>}
                              {this.state.status === 2 && <h5 class="col-lg-8 text-center">Accepted</h5>}
                              {this.state.status === 1 && <h5 class="col-lg-8 text-center">Pending</h5>}

                            </div>
                          </div>
                        </div>
                        <div class="modal-footer">

                          <button
                            type="button"
                            class="btn btn-warning"
                            onClick={() => this.submitAccept()}
                          >
                            Update
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODAL VERIFY */}
                  <div
                    class=" modal fade"
                    id="delete"
                    tabindex="-1"
                    aria-labelledby="editLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="deleteLabel">
                            Veriy The Donation to Faraday E-library
                        </h5>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <p>
                            Are you sure you want to accept the donation to
                            Faraday E-Library?
                        </p>
                        </div>
                        <div class="modal-footer">
                          <button
                            type="button"
                            class="btn btn-secondary"
                            data-dismiss="modal"
                          >
                            Cancel
                        </button>
                          <button
                            type="button"
                            class="btn btn-primary"
                            onClick={() => this.submitAccept()}
                          >
                            Accept
                        </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
}

export default ManageDonation;
