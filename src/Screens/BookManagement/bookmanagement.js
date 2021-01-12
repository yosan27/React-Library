import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
import { Link } from 'react-router-dom';
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import API from "../../api";
import $ from 'jquery';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css';
import Moment from 'react-moment';
import moment from 'moment';
import Select from 'react-select';

class BookManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
  }

  async componentDidMount() {
    // DATA TABEL
    try {
      const res = await API.get(`/api/books`);
      const tabledata = res.data.data;

      this.setState({ data: tabledata });

      $(function () {
        $('#bookmanagement').DataTable({
          responsive: true
        });
      });

    } catch (error) {
      console.log(error);
    }
    this.getCategory();
  }

  // pickImage = (e) => {
  //   const file = e.target.files[0];
  //   if (file){
  //     const reader = new FileReader();
  //     reader.onload = this._handleReaderLoaded.bind(this)
  //     reader.readAsDataURL(file)
  //   }
  // }

  // _handleReaderLoaded = (e) => {
  //   let binaryStr = e.target.result
  //   this.setState({ baseImage: (binaryStr)})
  //   console.log(this.state.baseImage)
  // }


  handleExistOrNot = () => {
    this.setState({ showAddExist: true })
  }

  handleShowAdd = () => {
    this.setState({ showAddExist: false, showAdd1: true })
  }

  handleAddBook = () => {
    this.setState({ showAdd2: false })
    API.post(
      `api/newbooks`,
      {
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
          showAdd1: false,
          editClicked: true
        })
        swal("Success!", "Book Has Been Added", "success");
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

  //button edit
  handleShowEdit = (bkcd) => {
    this.setState({ showEdit: true, bookCode: bkcd })
    API.get(`/api/book/${bkcd}`).then((res) => {
      let response = res.data.data;
      let date = moment(response.publishedDate).toDate();
      this.setState({
        authorCode: response.authorEntity.authorCode,
        bookDetailCode: response.bookDetailsEntity.bookDetailCode,
        categoryCode: response.categoryEntity.categoryCode,
        publisherCode: response.publisherEntity.publisherCode,
        startDate: date,
        isbn: response.isbn,
        bookCode: response.bookCode
      });
    });
  };

  handleSaveEdit = () => {
    this.setState({ showEdit: false, })
    API.put(
      `api/book/${this.state.bookCode}`,
      {
        authorCode: this.state.authorCode,
        bookDetailCode: this.state.bookDetailCode,
        categoryCode: this.state.categoryCode,
        publisherCode: this.state.publisherCode,
        publishedDate: this.state.startDate,
        isbn: this.state.isbn,
        bookCode: this.state.bookCode
      },
      {
        headers: {
          Accept: "*/*",
          "Content-Type": "application/json",
        },
      }
    )
      .then(() => {
        this.setState({ editClicked: true, bookCode: "", authorCode: "", bookDetailCode: "", categoryCode: "", publisherCode: "", publishedDate: "", isbn: "" })
        swal("Great!", "Book Has Been edited", "success");
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }

  //button delete
  handleShowDelete = (bkcd) => {
    this.setState({ showDelete: true, bookCode: bkcd })
  }

  handleDelete = () => {
    API.delete(`/api/book/${this.state.bookCode}`)
      .then(() => window.location.reload())
    // swal("Deleted!", "Book Is Successfully Deleted", "success");
    this.setState({ showDelete: false })
  }

  // utils
  handleCloseModal = () => {
    this.setState({
      showAddExist: false, showAdd1: false, showEdit: false, showDelete: false, showAdd2: false,
      bookCode: "", authorCode: "", bookDetailCode: "", categoryCode: "", startDate: "", date: "", isbn: ""
    })
  }

  async getCategory() {
    const res = await API.get('/api/author')
    const dataAuthor = res.data

    const options1 = dataAuthor.map(d => ({
      "value": d.authorCode,
      "label": d.authorName
    }))
    this.setState({ authorList: options1 })

    const res2 = await API.get('/api/bookdetails')
    const dataBookDetail = res2.data.data

    const options2 = dataBookDetail.map(d => ({
      "value": d.bookDetailCode,
      "label": d.bookTitle
    }))
    this.setState({ bookDetailList: options2 })

    const res3 = await API.get('/api/category')
    const dataCategory = res3.data

    const options3 = dataCategory.map(d => ({
      "value": d.categoryCode,
      "label": d.categoryName
    }))
    this.setState({ categoryList: options3 })

    const res4 = await API.get('/api/publisher/active')
    const dataPublisher = res4.data

    const options4 = dataPublisher.map(d => ({
      "value": d.publisherCode,
      "label": d.publisherName
    }))
    this.setState({ publisherList: options4 })
  }

  handleChangeSelect1 = (e) => {
    this.setState({ authorCode: e.value });
  }

  handleChangeSelect2 = (e) => {
    this.setState({ bookDetailCode: e.value });
  }

  handleChangeSelect3 = (e) => {
    this.setState({ categoryCode: e.value });
  }

  handleChangeSelect4 = (e) => {
    this.setState({ publisherCode: e.value });
  }

  handleChange = date => {
    this.setState({
      startDate: date
    });
  };

  async componentDidUpdate(prevState) {
    if (this.state.editClicked) {
      try {
        const res = await API.get(`/api/books`,
          {
            headers: {
              Accept: "*/*",
              "Content-Type": "application/json",
            }
          });
        const tabledata = res.data.data;
        this.setState({
          data: tabledata,
          editClicked: false,
          // publisherName: "",
          // address: "",
          // bookTitle: "",
          // bookSubtitle: "",
          // authorName: "",
          // cover: "",
          // description: "",
          // categoryName: "",
          // numberOfPages: "",
          startDate: "",
          isbn: "",
          // language: "",
          // authorCode: "",
          // bookDetailCode: "",
          // categoryCode: "",
          // publisherCode: "",
          // publishedDate: "",
          // isbn: ""

        });
      } catch (error) {
        console.log(error);
      };
    }
  }


  render() {
    const { data, showAdd1, showAdd2, showAddExist, showEdit, showDelete, baseImage } = this.state;

    return (
      // page content
      <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Book Management</h3>
                  </div>
                  <div className="card-body">


                    {/* title */}
                    <div class="">
                      <Button className="mb-5" variant="success" onClick={this.handleExistOrNot}>
                        <i class="fa fa-plus"></i> Add Book
                      </Button>
                    </div>
                    {/* title */}


                    {/* book management table */}
                    <Table responsive striped id="bookmanagement" style={{ width: '100%' }}>
                      <thead>
                        <tr>
                          <th>Book Code</th>
                          <th>Action</th>
                          <th>Book Title</th>
                          <th>Author</th>
                          <th>Categories</th>
                          <th>Publisher</th>
                          <th>Published Date</th>
                          <th>ISBN</th>
                          <th>Book Cover</th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          data.map((book, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <p>{book.bookCode}</p>
                                </td>
                                <td>
                                  <div class='d-flex justify-content-around mt-4' style={{ border: 'none' }}>
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit" onClick={() => { this.handleShowEdit(book.bookCode) }}><i
                                      class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger" data-toggle="modal" data-target="#delete" onClick={() => { this.handleShowDelete(book.bookCode) }}><i
                                      class="fa fa-trash"></i></button>
                                  </div>
                                </td>
                                <td>
                                  {Object.keys(book.bookDetailsEntity ? book.bookDetailsEntity : "").map(key => {
                                    if (key === "bookTitle") {
                                      const judul = (book.bookDetailsEntity[key])
                                      return judul;
                                    }
                                  })}
                                </td>
                                <td>
                                  {Object.keys(book.authorEntity ? book.authorEntity : "").map(key => {
                                    if (key === "authorName") {
                                      const author = (book.authorEntity[key])
                                      return author;
                                    }
                                  })}
                                </td>
                                <td>
                                  {Object.keys(book.categoryEntity ? book.categoryEntity : "").map(key => {
                                    if (key === "categoryName") {
                                      const category = (book.categoryEntity[key])
                                      return category;
                                    }
                                  })}
                                </td>
                                <td>
                                  {Object.keys(book.publisherEntity ? book.publisherEntity : "").map(key => {
                                    if (key === "publisherName") {
                                      const publisher = (book.publisherEntity[key])
                                      return publisher;
                                    }
                                  })}
                                </td>
                                <td>
                                  <Moment format="DD/MM/YYYY">
                                    {book.publishedDate}
                                  </Moment>
                                </td>
                                <td>
                                  <p>{book.isbn}</p>
                                </td>
                                <td class="text-center">
                                  {
                                    Object.keys(book.bookDetailsEntity ? book.bookDetailsEntity : "").map(key => {
                                      if (key === "cover") {
                                        const cover = (book.bookDetailsEntity[key])
                                        return <img height="80"
                                          src={cover}
                                          alt="bookimage" />
                                      }
                                    })
                                  }
                                </td>
                              </tr>
                            )
                          })
                        }
                      </tbody>
                    </Table>
                    {/* book management table */}


                    {/* modal if*/}
                    <Modal size="lg" show={showAddExist} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Book Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <p>Does Author, Book details, Category and Publisher information already exist?</p>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleShowAdd}>
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
                                    onChange={(e) => this.setState({ title: e.target.value })}
                                    value={this.state.title}
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


                    {/* modal edit */}
                    <Modal size="lg" show={showEdit} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Book Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form>
                              <div class="form-group row">
                                <label for="addAuthorCode" class="col-sm-2 col-form-label">Author Name</label>
                                <div class="col-sm-4">
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
                                <div class="col-sm-4">
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
                          Cancel
                        </Button>
                        <Button className="btn btn-success" variant="primary" onClick={this.handleSaveEdit}>
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal edit */}


                    {/* modal delete */}
                    <Modal show={showDelete} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <p>Are you sure you want to delete book data?</p>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                          Close
                        </Button>
                        <Button className="btn btn-warning" variant="primary" onClick={this.handleDelete}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal delete */}
                  </div>
                </div>
              </div>
            </div>
          </div >
        </section >
      </div >
    );
  }
}

export default BookManagement;