import React, { Component } from 'react';
import { Table, Container, Form, InputGroup, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
import Pagination from './components/pagination';
import ReactFormInputValidation from "react-form-input-validation";
 
class BookManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books:
        [
          {
            bookID: "201710025",
            bookTitle: "Selena",
            author: "Tere Liye",
            publishedDate: "2020-03-16",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg",
            isPopular: true
          },
          {
            bookID: "201710025",
            bookTitle: "Nebula",
            author: "Tere Liye",
            publishedDate: "2019-12-01",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg",
            isPopular: true
          },
          {
            bookID: "201710025",
            bookTitle: "Misteri Terakhir#1",
            author: "S. Mara Gd	",
            publishedDate: "2020-04-06",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg",
            isPopular: true
          },
          {
            bookID: "201710025",
            bookTitle: "After The Funeral",
            author: "Agatha Christie",
            publishedDate: "2011",
            categories: "Detective and mystery stories",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/after-the-funeral_gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "MetroPop: Ganjil Genap",
            author: "	Almira Bastari",
            publishedDate: "2020-08-18",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/metropop-ganjil-genap_gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "Tokyo dan Perayaan Kesedihan",
            author: "Ruth Priscillia Angelina",
            publishedDate: "2020-04-16",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/tokyo-dan-perayaan-kesedihan_gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "SEGI TIGA (sebuah novel)",
            author: "Sapardi Djoko Damono",
            publishedDate: "2020-03-23",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Segi-Tiga_gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "Ibuk",
            author: "Iwan Setyawan",
            publishedDate: "2016-05-16",
            categories: "Juvenile Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Ibuk_Gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "Laut Bercerita",
            author: "Leila S. Chudori",
            publishedDate: "2017-10-23",
            categories: "Foreign Language Study",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Laut-bercerita_gramedia.jpg",
            isPopular: false
          },
          {
            bookID: "201710025",
            bookTitle: "Defending Jacob",
            author: "William Landay",
            publishedDate: "2017-12-18",
            categories: "Juvenile Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/defending-jacob_gramedia.jpg",
            isPopular: false
          }
        ],
      search: '',
      showAdd: false,
      showEdit: false,
      showDelete: false,
      currentPage: 1,
      postsPerPage: 5,
      ketiksearch: false,
      showpagination: true,
      showsearchresults: false,
      fields: {
        urlImage: "",
        title: "",
        subtitle: "",
        author: "",
        publisher: "",
        description: "",
        pages: "",
        publishedDate: "",
        language: "",
        length: "",
        isbn: "",
        weight: "",
        width: "",
        isPopular: false
      },
      errors: {},
      disableSubmitting: false
    };

    this.form = new ReactFormInputValidation(this);
    this.form.useRules({
        urlImage: "required",
        title: "required",
        subtitle: "",
        author: "required",
        publisher: "required",
        description: "required",
        pages: "required",
        publishedDate: "required",
        language: "required",
        length: "required",
        isbn: "required",
        weight: "required",
        width: "required",
        isPopular: false,
        // name: "required",
        // email: "required|email",
        // phone_number: "required|numeric|digits_between:10,12",
    });
  }

  componentDidMount(){
    this.form.onformsubmit = (fields) => {
      // Do you ajax calls here.
      console.log(fields);
    }
    this.form.handleChangeEvent = (event) => {
      if (event.target.value == "") {
        this.setState({ submitting: false });
      } else {
        this.setState({ submitting: true });;
      }
    }
  }
  

  handleAddBook = () => {
    this.setState({ showAdd: false })
    swal("Success!", "Book Has Been Added", "success");
  }

  handleCloseModal = () => {
    this.setState({ showAdd: false, showEdit: false, showDelete: false })
  }

  handleShowAdd = () => {
    this.setState({ showAdd: true })
  }

  handleSaveEdit = () => {
    this.setState({ showEdit: false })
    swal("Success!", "Your Data Is Updated", "success");
  }

  handleShowEdit = () => {
    this.setState({ showEdit: true })
  }

  handleDelete = () => {
    this.setState({ showDelete: false })
    swal("Deleted!", "Book Is Successfully Deleted", "success");
  }

  handleShowDelete = () => {
    this.setState({ showDelete: true })
  }

  searchData = event => {
    if (event.target.value) {
      this.setState({ketiksearch: true, showpagination: false, showsearchresults: true, search: event.target.value});
    }
    if (event.target.value === "") {
      this.setState({ ketiksearch: false, showpagination: true, showsearchresults: false });
    }
  }

  paginate = pagenumber => {
      this.setState({currentPage : pagenumber});
  }

  render() {
    const { books, search, showAdd, showEdit, showDelete, currentPage, postsPerPage, ketiksearch, showpagination, showsearchresults, fields, errors, disableSubmitting } = this.state;
    const filteredData = books.filter(book =>
      book.bookTitle.toLowerCase().includes(search.toLowerCase())
    );

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = books.slice(indexOfFirstPost, indexOfLastPost);

    let returnedTarget;
    if (ketiksearch === true) {
      returnedTarget = filteredData;
    } else {
      returnedTarget = currentPosts;
    }

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
                      <Button variant="success" onClick={this.handleShowAdd}>
                        <i class="fa fa-plus"></i> Add Book
                      </Button>
                    </div>
                    {/* title */}

                    {/* book management table */}
                    <Container className=''>
                      <div className='row justify-content-center'>
                        <div className='col-2-lg m-2'>
                          <InputGroup>
                            <InputGroup.Prepend>
                              <InputGroup.Text id="inputGroupPrepend"><i class="fa fa-search"></i></InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                              type="text"
                              placeholder="Search Title.."
                              aria-describedby="inputGroupPrepend"
                              name="search"
                              onChange={this.searchData}
                            // value={values.username}
                            // isInvalid={!!errors.username}
                            />
                            <Form.Control.Feedback type="invalid" tooltip>
                              {/* {errors.username} */}
                            </Form.Control.Feedback>
                          </InputGroup>
                          <div className="d-flex justify-content-center">
                            <div style={{display: showsearchresults ? 'block' : 'none', color:"#444444"}}>
                              <p>Showing <b>{returnedTarget.length}</b> search results</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Table responsive bordered hover size="sm">
                        <thead>
                          <tr>
                            <th>Book ID</th>
                            <th>Book Title</th>
                            <th>Author</th>
                            <th>Published Date</th>
                            <th>Categories</th>
                            <th>Book Cover</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        {
                          returnedTarget.map((book, index) => {

                            return (
                              <tbody key={index}>
                                <tr>
                                  <td>{book.bookID}</td>
                                  <td>{book.bookTitle}</td>
                                  <td>{book.author}</td>
                                  <td>{book.publishedDate}</td>
                                  <td>{book.categories}</td>
                                  <td class="text-center">
                                    <img height="80" src={book.bookCover} alt="bookimage"/>
                                  </td>
                                  <td>
                                    <div class='d-flex justify-content-around mt-4' style={{ border: 'none' }}>
                                      <button class="btn btn-primary" data-toggle="modal" data-target="#edit" onClick={this.handleShowEdit}><i
                                        class="fa fa-edit"></i></button>
                                      <button class="btn btn-danger" data-toggle="modal" data-target="#delete" onClick={this.handleShowDelete}><i
                                        class="fa fa-trash"></i></button>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            )

                          })
                        }
                      </Table>
                      <div style={{display: showpagination ? 'block' : 'none' }}>
                      
                      <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={books.length}
                        paginate={this.paginate}
                      />
                      </div>
                    </Container>

                    {/* modal add */}
                    <Modal size="lg" show={showAdd} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Book Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form
                              noValidate
                              autoComplete="off"
                              onSubmit={this.form.handleSubmit}
                            >
                              <div class="form-group row">
                                <label for="addImage" class="col-sm-2 col-form-label">Url Image</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    name="urlImage"
                                    class="form-control" 
                                    id="addImage" 
                                    placeholder="Url Image..." 
                                    onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    value={fields.urlImage} 
                                    data-attribute-name="Url Image"
                                    data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.urlImage ? errors.urlImage : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addTitle" class="col-sm-2 col-form-label">Title</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="title"
                                  class="form-control" 
                                  id="addTitle" 
                                  placeholder="Title..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.title} 
                                  data-attribute-name="Title"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.title ? errors.title : ""}
                                  </label>
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
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.subtitle} 
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
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.author} 
                                  data-attribute-name="Author"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.author ? errors.author : ""}
                                  </label>
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
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.publisher} 
                                  data-attribute-name="Publisher"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.publisher ? errors.publisher : ""}
                                  </label>
                                </div>
                              </div>
                              <hr />
                              <div class="form-group row">
                                <label for="addDesc" class="col-sm-2 col-form-label">Description</label>
                                <div class="col-sm-10">
                                  <input
                                  type="text"
                                  name="description"
                                  class="form-control"
                                  id="addDesc"
                                  placeholder="Description..."
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.description} 
                                  data-attribute-name="Description"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.description ? errors.description : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addPages" class="col-sm-2 col-form-label">Number of Pages</label>
                                <div class="col-sm-4">
                                  <input
                                  type="text"
                                  name="pages"
                                  class="form-control"
                                  id="addPages"
                                  placeholder="Number of Pages..."
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.pages} 
                                  data-attribute-name="Pages"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.pages ? errors.pages : ""}
                                  </label>
                                </div>
                                <label for="addIsbn" class="col-sm-2 col-form-label">ISBN</label>
                                <div class="col-sm-4">
                                  <input
                                  type="text"
                                  name="isbn"
                                  class="form-control"
                                  id="addIsbn"
                                  placeholder="ISBN..."
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.isbn} 
                                  data-attribute-name="ISBN"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.isbn ? errors.isbn : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addPublishedDate" class="col-sm-2 col-form-label">Published Date</label>
                                <div class="col-sm-4">
                                  <input 
                                  type="text" 
                                  name="publishedDate"
                                  class="form-control" 
                                  id="addPublishedDate" 
                                  placeholder="Published Date..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.publishedDate} 
                                  data-attribute-name="Published Date"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.publishedDate ? errors.publishedDate : ""}
                                  </label>
                                </div>
                                <label for="addWeight" class="col-sm-2 col-form-label">Weight</label>
                                <div class="col-sm-4">
                                  <input 
                                  type="text" 
                                  name="weight"
                                  class="form-control" 
                                  id="addWeight" 
                                  placeholder="Weight..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.weight} 
                                  data-attribute-name="Weight"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.weight ? errors.weight : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addLang" class="col-sm-2 col-form-label">Language</label>
                                <div class="col-sm-4">
                                  <input 
                                  type="text" 
                                  name="language"
                                  class="form-control" 
                                  id="addLang" 
                                  placeholder="Language..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.language} 
                                  data-attribute-name="Language"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.language ? errors.language : ""}
                                  </label>
                                </div>
                                <label for="addWidth" class="col-sm-2 col-form-label">Width</label>
                                <div class="col-sm-4">
                                  <input 
                                  type="text" 
                                  name="width"
                                  class="form-control" 
                                  id="addWidth" 
                                  placeholder="Width..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.width} 
                                  data-attribute-name="Width"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.width ? errors.width : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addLength" class="col-sm-2 col-form-label">Length</label>
                                <div class="col-sm-4">
                                  <input 
                                  type="text" 
                                  name="length"
                                  class="form-control" 
                                  id="addLength" 
                                  placeholder="Length..." 
                                  onBlur={this.form.handleBlurEvent}
                                  onChange={this.form.handleChangeEvent}
                                  value={fields.length} 
                                  data-attribute-name="Length"
                                  data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.length ? errors.length : ""}
                                  </label>
                                </div>
                                <label for="addIsPopular" class="col-sm-2 col-form-label">Popular</label>
                                <div class="col-sm-4 d-flex align-items-center">
                                  <Form.Group controlId="formBasicCheckbox">
                                    <Form.Check 
                                    type="checkbox" 
                                    name="isPopular"
                                    id="addIsPopular"
                                    label="Set as popular" 
                                    onBlur={this.form.handleBlurEvent}
                                    onChange={this.form.handleChangeEvent}
                                    value={fields.isPopular} 
                                    data-attribute-name="Popular"
                                    data-async
                                    />
                                  </Form.Group>
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
                        <Button id="buttonAddBook" disabled={disableSubmitting} type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddBook}>
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
                            <form onSubmit={this.form.handleSubmit}>
                              <div class="form-group row">
                                <label for="editImage" class="col-sm-2 col-form-label">Book ID</label>
                                <div class="col-sm-10">
                                  <input type="text" class="form-control" id="editIdentityExist" placeholder="Please input ID" value='' />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="editTitle" class="col-sm-2 col-form-label">Book Title</label>
                                <div class="col-sm-10">
                                  <input type="text" class="form-control" id="editTitleExist" placeholder="Please input title" value='' />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="editDesc" class="col-sm-2 col-form-label">Author</label>
                                <div class="col-sm-10">
                                  <input type="text" class="form-control" id="editAuthorExist" placeholder="Please input author" value='' />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="editDesc" class="col-sm-2 col-form-label">Published Date</label>
                                <div class="col-sm-10">
                                  <input type="text" class="form-control" id="editPublishedDateExist" placeholder="Please input published date" value='' />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="editDesc" class="col-sm-2 col-form-label">Categories</label>
                                <div class="col-sm-10">
                                  <input type="text" class="form-control" id="editCategoriesExist" placeholder="Please input categories" value='' />
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