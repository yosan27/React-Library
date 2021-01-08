import React, { Component } from "react";
import "./Slidertop.style.css";
import Slider from "react-slick";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

// img book
import after from "./img/after.jpg";
import ibuk from "./img/ibuk.jpg";
import defending from "./img/defending.jpg";
import laut from "./img/laut.jpg";
import metro from "./img/metro.jpg";
import nebula from "./img/nebula.jpg";
import segitiga from "./img/segitiga.jpg";
import selena from "./img/selena.jpg";
import tokyo from "./img/tokyo.jpg";
import misteri from "./img/misteri.jpg";
import kim from "./img/kim.jpg";
import ibu from "./img/ibu.jpg";

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
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8500/api/books").then((e) => {
      this.setState({ data: e.data.data });
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
                              <div className="book-rating">5</div>
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
        <section className="pt-5">
          <div className="container-fluid">
            <h3>The Best Asian Books</h3>
            <p>Top Seller</p>

            <div className="row">
              <div className="col">
                <div className="card mt-5 asian-box">
                  <div className="row no-gutters">
                    <Link to="/page/detailpage">
                      <div className="col-md-4">
                        <img
                          src={ibu}
                          className="card-img recommend-img"
                          alt="ibu"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body asian-box-body">
                          <h5 className="card-title-books">
                            <b>Please Look After Mom</b>
                          </h5>
                          <p className="card-text">
                            Kisah seorang ibu yang menghilang ketika ingin
                            mengunjungi anaknya di kota. Sejak saat itu, anggota
                            keluarga yang ditinggalkan mengalami trauma dan
                            menyadari betapa pentingnya serta kurang mengenal
                            lebih jauh akan sosok ibu.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              - Kyung Sook Sin -
                            </small>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card mt-5 asian-box">
                  <div className="row no-gutters">
                    <Link to="/page/detailpage">
                      <div className="col-md-4">
                        <img
                          src={kim}
                          className="card-img recommend-img"
                          alt="kim"
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body asian-box-body">
                          <h5 className="card-title-books">
                            <b>Kim Ji Yeong</b>
                          </h5>
                          <p className="card-text">
                            Novel sensasional dari Korea Selatan yang ramai
                            dibicarakan di seluruh dunia. Telah diadaptasi ke
                            film, novel karya Cho Nam-joo ini menceritakan kisah
                            seorang wanita muda yang mendapat perlakuan
                            diskriminasi gender.
                          </p>
                          <p className="card-text">
                            <small className="text-muted">
                              - Cho Nam Joo -
                            </small>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Asian */}

        {/* Must Read */}
        <section className="pt-5">
          <div className="container-fluid">
            <h3>Your must-read list</h3>
            <p>Find your new favorite book</p>

            <div className="card-group pt-3">
              <div className="card mr-2">
                <Link to="/page/detailpage">
                  <img src={after} alt="avatar" className="card-img-top" />
                  <div className="card-body garis-top">
                    <h5 className="card-title-books">After the Funeral</h5>
                  </div>
                </Link>
              </div>

              <div className="card mr-2">
                <Link to="/page/detailpage">
                  <img src={segitiga} alt="avatar" className="card-img-top" />
                  <div className="card-body garis-top">
                    <h5 className="card-title-books">Segi Tiga</h5>
                  </div>
                </Link>
              </div>

              <div className="card mr-2">
                <Link to="/page/detailpage">
                  <img src={metro} alt="avatar" className="card-img-top" />
                  <div className="card-body garis-top">
                    <h5 className="card-title-books smaller-font">
                      MetroPop : Ganjil Genap
                    </h5>
                  </div>
                </Link>
              </div>

              <div className="card mr-2">
                <Link to="/page/detailpage">
                  <img src={defending} alt="avatar" className="card-img-top" />
                  <div className="card-body garis-top">
                    <h5 className="card-title-books">Defending Jacob</h5>
                  </div>
                </Link>
              </div>

              <div className="card mr-2">
                <Link to="/page/detailpage">
                  <img src={misteri} alt="avatar" className="card-img-top" />
                  <div className="card-body garis-top">
                    <h5 className="card-title-books">Misteri Terakhir #1</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* Must Read */}
      </div>
    );
  }
}

export default withRouter(Content);
