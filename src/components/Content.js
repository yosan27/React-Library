import React, { Component } from "react";
import "./Slidertop.style.css";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import Axios from "../Services/axios-instance";
import swal from "sweetalert";
import AuthService from "../Services/auth.service";

// css
import "./Content.css";
import "../Screens/SeeMoreBooks/booksList.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        right: "2%",
        background: "transparent",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "2%",
        background: "transparent",
      }}
      onClick={onClick}
    />
  );
}
class Content extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      sliderNew: [],
      dataBookSlider: [],
      asianBooks: [],
      selfDevBooks: [],
      getRate: [],
      newBooks: [],
      compTechBooks: [],
      rate: "",
    }
  }

  componentDidMount() {
    this.getBooks();
    this.getNewBooks();

    Axios.get("bookdetails").then((resp) => {
      // console.log(resp)
      this.setState({ sliderNew: resp.data.data });
      this.state.sliderNew.forEach((slider, i) => {
        if (i < 3) {
          Axios.get("book/detailcode/" + slider.bookDetailCode).then((response) => {
            // console.log(response)
            this.setState({
              dataBookSlider: [...this.state.dataBookSlider, {
                'sliderNew': slider,
                'detailbooks': response.data.data
              }]
            })
          })
        }

      })
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
    });
  }

  getBooks = () =>{
    Axios.get("books").then((e) => {
      this.setState({ data: e.data.data});
      e.data.data.forEach((book) => {
        if (book.categoryEntity.categoryCode === "BC003") {
          this.setState({ asianBooks: [...this.state.asianBooks, book] });
        }
        if (book.categoryEntity.categoryCode === "BC004") {
          this.setState({ selfDevBooks: [...this.state.selfDevBooks, book] });
        }
        if (book.categoryEntity.categoryCode === "BC005") {
          this.setState({ compTechBooks: [...this.state.compTechBooks, book] });
        }
      });
    }).catch(function(error){
      swal("Failed", error.response.data.message, "error");
    });
  }

  getNewBooks = () =>{
    Axios.get("books/new").then((e) => {
      this.setState({ newBooks: e.data});
    }).catch(function(error){
      swal("Failed", error.response.data.message, "error");
    });
  }
  
  sendBooks = () =>{
    sessionStorage.setItem('books', JSON.stringify(this.state.data));
  }

  sendAsianBooks = () =>{
    sessionStorage.setItem('books', JSON.stringify(this.state.asianBooks));
  }

  sendSelfDevBooks = () =>{
    sessionStorage.setItem('books', JSON.stringify(this.state.selfDevBooks));
  }

  sendCompTechBooks = () =>{
    sessionStorage.setItem('books', JSON.stringify(this.state.compTechBooks));
  }

  sendNewBooks = () =>{
    sessionStorage.setItem('books', JSON.stringify(this.state.newBooks));
  }

  render() {
    // console.log(this.state.dataBookSlider)
    const settings = {
      centerMode: true,
      slidesToShow: 1,
      centerPadding: "200px",
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            centerMode: true,
            centerPadding: "100px",
            slidesToShow: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
              {
                breakpoint: 768,
                settings: {
                  centerMode: true,
                  centerPadding: "100px",
                  slidesToShow: 1,
                },
              },
              {
                breakpoint: 480,
                settings: {
                  centerMode: true,
                  centerPadding: "40px",
                  slidesToShow: 1,
                },
              },
            ],
          },
        },
      ],
    };
    return (
      <div className="right_col" role="main" style={{ height: "100%" }}>
        <div className="mt-5 jumbotron jumbotron-fluid">
          <div className="container">
            <h1 className="display-4 jumbotron-text">A Book Is</h1>
            <p className="lead jumbotron-text">
              A Dream You Hold In Your Hands.
            </p>
          </div>
        </div>

        <section>
          <Slider {...settings}>
            {this.state.dataBookSlider.map((slider, i) => {
              return (
                <div className={"item item" + (i + 1)}>
                  <Link to={"/page/detailpage/" + slider.detailbooks.bookCode}>
                    <div className="item-inner" style={{ backgroundImage: "url(" + slider.sliderNew.cover + ")" }}>
                      <div className="text-slide">
                        <span className="title-slide">{slider.sliderNew.bookTitle}</span>
                        <br />
                        <span className="author-slide">{slider.detailbooks.authorEntity.authorName}</span>
                        <br />
                        <br />
                        <span className="detail-slide">
                          {slider.sliderNew.description}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </section>

        {/* New Book Releases */}
        <main className="main pt-5">
          <div className="content">
            <div className="row">
              <div className="col">
                <h3>New Book Releases</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Find your new favorite book</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more/New-Books" onClick={this.sendNewBooks}>
                  <span>See More</span>
                </Link>
              </div>
            </div>

            <ul className="books">
              {this.state.newBooks.slice(0, 6).map((d) => {
                if (d.bookDetailsEntity.bookTitle.length > 16) {
                  d.bookDetailsEntity.bookTitle =
                    d.bookDetailsEntity.bookTitle.substring(0, 16) + "  ...";
                }
                if (d.authorEntity.authorName.length > 20) {
                  d.authorEntity.authorName =
                    d.authorEntity.authorName.substring(0, 20) + "  ...";
                }
                return (
                  <Link to={{pathname: `/page/detailpage/${d.bookCode}`}}>
                    <li>
                      <div className="book">
                        <div className="row">
                          <img
                            src={d.bookDetailsEntity.cover}
                            alt={d.bookDetailsEntity.bookTitle}
                            className="book-image"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="book-name">
                                {d.bookDetailsEntity.bookTitle}
                              </div>
                            </div>
                            <div className="row">
                              <div className="book-author">
                                {d.authorEntity.authorName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </main>
        {/* New Book Releases */}

        {/* Asian */}
        <section className="pt-3">
          <div className="row">
            <div className="col">
              <h3>The Best Asian Books</h3>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <p>Top Borrowed</p>
            </div>
            <div className="col d-flex justify-content-end">
              <Link to="/page/more/Asian"  onClick={this.sendAsianBooks}>
                <span>See More</span>
              </Link>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              {this.state.asianBooks.slice(0, 2).map((d) => {
                if (d.bookDetailsEntity.description.length > 225) {
                  d.bookDetailsEntity.description =
                    d.bookDetailsEntity.description.substring(0, 225) + "  ...";
                }
                return (
                  <div className="col">
                    <div className="card mt-5 asian-box">
                      <div className="row no-gutters">
                        <Link to={{pathname: `/page/detailpage/${d.bookCode}`}}>
                          <div className="col-md-4">
                            <img
                              src={d.bookDetailsEntity.cover}
                              className="card-img recommend-img"
                              alt="ibu"
                            />
                          </div>
                          <div className="col-md-8">
                            <div className="card-body asian-box-body">
                              <h5 className="card-title-books asian-title">
                                <b>{d.bookDetailsEntity.bookTitle}</b>
                              </h5>
                              <p className="card-text asian-desc">
                                {d.bookDetailsEntity.description}
                              </p>
                              <div className="row">
                                <div className="col">
                                  <p className="card-text">
                                    <small className="text-muted asian-author">
                                      - {d.authorEntity.authorName} -
                                    </small>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        {/* Asian */}

        {/* Self-development */}
        <main className="main pt-5">
          <div className="content">
            <div className="row">
              <div className="col">
                <h3>Self Development</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Find your new favorite book</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more/Self-Development" onClick={this.sendSelfDevBooks}>
                  <span>See More</span>
                </Link>
              </div>
            </div>

            <ul className="books">
              {this.state.selfDevBooks.slice(0, 6).map((d) => {
                if (d.bookDetailsEntity.bookTitle.length > 16) {
                  d.bookDetailsEntity.bookTitle =
                    d.bookDetailsEntity.bookTitle.substring(0, 16) + "  ...";
                }
                if (d.authorEntity.authorName.length > 20) {
                  d.authorEntity.authorName =
                    d.authorEntity.authorName.substring(0, 20) + "  ...";
                }
                return (
                  <Link to={{pathname: `/page/detailpage/${d.bookCode}`}}>
                    <li>
                      <div className="book">
                        <div className="row">
                          <img
                            src={d.bookDetailsEntity.cover}
                            alt={d.bookDetailsEntity.bookTitle}
                            className="book-image"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="book-name">
                                {d.bookDetailsEntity.bookTitle}
                              </div>
                            </div>
                            <div className="row">
                              <div className="book-author">
                                {d.authorEntity.authorName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </main>
        {/* Self-development */}

        {/* Computer & Technology */}
        <main className="main pt-5 pb-3">
          <div className="content">
            <div className="row">
              <div className="col">
                <h3>Computer & Technology</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>New Releases</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more/Computer&Technology" onClick={this.sendCompTechBooks}>
                  <span>See More</span>
                </Link>
              </div>
            </div>

            <ul className="books">
              {this.state.compTechBooks.slice(0, 6).map((d) => {
                if (d.bookDetailsEntity.bookTitle.length > 16) {
                  d.bookDetailsEntity.bookTitle =
                    d.bookDetailsEntity.bookTitle.substring(0, 16) + "  ...";
                }
                if (d.authorEntity.authorName.length > 20) {
                  d.authorEntity.authorName =
                    d.authorEntity.authorName.substring(0, 20) + "  ...";
                }
                return (
                  <Link to={{pathname: `/page/detailpage/${d.bookCode}`}}>
                    <li>
                      <div className="book">
                        <div className="row">
                          <img
                            src={d.bookDetailsEntity.cover}
                            alt={d.bookDetailsEntity.bookTitle}
                            className="book-image"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="book-name">
                                {d.bookDetailsEntity.bookTitle}
                              </div>
                            </div>
                            <div className="row">
                              <div className="book-author">
                                {d.authorEntity.authorName}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </main>
        {/* Computer & Technology */}
      </div>
    );
  }
}

export default withRouter(Content);
