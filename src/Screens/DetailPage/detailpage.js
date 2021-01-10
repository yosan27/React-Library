import React, { Component } from 'react'
import { Container, Jumbotron, Modal, Button } from 'react-bootstrap'
import API from "../../api";
import './detailpage.css'
import swal from 'sweetalert';
import Moment from 'react-moment';
import { Redirect, Link, withRouter } from 'react-router-dom';
import Axios from "../../Services/axios-instance";
import AuthService from "../../Services/auth.service";

class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      getBookCode: this.props.match.params.id,
      bookDetailsCode: '',
      heart: '\u2661',
      bookData: '',
      imageAvailable: false,
      bookAvailable: '',
      title: '',
      publishedDate: '',
      subtitle: '',
      author: '',
      category: '',
      show: false,
      register: '',
      pages: '',
      descriptions: ''
    }
  }

  async componentDidMount() {
    try {
      const res = await Axios.get(`book/` + this.state.getBookCode);
      const bookData = res.data.data;
      const bookDataImage = bookData.bookDetailsEntity.cover
      console.log(bookData)

      if (bookData.id) {
        this.setState({ bookAvailable: 'Available' });
      } else {
        this.setState({ bookAvailable: 'Not Available' });
      }

      if (bookData.bookDetailsEntity.subtitle !== undefined) {
        this.setState({ subtitle: bookData.bookDetailsEntity.subtitle });
      } else {
        this.setState({ subtitle: 'Subtitle not available' });
      }

      this.setState({ bookData: bookData });
      this.setState({ register: bookData.bookCode });
      this.setState({ bookDetailsCode: bookData.bookDetailsEntity.bookDetailCode });
      this.setState({ title: bookData.bookDetailsEntity.bookTitle });
      this.setState({ category: bookData.categoryEntity.categoryName });
      this.setState({ publishedDate: bookData.publishedDate });
      this.setState({ author: bookData.authorEntity.authorName });
      this.setState({ pages: bookData.bookDetailsEntity.numberOfPages });
      this.setState({ bookDataImage: bookDataImage })
      this.setState({ descriptions: bookData.bookDetailsEntity.description })
      console.log(this.state.descriptions)
    } catch (error) {
      console.log(error);
    }
  }

  handleWishlist = () => {
    const wishdto = {
      bookDetailsCode: this.state.bookDetailsCode,
      userCode: AuthService.getUserCode()
    }
    console.log(wishdto)
    Axios.post('wishlist', wishdto)
      .then((response) => {
        console.log(response);
        swal("Success!", "Book Has Been Added To Your Wishlist", "success")
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleCart = () => {
    this.setState({ show: false })
    const wishdto = {
      bookDetailsCode: this.state.bookDetailsCode,
      userCode: AuthService.getUserCode()
    }
    console.log(wishdto)
    Axios.post('cart', wishdto)
      .then((response) => {
        console.log(response);
        swal("Success!", "Book Has Been Added To Your Cart", "success")
        window.location.reload()
      }).catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
      })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  render() {
    const { bookData, register, bookDataImage, bookAvailable, title, subtitle, author, category, publishedDate, show, pages, descriptions } = this.state;
    return (
      <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Details</h3>
                  </div>
                  <div className="card-body">
                    {/* banner */}
                    <Jumbotron className="bannerDetail"
                      style={{ backgroundImage: `url(${(!!bookData && !!bookDataImage) ? bookDataImage : "/assets/images/cover.png"})` }}
                      fluid>
                      <Container>
                      </Container>
                    </Jumbotron>

                    {/* Main Content */}
                    <div className='container'>
                      <div className='container absolute'>
                        {/* info atas */}
                        <div className="row description">
                          <div className="col-lg col-sm-4 text-center align-self-center">
                            <button id='bookCategories' type="button" className="btn btn-warning novel mb-3">{category}</button>
                            <h1 id='bookTitle' className="text-uppercase mb-3">{title}</h1>
                            <p id='publishedAt' className='mb-3'>
                              <Moment format="DD/MM/YYYY">
                                {publishedDate}
                              </Moment>
                            </p>
                            <button id='bookWishlist' type="button" className="btn btn-outline-dark mb-3" onClick={this.handleWishlist}>
                              <i class="fa fa-heart" ></i>
                            </button>
                          </div>
                          <div className="col-lg col-sm-4 text-center align-self-center">
                            <h4 id='isAvailable' className="text-success">{bookAvailable}</h4>
                          </div>
                          <div className="col-lg col-sm-4 text-center align-self-center">
                            <img id='bookCover'
                              src={bookDataImage ? bookDataImage : "/assets/images/cover.png"}
                              alt="cover" className="rounded novel" />
                          </div>
                        </div>
                        {/* info atas */}

                        {/* info bawah */}
                        {/* Descriptions & most popular */}
                        <div class="row mt-5">
                          {/* Description */}
                          <div class="col-lg-8">
                            <h5 class='pb-2'>Descriptions</h5>
                            <hr style={{ border: "5% solid  #f1f1f1" }}></hr>
                            <h5><b id='bookSubtitle'>{subtitle}</b></h5>
                            <p>- {author}</p>
                            <div class=" mb-5 text-justify">
                              <p id='bookDescriptionHead'>
                                {descriptions}
                              </p>
                            </div>
                          </div>
                          {/* Description */}

                          {/* most popular */}
                          <div class="col-lg-3">
                            <h5 class='pb-2 text-center'>Popular this week</h5>
                            <hr />
                            <div class="row">
                              <div class="col text-right pt-2">
                                <img rounded height="80" src="https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg" />
                              </div>
                              <div
                                class="col"
                                style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
                                <div>
                                  <h6 class="mb-0 ">Selena</h6>
                                  <h6 class="mb-0 ">- Tere Liye</h6>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col text-right pt-2">
                                <img rounded height="80" src="https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg" />
                              </div>
                              <div class="col"
                                style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
                                <div>
                                  <h6 class="mb-0 ">Nebula</h6>
                                  <h6 class="mb-0 ">- Tere Liye</h6>
                                </div>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col text-right pt-2">
                                <img rounded height="80" src="https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg" />
                              </div>
                              <div class="col "
                                style={{ display: 'flex', flexWrap: 'wrap', alignContent: 'center' }}>
                                <div>
                                  <h6 class="mb-0 ">Misteri Terakhir#1</h6>
                                  <h6 class="mb-0 ">- S. Mara Gd</h6>
                                </div>
                              </div>
                            </div>
                            {/* button borrow */}
                            <div className="text-center mt-5">
                              <Button className="btn btn-warning borrow" variant="primary" onClick={this.handleShow}>
                                Borrow
                              </Button>
                            </div>
                            {/* button borrow */}
                          </div>
                          {/* most popular */}
                        </div>
                        {/* Descriptions & most popular */}
                        {/* info bawah */}
                      </div>
                    </div>
                    {/* Main Content */}

                    {/* modal borrow */}
                    <Modal show={show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Book Loan Form</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="row-lg">
                            <div class="col-6-lg d-flex justify-content-center align-items-center">
                              <img class="rounded novel" src={bookDataImage ? bookDataImage : 'https://res.cloudinary.com/todidewantoro/image/upload/v1604943658/bootcamp/covernya_ejy4v1.jpg'} />
                            </div>
                            <div
                              className='container'>
                              <div class="col-6-lg mt-3 justify-content-start">
                                <div>
                                  <div class="row">
                                    <div class="col-5">Register</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5">{register}</div>
                                  </div>
                                  <div class="row">
                                    <div class="col-5">Title</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5">{title}</div>
                                  </div>
                                  <div class="row">
                                    <div class="col-5">Author</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5">{author}</div>
                                  </div>
                                  <div class="row">
                                    <div class="col-5">Pages</div>
                                    <div class="col-2">:</div>
                                    <div class="col-5">{pages}</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleClose}>
                          <i class="fa fa-times-circle"></i> Close
                        </Button>
                        <Button className="btn btn-success" variant="primary" onClick={this.handleCart}>
                          <i class="fa fa-plus"></i> Cart
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal borrow */}
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
export default withRouter(DetailPage)
// export default DetailPage;