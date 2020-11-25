import React, { Component } from 'react';
import './Slidertop.style.css';
import Slider from "react-slick";
import avatar from "./avatar.png"

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "2%", background: "transparent" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "2%", background: "transparent" }}
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
        };
        return (
            <div className="right_col" role="main" style={{ height: '100vh' }}>
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
                    <div class="card" style={{width: '12rem'}}>
                        <img src={avatar} alt="avatar" class="card-img-top" />
                        <div class="card-body">
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </section>
            </div >
        )
    }
}