import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// css
import "./booksList.css";

export default class FineManagement extends Component {
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
    return (
      <>
        <div className="right_col" role="main" style={{ minheight: "120vh" }}>
          <section className="mt-5 pt-5 container-fluid mb-4 border-bottom border-secondary">
            <h3>See More</h3>
          </section>

          <main className="main pb-2">
            <div className="content">
              <ul className="books">
              {this.state.data.map((datas) => {
                let d = datas.bookDetailsEntity;
                return(
                  <Link to="/page/detailpage">
                    <li>
                      <div className="book">
                        <div className="row">
                          <img src={d.cover} alt={d.bookTitle} className="book-image"/>
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
                              <div className="book-rating text-muted"><i className="fa fa-star star-rate pr-1"></i>5</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </Link>
                )
              })}
              </ul>
            </div>
          </main>
        </div>
      </>
    );
  }
}
