import React, { Component } from "react";
import "./Slidertop.style.css";
import Slider from "react-slick";

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

export default class Content extends Component {
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
            centerPadding: "200px",
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [{
                breakpoint: 768,
                settings: {
                    centerMode: true,
                    centerPadding: '100px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    centerMode: true,
                    centerPadding: '40px',
                    slidesToShow: 1
                }
            }
            ]
          }
        }
      ]
    };
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <Slider {...settings}>
                        <div className="item item1">
                            <div className="item-inner">
                                <div className="text-slide">
                                    <span className="title-slide">
                                        Title Book
                                    </span>
                                    <br />
                                    <span className="author-slide">
                                        Raditya
                                    </span>
                                    <br /><br />
                                    <span className="detail-slide">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores obcaecati nemo a architecto,
                                        reprehenderit delectus nihil omnis recusandae.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="item item2">
                            <div className="item-inner">
                                <div className="text-slide">
                                    <span className="title-slide">
                                        Title Book
                                    </span>
                                    <br />
                                    <span className="author-slide">
                                        Raditya
                                    </span>
                                    <br /><br />
                                    <span className="detail-slide">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores obcaecati nemo a architecto,
                                        reprehenderit delectus nihil omnis recusandae.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="item item3">
                            <div className="item-inner">
                                <div className="text-slide">
                                    <span className="title-slide">
                                        Title Book
                                    </span>
                                    <br />
                                    <span className="author-slide">
                                        Raditya
                                    </span>
                                    <br /><br />
                                    <span className="detail-slide">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores obcaecati nemo a architecto,
                                        reprehenderit delectus nihil omnis recusandae.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="item item4">
                            <div className="item-inner">
                                <div className="text-slide">
                                    <span className="title-slide">
                                        Title Book
                                    </span>
                                    <br />
                                    <span className="author-slide">
                                        Raditya
                                    </span>
                                    <br /><br />
                                    <span className="detail-slide">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores obcaecati nemo a architecto,
                                        reprehenderit delectus nihil omnis recusandae.
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="item item5">
                            <div className="item-inner">
                                <div className="text-slide">
                                    <span className="title-slide">
                                        Title Book
                                    </span>
                                    <br />
                                    <span className="author-slide">
                                        Raditya
                                    </span>
                                    <br /><br />
                                    <span className="detail-slide">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores obcaecati nemo a architecto,
                                        reprehenderit delectus nihil omnis recusandae.
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </section>

                <section className="pt-5">
                    <div className="card" style={{ width: '12rem' }}>
                        <img src={avatar} alt="avatar" className="card-img-top" />
                        <div className="card-body">
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card mt-5 asian-box">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={kim}
                        className="card-img recommend-img"
                        alt="kim"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body asian-box-body">
                        <h5 className="card-title">
                          <b>Kim Ji Yeong</b>
                        </h5>
                        <p className="card-text">
                          Novel sensasional dari Korea Selatan yang ramai
                          dibicarakan di seluruh dunia. Telah diadaptasi ke
                          film, novel karya Cho Nam-joo ini menceritakan kisah
                          seorang wanita muda yang mendapat perlakuan
                          diskriminasi gender.
                        </p>
                        <p class="card-text">
                          <small class="text-muted">- Cho Nam Joo -</small>
                        </p>
                      </div>
                    </div>
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

            <div class="card-group pt-3">
              <div class="card mr-2">
                <img src={after} alt="avatar" className="card-img-top" />
                <div class="card-body garis-top">
                  <h5 class="card-title">After the Funeral</h5>
                </div>
              </div>

              <div class="card mr-2">
                <img src={segitiga} alt="avatar" className="card-img-top" />
                <div class="card-body garis-top">
                  <h5 class="card-title">Segi Tiga</h5>
                </div>
              </div>

              <div class="card mr-2">
                <img src={metro} alt="avatar" className="card-img-top" />
                <div class="card-body garis-top">
                  <h5 class="card-title smaller-font">
                    MetroPop : Ganjil Genap
                  </h5>
                </div>
              </div>

              <div class="card mr-2">
                <img src={defending} alt="avatar" className="card-img-top" />
                <div class="card-body garis-top">
                  <h5 class="card-title">Defending Jacob</h5>
                </div>
              </div>

              <div class="card mr-2">
                <img src={misteri} alt="avatar" className="card-img-top" />
                <div class="card-body garis-top">
                  <h5 class="card-title">Misteri Terakhir #1</h5>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Must Read */}
      </div>
    );
  }
}
