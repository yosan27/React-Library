import React, { Component } from 'react'
import { Container, Jumbotron, Modal, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios'
import './detailpage.css'


class DetailPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      pages: ''
    }
  }

  async componentDidMount() {

    try {
      const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/U_-BBAAAQBAJ`);
      const bookData = res.data.volumeInfo;
      const bookDataImage = res.data.volumeInfo.imageLinks.smallThumbnail

      if (res.data.accessInfo.embeddable) {
        this.setState({ bookAvailable: 'Available' });
      } else {
        this.setState({ bookAvailable: 'Not Available' });
      }

      if (bookData.subtitle != undefined) {
        this.setState({ subtitle: bookData.subtitle });
      } else {
        this.setState({ subtitle: 'Subtitle not available' });
      }

      this.setState({ bookData: bookData });
      this.setState({ register: res.data.id });
      this.setState({ title: bookData.title });
      this.setState({ category: bookData.categories[0] });
      this.setState({ publishedDate: bookData.publishedDate });
      this.setState({ author: bookData.authors });
      this.setState({ pages: bookData.pageCount });
      this.setState({ bookDataImage: bookDataImage })
    } catch (error) {
      console.log(error);
    }
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  handleShow = () => {
    this.setState({ show: true })
  }

  render() {
    const { bookData, register, bookDataImage, bookAvailable, title, subtitle, author, category, publishedDate, show, pages } = this.state;
    return (
      <div>
        <div class="right_col" role="main">

          {/* banner */}
          <Jumbotron className="bannerDetail"
            style={{ backgroundImage: `url(${(!!bookData && !!bookDataImage) ? bookDataImage : 'https://res.cloudinary.com/todidewantoro/image/upload/v1604943658/bootcamp/covernya_ejy4v1.jpg'})` }}
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
                  <p id='publishedAt' className='mb-0'>{publishedDate}</p>
                </div>
                <div className="col-lg col-sm-4 text-center align-self-center">
                  <h4 id='isAvailable' className="text-success">{bookAvailable}</h4>
                </div>
                <div className="col-lg col-sm-4 text-center align-self-center">
                  <img id='bookCover'
                    src={bookDataImage ? bookDataImage : 'https://res.cloudinary.com/todidewantoro/image/upload/v1604943658/bootcamp/covernya_ejy4v1.jpg'}
                    alt="Dilan 1990" className="rounded novel" />
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
                      In 1990, Milea along with her parents and sister Airin moved from Jakarta to Bandung. Her father is an Army officer. On her way to the school, she met Dilan, most-known as a 'bad boy' and leader of a motorbike gang who convinced her that she will sit on his bike with him as her boyfriend one day. Dilan started to flirt with her by coming to her house, making calls from a payphone and sending her odd but romantic gifts which includes a pre-filled crossword puzzle book: "so you don’t have to think about the answers". Unfortunately, Milea already has a boyfriend named Benni back in Jakarta. Despite that, she is no longer feels comfortable with him since he is perceived as rude and foul-mouthed. With Dilan's frequent overconfident movements, which initially made Nandan – her close friend who is in love with her – uncomfortable, Milea starts to develop feelings for him.
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
              <Modal.Title>Book loan form</Modal.Title>
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
              <Button className="btn btn-success" variant="primary" onClick={this.handleClose}>
                <i class="fa fa-plus"></i> Cart
          </Button>
            </Modal.Footer>
          </Modal>
          {/* modal borrow */}
        </div>
      </div>

    );
  }
}

export default DetailPage;