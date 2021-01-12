import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import $ from 'jquery'; 
import Axios from "../../Services/axios-instance";
import API from "../../api";
 
class BookDetailManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabledata: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      bookDetailId: "",
      bookDetailCode: "",
      bookTitle: "",
      bookSubtitle: "",
      description: "",
      cover: "",
      numberOfPages: "",
      language: "",
      editClicked: false
    };
  }

  componentDidMount() {
    Axios.get('bookdetails').then((res) => {
      const tabledata = res.data.data
        this.setState({ tabledata: tabledata })

        $(function () {
            $('#bookdetailmanagement').DataTable({
                responsive: true
            })
        })
    })
}

  // async componentDidMount() {
    // DATA TABEL
    // try {
    //   const res = await 
    //   axios.get(`bookdetails`,
    //   {
    //       headers: {
    //       Accept: "*/*",
    //       "Content-Type": "application/json",
    //   }});
    //   const tabledata = res.data.data;
    //   this.setState({ tabledata: tabledata });
    // } catch (error) {
    //   console.log(error);
    // }

    // $(function () {
    //   $('#publishermanagement').DataTable({
    //       responsive: true
    //   });
    // });
  // }development

  //modal add
  handleShowAdd = () => {
    this.setState({ showAdd: true })
  }

  handleAddBookDetail = (e) => {
    Axios.post(`bookdetails`,
      {
        bookTitle: this.state.bookTitle,
        bookSubtitle: this.state.bookSubtitle,
        cover: this.state.cover,
        description: this.state.description,
        language: this.state.language,
        numberOfPages: this.state.numberOfPages
      },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        swal("Success!", "Book details Has Been Added", "success");
        this.setState({ showAdd: false, editClicked: true })
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }

  //button edit
  handleShowEdit = (bdcd) => {
    this.setState({showEdit: true, bookDetailCode : bdcd})
    Axios.get(`bookdetails/${bdcd}`).then((res) => {
      let response = res.data.data;
      this.setState({
        bookTitle: response.bookTitle,
        bookSubtitle: response.bookSubtitle,
        cover: response.cover,
        description: response.description,
        language: response.language,
        numberOfPages: response.numberOfPages
      });
    });
  };

  handleSaveEdit = () => {
    this.setState({ showEdit: false })
    Axios.put(
      `bookdetails/${this.state.bookDetailCode}`,
      {
        bookTitle: this.state.bookTitle,
        bookSubtitle: this.state.bookSubtitle,
        cover: this.state.cover,
        description: this.state.description,
        language: this.state.language,
        numberOfPages: this.state.numberOfPages,
        bookDetailCode: this.state.bookDetailCode
      },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        swal("Great!", "Publisher Has Been edited", "success");
        this.setState({ bookDetailCode: "", editClicked: true })
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }

  //button delete
  handleShowDelete = (bkdcd) => {
    this.setState({showDelete: true, bookDetailCode : bkdcd})
  }

  handleDelete = () => {
    Axios.delete(`bookdetails/${this.state.bookDetailCode}`)
      .then(()=>window.location.reload())
    this.setState({showDelete: false,})
    // swal("Deleted!", "Book Is Successfully Deleted", "success");
  }

  //util
  handleCloseModal = () => {
    this.setState({ showAdd: false, showEdit: false, showDelete: false,
      bookTitle: "",
      bookSubtitle: "",
      description: "",
      cover: "",
      numberOfPages: "",
      language: ""
    })
  }

  async componentDidUpdate(prevState) {
    // Typical usage (don't forget to compare props):
    console.log(prevState);
    if (this.state.editClicked) {
      try {
        const res = await Axios.get(`bookdetails`,
        {
            headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        }});
        const tabledata = res.data.data;
        this.setState({ tabledata: tabledata, editClicked: false });
      } catch (error) {
        console.log(error);
      }; 
    }
  }

  render() {
    const { showAdd, showEdit, showDelete, tabledata, disableSubmitting, bookTitle, bookSubtitle, description, cover, numberOfPages, language } = this.state;
   
    return (
      // page content
      <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Book Detail Management</h3>
                  </div>
                  <div className="card-body">
                    {/* title */}
                    <div class="">
                      <Button className="mb-5" variant="success" onClick={this.handleShowAdd}>
                        <i class="fa fa-plus"></i> Add Book Detail
                      </Button>
                    </div>
                    {/* title */}

                    {/* publisher management table */}
                    <Table responsive striped id="bookdetailmanagement" style={{ width: '100%' }}>
                      <thead>
                          <tr>
                            <th>Book Detail Code</th>
                            <th>Action</th>
                            <th>Book Title</th>
                            <th>Book Subtitle</th>
                            <th>Description</th>
                            <th>Cover</th>
                            <th>Number of Pages</th>
                            <th>Language</th>
                          </tr>
                      </thead>
                      <tbody>
                        {
                        tabledata.map((pb, index) => {
                          return (
                              <tr key={index}>
                                <td>{pb.bookDetailCode}</td>
                                <td>
                                  <div class='d-flex justify-content-around mt-4' style={{ border: 'none' }}>
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit" 
                                                  onClick={ ()=> {this.handleShowEdit(pb.bookDetailCode)}}><i
                                      class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger" data-toggle="modal" data-target="#delete"
                                                  onClick={()=> this.handleShowDelete(pb.bookDetailCode)}><i
                                      class="fa fa-trash"></i></button>
                                  </div>
                                </td>
                                <td>{pb.bookTitle}</td>
                                <td>{pb.bookSubtitle}</td>
                                <td>{pb.description}</td>
                                <td>
                                  <img height="80"
                                    src={pb.cover}
                                    alt="bookimage"
                                  />
                                </td>
                                <td>{pb.numberOfPages}</td>
                                <td>{pb.language}</td>
                              </tr>
                          )
                        })
                      } 
                      </tbody>
                    </Table>

                    {/* modal add */}
                    <Modal size="lg" show={showAdd} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Book Details Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form>
                              <div class="form-group row">
                                <label for="addBookTitle" class="col-sm-2 col-form-label">Book Title</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookTitle"
                                  class="form-control" 
                                  id="addBookTitle" 
                                  placeholder="Title..." 
                                  onChange={(e) => this.setState({bookTitle : e.target.value})}
                                  value={bookTitle} 
                                  data-attribute-name="Title"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookSubtitle" class="col-sm-2 col-form-label">Book Subtitle</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookSubtitle"
                                  class="form-control" 
                                  id="addBookSubtitle" 
                                  placeholder="Subtitle..." 
                                  onChange={(e) => this.setState({bookSubtitle : e.target.value})}
                                  value={bookSubtitle} 
                                  data-attribute-name="Subtitle"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addDescription" class="col-sm-2 col-form-label">Description</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookDescription"
                                  class="form-control" 
                                  id="addBookDescription" 
                                  placeholder="Description..." 
                                  onChange={(e) => this.setState({description : e.target.value})}
                                  value={description} 
                                  data-attribute-name="Description"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addCover" class="col-sm-2 col-form-label">Cover</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookCover"
                                  class="form-control" 
                                  id="addBookCover" 
                                  placeholder="Cover..." 
                                  onChange={(e) => this.setState({cover : e.target.value})}
                                  value={cover} 
                                  data-attribute-name="Cover"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookPages" class="col-sm-2 col-form-label">Number of pages</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookPages"
                                  class="form-control" 
                                  id="addBookPages" 
                                  placeholder="Pages..." 
                                  onChange={(e) => this.setState({numberOfPages : e.target.value})}
                                  value={numberOfPages} 
                                  data-attribute-name="Pages"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookLanguage" class="col-sm-2 col-form-label">Language</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="language"
                                  class="form-control" 
                                  id="addLanguage" 
                                  placeholder="Language..." 
                                  onChange={(e) => this.setState({language : e.target.value})}
                                  value={language} 
                                  data-attribute-name="Language"
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
                        <Button id="buttonAddBook" disabled={disableSubmitting} type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddBookDetail}>
                          <i class="fa fa-plus"></i> Add
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal add */}

                    {/* modal edit */}
                    <Modal show={showEdit} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                          <form>
                              <div class="form-group row">
                                <label for="addBookTitle" class="col-sm-2 col-form-label">Book Title</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookTitle"
                                  class="form-control" 
                                  id="addBookTitle" 
                                  placeholder="Title..." 
                                  onChange={(e) => this.setState({bookTitle : e.target.value})}
                                  value={bookTitle} 
                                  data-attribute-name="Title"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookSubtitle" class="col-sm-2 col-form-label">Book Subtitle</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookSubtitle"
                                  class="form-control" 
                                  id="addBookSubtitle" 
                                  placeholder="Subtitle..." 
                                  onChange={(e) => this.setState({bookSubtitle : e.target.value})}
                                  value={bookSubtitle} 
                                  data-attribute-name="Subtitle"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addDescription" class="col-sm-2 col-form-label">Description</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookDescription"
                                  class="form-control" 
                                  id="addBookDescription" 
                                  placeholder="Description..." 
                                  onChange={(e) => this.setState({description : e.target.value})}
                                  value={description} 
                                  data-attribute-name="Description"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addCover" class="col-sm-2 col-form-label">Cover</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookCover"
                                  class="form-control" 
                                  id="addBookCover" 
                                  placeholder="Cover..." 
                                  onChange={(e) => this.setState({cover : e.target.value})}
                                  value={cover} 
                                  data-attribute-name="Cover"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookPages" class="col-sm-2 col-form-label">Number of pages</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="bookPages"
                                  class="form-control" 
                                  id="addBookPages" 
                                  placeholder="Pages..." 
                                  onChange={(e) => this.setState({numberOfPages : e.target.value})}
                                  value={numberOfPages} 
                                  data-attribute-name="Pages"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addBookLanguage" class="col-sm-2 col-form-label">Language</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="language"
                                  class="form-control" 
                                  id="addLanguage" 
                                  placeholder="Language..." 
                                  onChange={(e) => this.setState({language : e.target.value})}
                                  value={language} 
                                  data-attribute-name="Language"
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
                          <p>Are you sure you want to delete publisher data?</p>
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

export default BookDetailManagement;