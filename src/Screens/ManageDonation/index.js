import React, { Component } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";

import axios from "../../Services/axios-instance";
import swal from "sweetalert";

import API from "../../api";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import $ from "jquery";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';


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
      categoryCode: "",
      button: "Update Data",
      categoryList: [],
      categoryName: "",
      showAddExist: false,
      showAdd1: false,
      showAdd2: false,
      showEdit: false,
      data: [],
      editClicked: false,
      bookCode: "",
      showAddExist: false,
      showAdd1: false,
      showAdd2: false,
      showEdit: false,
      showDelete: false,
      authorCode: "",
      bookDetailCode: "",
      categoryCode: "",
      publisherCode: "",
      urlImage: "",
      title: "",
      subtitle: "",
      author: "",
      publisherName: "",
      publisherAddress: "",
      description: "",
      pages: "",
      startDate: new Date(),
      language: "",
      length: "",
      isbn: "",
      weight: "",
      width: "",
      numberOfPages: "",
      category: "",
      baseImage: "",
      authorList: "",
      bookDetailList: "",
      categoryList: "",
      publisherList: ""
    }
    this.donationChange = this.donationChange.bind(this)
  }

  handleExistOrNot = () => {
    this.setState({ showAddExist: true })
  }

  handleShowAdd = () => {
    this.setState({ showAddExist: false, showAdd1: true })
  }
  donationChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleAddBook = () => {
    let addBookDonate = {
      publisherName: this.state.publisherName,
      address: this.state.publisherAddress,
      bookTitle: this.state.title,
      bookSubtitle: this.state.subtitle,
      authorName: this.state.author,
      cover: this.state.urlImage,
      description: this.state.description,
      categoryName: this.state.category,
      numberOfPages: this.state.numberOfPages,
      publishedDate: this.state.startDate,
      isbn: this.state.isbn,
      language: this.state.language
    };

    axios.post("newbooks", addBookDonate)
      .then(() => {
        this.setState({
          showAdd1: false,
          editClicked: true
        })
        swal("Success!", "Book Has Been Added", "success");
        window.location.reload()
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }


  handleShowAdd2 = () => {
    this.setState({ showAddExist: false, showAdd2: true })
  }

  handleAddBook2 = () => {
    if (this.state.startDate && this.state.isbn) {
      this.setState({ showAdd2: false })
      API.post(
        `api/book`,
        {
          authorCode: this.state.authorCode,
          bookDetailCode: this.state.bookDetailCode,
          categoryCode: this.state.categoryCode,
          publisherCode: this.state.publisherCode,
          publishedDate: this.state.startDate,
          isbn: this.state.isbn
        },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => {
          this.setState({
            showAdd2: false,
            editClicked: true
          })
          swal("Success!", "Book Has Been Added", "success");
        })
        .catch((error) => {
          swal("Oops!", "Please try again", "error");
          console.log(error);
        });
    } else {
      swal("Oops!", "Data is not valid", "error");
    }
  }

  handleCloseModal = () => {
    this.setState({
      showAddExist: false, showAdd1: false, showEdit: false, showDelete: false, showAdd2: false,
      bookCode: "", authorCode: "", bookDetailCode: "", categoryCode: "", startDate: "", date: "", isbn: ""
    })
  }

  componentDidMount() {
    this.findPerson();
    this.getCategory();
  }

  findPerson() {
    axios.get("donation")
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
      .delete(`donation/${getId}`)
      .then(() => window.location.reload());
  };


  getDetail = (getId) => {
    this.setState({
      id: getId,

    });

    axios.get(`donation/id/${getId}`).then((e) => {
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

  addUpdate = () => {
    let donationList = {
      author: this.state.author,
      bookTitle: this.state.bookTitle,
      year: this.state.year,
      description: this.state.description,
      categoryCode: this.state.categoryCode
    };
    axios
      .put(`donation-detail/${this.state.id}`, donationList)
      .then(() => window.location.reload());
  };


  async getCategory() {
    const res = await axios.get('category')
    const data = res.data

    const options = data.map(d => ({
      "value": d.categoryCode,
      "label": d.categoryName

    }))

    this.setState({ categoryList: options })

  }

  handleChange = (event) => {


    if (event.target.name === "bookTitle") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "author") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "year") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    if (event.target.name === "description") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }


  };


  handleChangeCategory = (e) => {
    this.setState({ categoryCode: e.value });
  }


  submitReject = () => {
    swal("Rejected", "Book Donation Rejected", "warning");
  };

  submitAccept = () => {
    swal("Thank You", "Book Donation Successfully Received", "success");
  };



  render() {
    const { showAdd1, showAdd2, showAddExist } = this.state;
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
                                      className="btn btn-warning"
                                      data-toggle="modal"
                                      data-target="#edit"
                                      onClick={() => this.getDetail(donation.id)}
                                    >
                                      <i className="fa fa-eye"></i>
                                    </button>
                                    <button
                                      className="btn btn-success"
                                      data-toggle="modal"
                                      onClick={() => this.handleExistOrNot(donation.id)}
                                    >
                                      <i className="fa fa-check"></i>
                                    </button>
                                    <button
                                      className="btn btn-primary"
                                      onClick={() => this.getDetail(donation.id)}
                                      data-toggle="modal"
                                      data-target="#fineModal"
                                    >
                                      <i className="fa fa-edit"></i>
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

                  {/* UPDATE Modal */}
                  <div className="modal fade" tabindex="-1" id="fineModal">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h4 className="modal-title">Donation Update Data Form</h4>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true" onClick={this.clearModal} className="modal-clear">
                              &times;
                            </span>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div class="container">
                            <form className="mb-4">
                              <div className="form-group row">
                                <label for="fineType" className="col-sm-4">
                                  <b>Title</b></label>
                                <input
                                  name="bookTitle"
                                  className="col-sm-6"
                                  id="bookTitle"
                                  placeholder="Kisah Tanah Jawa"
                                  autoFocus
                                  autoComplete="off"
                                  value={this.state.bookTitle}
                                  onChange={(e) => this.handleChange(e, e.target.value)}
                                ></input>
                              </div>

                              <div className="form-group row">
                                <label for="nominal" className="col-sm-4">
                                  <b>Year</b>
                                </label>
                                <input
                                  name="year"
                                  className="col-sm-6"
                                  id="year"
                                  placeholder="2021"
                                  autoComplete="off"
                                  value={this.state.year}
                                  onChange={(e) => this.handleChange(e, e.target.value)}
                                ></input>
                              </div>

                              <div className="form-group row">
                                <label for="validTo" className="col-sm-4">
                                  <b>Author</b>
                                </label>
                                <input
                                  name="author"
                                  className="col-sm-6"
                                  placeholder="Pramoedya A. TOer"
                                  id="author"
                                  autoComplete="off"
                                  value={this.state.author}
                                  onChange={(e) => this.handleChange(e, e.target.value)}
                                // onInput={this.maxLengthCheck}
                                ></input>
                              </div>

                              <div className="form-group row">
                                <label for="category" className="col-sm-4">
                                  <b>Category</b>
                                </label>
                                <Select className="col-sm-6" name="category" options={this.state.categoryList} onChange={this.handleChangeCategory} />
                              </div>

                              <div className="form-group row">
                                <label for="description" className="col-sm-4">
                                  <b>Description/Condition</b>
                                </label>
                                <input
                                  name="description"
                                  className="col-sm-6"
                                  placeholder="Description of book"
                                  id="description"
                                  autoComplete="off"
                                  value={this.state.description}
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
                            onClick=""
                          >
                            <i class="fa fa-times-circle"></i> Close
                            </button>
                          <Link
                            className="btn btn-success add-btn"
                            onClick={this.addUpdate}
                          >
                            <i class="fa fa-plus mr-1"></i>
                            {this.state.button}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* MODAL DETAIL DATA */}

                  <div
                    class="modal fade"
                    id="edit"
                    tabindex="1"
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
                      </div>
                    </div>
                  </div>


                  {/* modal if*/}
                  <Modal size="lg" show={showAddExist} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Book Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <p>Does Author, Book details, Category and Publisher information already exist?</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn btn-secondary" variant="secondary" onClick={() => this.handleShowAdd(this.state.id)}>
                        <i class="fa fa-times-circle"></i> No
                        </Button>
                      <Button id="buttonAddBook" type="submit" className="btn btn-success" variant="primary" onClick={this.handleShowAdd2}>
                        <i class="fa fa-plus"></i> Yes
                        </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* modal add if*/}


                  {/* modal add if data not exist*/}
                  <Modal size="lg" show={showAdd1} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Book Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div class='container'>
                        <div class="modal-body">
                          <form>
                          </form>
                          <form>
                            <div class="form-group row">
                              <label for="addTitle" class="col-sm-2 col-form-label">Title</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="title"
                                  class="form-control"
                                  id="addTitle"
                                  placeholder="Title..."

                                  value={this.state.bookTitle}
                                  onChange={(e) => this.handleChange(e, e.target.value)}
                                  data-attribute-name="Title"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addSubtitle" class="col-sm-2 col-form-label">Subtitle</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="subtitle"
                                  class="form-control"
                                  id="addSubtitle"
                                  placeholder="Subtitle..."
                                  onChange={(e) => this.setState({ subtitle: e.target.value })}
                                  value={this.state.subtitle}
                                  data-attribute-name="Subtitle"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addAuthor" class="col-sm-2 col-form-label">Author</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="author"
                                  class="form-control"
                                  id="addAuthor"
                                  placeholder="Author..."
                                  onChange={(e) => this.setState({ author: e.target.value })}
                                  value={this.state.author}
                                  data-attribute-name="Author"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addPublisher" class="col-sm-2 col-form-label">Publisher</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="publisher"
                                  class="form-control"
                                  id="addPublisher"
                                  placeholder="Publisher..."
                                  onChange={(e) => this.setState({ publisherName: e.target.value })}
                                  value={this.state.publisher}
                                  data-attribute-name="Publisher"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addPublisher" class="col-sm-2 col-form-label">Publisher Address</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="publisherAddress"
                                  class="form-control"
                                  id="addPublisherAddress"
                                  placeholder="Publisher Adress..."
                                  onChange={(e) => this.setState({ publisherAddress: e.target.value })}
                                  value={this.state.publisherAddress}
                                  data-attribute-name="publisherAddress"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addImage" class="col-sm-2 col-form-label">Url Image</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="urlImage"
                                  class="form-control"
                                  id="addUrlImage"
                                  placeholder="URL Image..."
                                  onChange={(e) => this.setState({ urlImage: e.target.value })}
                                  value={this.state.urlImage}
                                  data-attribute-name="urlImage"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addDesc" class="col-sm-2 col-form-label">Description</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="description"
                                  class="form-control"
                                  id="addDescription"
                                  placeholder="Description..."
                                  onChange={(e) => this.setState({ description: e.target.value })}
                                  value={this.state.description}
                                  data-attribute-name="description"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addDesc" class="col-sm-2 col-form-label">Category</label>
                              <div class="col-sm-10">
                                <input
                                  type="text"
                                  name="category"
                                  class="form-control"
                                  id="addcategory"
                                  placeholder="Category..."
                                  onChange={(e) => this.setState({ category: e.target.value })}
                                  value={this.state.category}
                                  data-attribute-name="category"
                                  data-async
                                />
                              </div>
                            </div>
                            <hr />
                            <div class="form-group row">
                              <label for="addPages" class="col-sm-2 col-form-label">Number of Pages</label>
                              <div class="col-sm-4">
                                <input
                                  type="text"
                                  name="numberOfPages"
                                  class="form-control"
                                  id="addNumberOfPages"
                                  placeholder="Number of Pages..."
                                  onChange={(e) => this.setState({ numberOfPages: e.target.value })}
                                  value={this.state.numberOfPages}
                                  data-attribute-name="numberOfPages"
                                  data-async
                                />
                              </div>
                              <label for="addIsbn" class="col-sm-2 col-form-label">ISBN</label>
                              <div class="col-sm-4">
                                <input
                                  type="text"
                                  name="isbn"
                                  class="form-control"
                                  id="isbn"
                                  placeholder="ISBN..."
                                  onChange={(e) => this.setState({ isbn: e.target.value })}
                                  value={this.state.isbn}
                                  data-attribute-name="isbn"
                                  data-async
                                />
                              </div>
                            </div>
                            <div class="form-group row">
                              <label for="addPublishedDate" class="col-sm-2 col-form-label">Published Date</label>
                              <div class="col-sm-4">
                                <DatePicker
                                  selected={this.state.startDate}
                                  onChange={this.handleChange}
                                  dateFormat='yyyy-MM-dd'
                                />
                                <br />
                                <small className="text-muted">(yyyy-MM-dd)</small>
                              </div>
                              <label for="addWeight" class="col-sm-2 col-form-label">Language</label>
                              <div class="col-sm-4">
                                <input
                                  type="text"
                                  name="language"
                                  class="form-control"
                                  id="language"
                                  placeholder="Language..."
                                  onChange={(e) => this.setState({ language: e.target.value })}
                                  value={this.state.language}
                                  data-attribute-name="language"
                                  data-async
                                />
                              </div>
                            </div>
                            {/* <div class="form-group row">
                                <label for="addLang" class="col-sm-2 col-form-label">Cover</label>
                                <div class="col-sm-4">
                                <input 
                                    style={{display:'none'}}
                                    type="file" 
                                    name="urlImage"
                                    id="addImage" 
                                    onBlur={this.form.handleBlurEvent}
                                    // onChange={this.form.handleChangeEvent}
                                    value={fields.urlImage} 
                                    data-attribute-name="Url Image"
                                    data-async
                                    onChange={(e) => {
                                      this.pickImage(e);
                                    }}
                                    accept=".jpeg, .png, .jpg"
                                    ref={fileInput => this.fileInput = fileInput}
                                  />
                                  <Button onClick={() => this.fileInput.click()}>Pick Image</Button>
                                  <br/><br/>
                                  <img src={baseImage?baseImage:"assets/images/cover.png"} height="80vh" alt = 'cover'/> */}
                            {/* <label className="error" style={{color: "red"}}>
                                    {errors.urlImage ? errors.urlImage : ""}
                                  </label> */}
                            {/* </div>
                              </div> */}
                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                        <i class="fa fa-times-circle"></i> Close
                        </Button>
                      <Button id="buttonAddBook" type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddBook}>
                        <i class="fa fa-plus"></i> Add
                        </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* modal add if data not exist*/}


                  {/* modal add data exist*/}
                  <Modal size="lg" show={showAdd2} onHide={this.handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Add Book Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div class='container'>
                        <div class="modal-body">
                          <form>
                            <div class="form-group row">
                              <label for="addAuthorCode" class="col-sm-2 col-form-label">Author Name</label>
                              <div class="col-sm-4 mb-3">
                                <Select
                                  className="mb-2"
                                  options={this.state.authorList}
                                  onChange={this.handleChangeSelect1}
                                />
                                <Link to="/page/manageAuthor" className="btn btn-light">
                                  <i class="fa fa-plus"></i><small className="text-muted"> Add more author</small>
                                </Link>
                              </div>
                              <label for="addBookDetailCode" class="col-sm-2 col-form-label">Book Details Info</label>
                              <div class="col-sm-4">
                                <Select
                                  className="mb-2"
                                  options={this.state.bookDetailList}
                                  onChange={this.handleChangeSelect2}
                                />
                                <Link to="/page/manageBookDetail" className="btn btn-light">
                                  <i class="fa fa-plus"></i><small className="text-muted"> Add more book details</small>
                                </Link>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label for="addCategoryCode" class="col-sm-2 col-form-label">Category</label>
                              <div class="col-sm-4 mb-3">
                                <Select
                                  className="mb-2"
                                  options={this.state.categoryList}
                                  onChange={this.handleChangeSelect3}
                                />
                                <Link to="/page/manageCategory" className="btn btn-light">
                                  <i class="fa fa-plus"></i><small className="text-muted"> Add more category</small>
                                </Link>
                              </div>
                              <label for="addPublisherCode" class="col-sm-2 col-form-label">Publisher</label>
                              <div class="col-sm-4">
                                <Select
                                  className="mb-2"
                                  options={this.state.publisherList}
                                  onChange={this.handleChangeSelect4}
                                />
                                <Link to="/page/managePublisher" className="btn btn-light">
                                  <i class="fa fa-plus"></i><small className="text-muted"> Add more publisher</small>
                                </Link>
                              </div>
                            </div>

                            <div class="form-group row">
                              <label for="addPublishedDate" class="col-sm-2 col-form-label">Published Date</label>
                              <div class="col-sm-4">
                                <DatePicker
                                  selected={this.state.startDate}
                                  onChange={this.handleChange}
                                  dateFormat='yyyy-MM-dd'
                                />
                                <br />
                                <small className="text-muted">(yyyy-MM-dd)</small>
                              </div>
                              <label for="addIsbn" class="col-sm-2 col-form-label">ISBN</label>
                              <div class="col-sm-4">
                                <input
                                  type="text"
                                  name="isbn"
                                  class="form-control"
                                  id="isbn"
                                  placeholder="ISBN..."
                                  onChange={(e) => this.setState({ isbn: e.target.value })}
                                  value={this.state.isbn}
                                  data-attribute-name="isbn"
                                  data-async
                                />
                              </div>
                            </div>

                          </form>
                        </div>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                        <i class="fa fa-times-circle"></i> Close
                        </Button>
                      <Button id="buttonAddBook" type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddBook2}>
                        <i class="fa fa-plus"></i> Add
                        </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* modal add data exist*/}



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
