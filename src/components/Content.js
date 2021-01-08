import React, { Component } from "react";
import "./Slidertop.style.css";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

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
    super(props);

    this.state = {
      data: [],
      asianBooks: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8500/api/books").then((e) => {
      this.setState({ data: e.data.data });
      e.data.data.forEach((book)=>{
        if(book.categoryEntity.categoryCode === "BC003"){
          this.setState({ asianBooks: [...this.state.asianBooks, book] });
        }
      })
    });
  }

  render() {
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
            <div className="item item1">
              <Link to="/page/detailpage">
                <div className="item-inner">
                  <div className="text-slide">
                    <span className="title-slide">Title Book</span>
                    <br />
                    <span className="author-slide">Raditya</span>
                    <br />
                    <br />
                    <span className="detail-slide">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maiores obcaecati nemo a architecto, reprehenderit
                      delectus nihil omnis recusandae.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="item item2">
              <Link to="/page/detailpage">
                <div className="item-inner">
                  <div className="text-slide">
                    <span className="title-slide">Title Book</span>
                    <br />
                    <span className="author-slide">Raditya</span>
                    <br />
                    <br />
                    <span className="detail-slide">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maiores obcaecati nemo a architecto, reprehenderit
                      delectus nihil omnis recusandae.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="item item3">
              <Link to="/page/detailpage">
                <div className="item-inner">
                  <div className="text-slide">
                    <span className="title-slide">Title Book</span>
                    <br />
                    <span className="author-slide">Raditya</span>
                    <br />
                    <br />
                    <span className="detail-slide">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maiores obcaecati nemo a architecto, reprehenderit
                      delectus nihil omnis recusandae.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="item item4">
              <Link to="/page/detailpage">
                <div className="item-inner">
                  <div className="text-slide">
                    <span className="title-slide">Title Book</span>
                    <br />
                    <span className="author-slide">Raditya</span>
                    <br />
                    <br />
                    <span className="detail-slide">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maiores obcaecati nemo a architecto, reprehenderit
                      delectus nihil omnis recusandae.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
            <div className="item item5">
              <Link to="/page/detailpage">
                <div className="item-inner">
                  <div className="text-slide">
                    <span className="title-slide">Title Book</span>
                    <br />
                    <span className="author-slide">Raditya</span>
                    <br />
                    <br />
                    <span className="detail-slide">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Maiores obcaecati nemo a architecto, reprehenderit
                      delectus nihil omnis recusandae.
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </Slider>
        </section>

        {/* Best Seller */}
        <main className="main pt-5">
          <div className="content">
            <div className="row">
              <div className="col">
                <h3>Best Seller</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>New Releases</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more">
                  <span>See More</span>
                </Link>
              </div>
            </div>

            <ul className="books">
              {this.state.data.slice(0,6).map((d) => {
                return (
                  <Link to="/page/detailpage">
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
                              <div className="book-name">{d.bookDetailsEntity.bookTitle}</div>
                            </div>
                            <div className="row">

                              <div className="book-author">{d.authorEntity.authorName}</div>
                            </div>
                            <div className="row">
                              <div className="book-rating text-muted"><i class="fa fa-star star-rate pr-1"></i>5</div>
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
        {/* Best Seller */}

        {/* Asian */}
        <section className="pt-3">
          <div className="container-fluid">
          <div className="row">
              <div className="col">
                <h3>The Best Asian Books</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Top Seller</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more">
                  <span>See More</span>
                </Link>
              </div>
            </div>
            <div className="row">
              {this.state.asianBooks.slice(0,2).map((d)=>{
                if(d.bookDetailsEntity.description.length > 225){
                  d.bookDetailsEntity.description = (d.bookDetailsEntity.description.substring(0, 100)+"  ...")
                }
                return(
                  <div className="col">
                    <div className="card mt-5 asian-box">
                      <div className="row no-gutters">
                        <Link to="/page/detailpage">
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
                                <div className="col d-flex justify-content-end">
                                  <p className="card-text">
                                    <small className="text-muted">
                                      <i className="fa fa-star star-rate pr-1"></i>5
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
                )
              })}
            </div>
          </div>
        </section>
        {/* Asian */}

        {/* Must Read */}
        <section className="pt-5 pb-3">
          <div className="content">
            <div className="row">
              <div className="col">
                <h3>Your must-read list</h3>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <p>Find your new favorite book</p>
              </div>
              <div className="col d-flex justify-content-end">
                <Link to="/page/more">
                  <span>See More</span>
                </Link>
              </div>
            </div>

            <ul className="books">
              {this.state.data.slice(0,5).map((datas) => {
                let d = datas.bookDetailsEntity;
                return (
                  <Link to="/page/detailpage">
                    <li>
                      <div className="book">
                        <div className="row">
                          <img
                            src={d.cover}
                            alt={d.bookTitle}
                            className="book-image"
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="row">
                              <div className="book-name">{d.bookTitle}</div>
                            </div>
                            <div className="row">
                              <div className="book-author">Tere Liye</div>
                            </div>
                            <div className="row">
                              <div className="book-rating text-muted"><i class="fa fa-star star-rate pr-1"></i>5</div>
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
        </section>
        {/* Must Read */}
      </div>
    );
  }
}

export default withRouter(Content);
