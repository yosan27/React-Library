import React, { Component } from "react";
import swal from "sweetalert";

class ManageDonation extends Component {
  constructor() {
    super();
    this.state = {
      data: [
        {
          id: "202010052078",
          book: "Unbranding",
          author: "S. Mara Gd",
          borrowed: "2020/10/05",
          category: "Fiction",
          image:
            "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg",
        },
        {
          id: "202010052079",
          book: "Koala Kumal",
          author: "Tere Liye",
          borrowed: "2020/10/05",
          category: "Fiction",
          image:
            "https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg",
        },
        {
          id: "202010082453",
          book: "Laut Bercerita",
          author: "Pramoedya A. Toer",
          borrowed: "2020/10/08",
          category: "Romance",
          image:
            "https://www.gramedia.com/blog/content/images/2020/05/tokyo-dan-perayaan-kesedihan_gramedia.jpg",
        },
        {
          id: "202010092605",
          book: "Pulang",
          author: "Tere Liye",
          borrowed: "2020/10/09",
          category: "Horror",
          image:
            "https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg",
        },
        {
          id: "202010092606",
          book: "Becoming",
          author: "S. Mara gd",
          borrowed: "2020/10/09",
          category: "Fiction",
          image:
            "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg",
        },
      ],
    };
  }

  submitReject = () => {
    swal("Rejected", "Book Donation Rejected", "warning");
  };

  submitAccept = () => {
    swal("Thank You", "Book Donation Successfully Received", "success");
  };

  render() {
    const { data } = this.state;
    return (
      <div className="right_col" role="main" style={{ minHeight: "100vh" }}>
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Borrowed and Returned</h3>
                  </div>
                  <div className="card-body">
                    <div className="table-responsive">
                      <table
                        id="history-user"
                        className="table table-striped table-white"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>Book ID</th>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Donation Date</th>
                            <th>Categories</th>
                            <th>Book Photo</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((user) => {
                            return (
                              <tr>
                                <td>{user.id}</td>
                                <td>{user.book}</td>
                                <td>{user.author}</td>
                                <td>{user.borrowed}</td>
                                <td>{user.category}</td>
                                <td>
                                  <img height="80" src={user.image} alt="" />
                                </td>
                                <td>
                                  <span className="d-flex justify-content-center">
                                    <button
                                      className="btn btn-primary"
                                      data-toggle="modal"
                                      data-target="#edit"
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
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* MODAL */}

                <div
                  class="modal fade"
                  id="edit"
                  tabindex="-1"
                  aria-labelledby="editModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">
                          Detail Donation #2017100251
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
                              Misteri Terakhir#1{" "}
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
                            <h5 class="col-lg-8 text-center">S. Mara Gd </h5>
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
                              Young Adult Fiction
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
                            <h5 class="col-lg-8 text-center">2020</h5>
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
                              Kondisi bagus, tidak ada halaman hilang.
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
                            <h5 class="col-lg-8 text-center">Garen Dow</h5>
                          </div>
                          <hr />
                          <div class="row justify-content-md-center">
                            <label
                              for="editTitle"
                              class="col-sm-1 col-form-label"
                            >
                              Donation Date
                            </label>
                            <h5 class="col-lg-8 text-center">2020-03-16</h5>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => this.submitReject()}
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          class="btn btn-success"
                          onClick={() => this.submitAccept()}
                        >
                          Accept
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
    );
  }
}

export default ManageDonation;
