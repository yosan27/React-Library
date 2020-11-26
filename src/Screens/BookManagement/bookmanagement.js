import React, { Component } from 'react';
import { Table, Container, Form, InputGroup, Pagination, Modal, Button } from 'react-bootstrap';

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
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Nebula",
            author: "Tere Liye",
            publishedDate: "2019-12-01",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Misteri Terakhir#1",
            author: "S. Mara Gd	",
            publishedDate: "2020-04-06",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "After The Funeral",
            author: "Agatha Christie",
            publishedDate: "2011",
            categories: "Detective and mystery stories",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/after-the-funeral_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "MetroPop: Ganjil Genap",
            author: "	Almira Bastari",
            publishedDate: "2020-08-18",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/metropop-ganjil-genap_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Tokyo dan Perayaan Kesedihan",
            author: "Ruth Priscillia Angelina",
            publishedDate: "2020-04-16",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/tokyo-dan-perayaan-kesedihan_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "SEGI TIGA (sebuah novel)",
            author: "Sapardi Djoko Damono",
            publishedDate: "2020-03-23",
            categories: "Young Adult Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Segi-Tiga_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Ibuk",
            author: "Iwan Setyawan",
            publishedDate: "2016-05-16",
            categories: "Juvenile Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Ibuk_Gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Laut Bercerita",
            author: "Leila S. Chudori",
            publishedDate: "2017-10-23",
            categories: "Foreign Language Study",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/Laut-bercerita_gramedia.jpg"
          },
          {
            bookID: "201710025",
            bookTitle: "Defending Jacob",
            author: "William Landay",
            publishedDate: "2017-12-18",
            categories: "Juvenile Fiction",
            bookCover: "https://www.gramedia.com/blog/content/images/2020/05/defending-jacob_gramedia.jpg"
          }
        ],
        search: '',
        showAdd: false,
        showEdit: false,
        showDelete: false,
    }
  }

  handleCloseAdd = () => {
    this.setState({ showAdd: false })
  }

  handleShowAdd = () => {
    this.setState({ showAdd: true })
  }

  handleCloseEdit = () => {
    this.setState({ showEdit: false })
  }

  handleShowEdit = () => {
    this.setState({ showEdit: true })
  }

  handleCloseDelete = () => {
    this.setState({ showDelete: false })
  }

  handleShowDelete = () => {
    this.setState({ showDelete: true })
  }

  searchData = event => {
    this.setState({ search: event.target.value })
  }

  render() {
    const { books, search, showAdd, showEdit, showDelete } = this.state;
    const filteredData = books.filter(book => 
      book.bookTitle.toLowerCase().includes(search.toLowerCase())
    )

    return (
      // page content
      <div class="right_col" role="main">
        {/* title */}
        <div class="container collections pt-5">
          <h3 class="pt-3">Book Management</h3>
          <button class="btn mt-2 mb-3"
            style={{ backgroundColor: "#2A3F54", color: "aliceblue" }}
            data-toggle="modal"
            data-target="#ModalAdd"  onClick={this.handleShowAdd}><i class="fa fa-plus"></i> Add Book</button>
        </div>
        {/* title */}

        {/* book management table */}
        <Container className='p-5'>
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
              filteredData.map((book, index) => {
                
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{book.bookID}</td>
                        <td>{book.bookTitle}</td>
                        <td>{book.author}</td>
                        <td>{book.publishedDate}</td>
                        <td>{book.categories}</td>
                        <td class="text-center">
                          <img height="80" src={book.bookCover} />
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
          <Pagination className='justify-content-center'>
            <Pagination.First/>
            <Pagination.Prev />
            <Pagination.Item>{2}</Pagination.Item>
            <Pagination.Ellipsis />
            <Pagination.Item>{10}</Pagination.Item>
            <Pagination.Next />
            <Pagination.Last />
          </Pagination>

        </Container>

        {/* modal add */}
      <Modal size="lg" show={showAdd} onHide={this.handleCloseAdd}>
        <Modal.Header closeButton>
          <Modal.Title>Add Book Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class='container'>
          <div class="modal-body">
                <form>
                  <div class="form-group row">
                    <label for="editImage" class="col-sm-2 col-form-label">Url Image</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editImage" placeholder="Url Image..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editTitle" class="col-sm-2 col-form-label">Title</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editTitle" placeholder="Title..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editWriter" class="col-sm-2 col-form-label">Author</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editWriter" placeholder="Author..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editPublisher" class="col-sm-2 col-form-label">Publisher</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editPublisher" placeholder="Publisher..."/>
                    </div>
                  </div>
                  <hr/>
                  <div class="form-group row">
                    <label for="editDesc" class="col-sm-2 col-form-label">Description</label>
                    <div class="col-sm-10">
                      <textarea class="form-control" id="editDesc" placeholder="Description..."></textarea>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editPages" class="col-sm-2 col-form-label">Number of Pages</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editPages" placeholder="Number of Pages..."/>
                    </div>
                    <label for="editIsbn" class="col-sm-2 col-form-label">ISBN</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editIsbn" placeholder="ISBN..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editRelease" class="col-sm-2 col-form-label">Published Date</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editRelease" placeholder="Published Date..."/>
                    </div>
                    <label for="editWeight" class="col-sm-2 col-form-label">Weight</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editWeight" placeholder="Weight..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editLang" class="col-sm-2 col-form-label">Language</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editLang" placeholder="Language..."/>
                    </div>
                    <label for="editWidth" class="col-sm-2 col-form-label">Width</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editWidth" placeholder="Width..."/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editLength" class="col-sm-2 col-form-label">Length</label>
                    <div class="col-sm-4">
                      <input type="text" class="form-control" id="editLength" placeholder="Length..."/>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseAdd}>
          <i class="fa fa-times-circle"></i> Close
          </Button>
          <Button className="btn btn-success" variant="primary" onClick={this.handleCloseAdd}>
            <i class="fa fa-plus"></i> Cart
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal add */}

      {/* modal edit */}
      <Modal show={showEdit} onHide={this.handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class='container'>
          <div class="modal-body">
                <form>
                  <div class="form-group row">
                    <label for="editImage" class="col-sm-2 col-form-label">Book ID</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editIdentityExist" placeholder="Please input ID" value=''/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editTitle" class="col-sm-2 col-form-label">Book Title</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editTitleExist" placeholder="Please input title" value=''/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editDesc" class="col-sm-2 col-form-label">Author</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editAuthorExist" placeholder="Please input author" value=''/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editDesc" class="col-sm-2 col-form-label">Published Date</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editPublishedDateExist" placeholder="Please input published date" value=''/>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="editDesc" class="col-sm-2 col-form-label">Categories</label>
                    <div class="col-sm-10">
                      <input type="text" class="form-control" id="editCategoriesExist" placeholder="Please input categories" value=''/>
                    </div>
                  </div>
                </form>
              </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseEdit}>
            Cancel
          </Button>
          <Button className="btn btn-success" variant="primary" onClick={this.handleCloseEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal edit */}

      {/* modal delete */}
      <Modal show={showDelete} onHide={this.handleCloseDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div class='container'>
            <p>Are you sure you want to delete book data?</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseDelete}>
            Close
          </Button>
          <Button className="btn btn-warning" variant="primary" onClick={this.handleCloseDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      {/* modal delete */}
      </div>

    );
  }
}

export default BookManagement;