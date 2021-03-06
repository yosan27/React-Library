import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Axios from "../../Services/axios-instance";

// css
import "./booksList.css";

class SeeMoreBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      title: this.props.match.params.title
    };
  }

  componentDidMount() {
    let books = sessionStorage.getItem('books');
    this.setState({ data: JSON.parse(books)});
    sessionStorage.clear()
  }
  
  review(e,i){
    let allRate = 0;
    Axios.get(`review/rate-by/${e}`).then((rev)=>{
      if(rev.data.length !==0){
        rev.data.forEach((r)=>{
          allRate += parseFloat(r.rate);
        })
        let rate = allRate/parseFloat(rev.data.length);
        document.querySelector("#bookRate"+i).textContent = " " + rate;
      }else{
        document.querySelector("#bookRate"+i).textContent = " No Rating";
      }
    });
  }

  render() {
    return (
      <>
        <div className="right_col" role="main" style={{ minheight: "120vh" }}>
          <section className="mt-5 pt-5 container-fluid mb-4 border-bottom border-secondary">
            <h3>{this.state.title.replace("-", " ")}</h3>
          </section>

          <main className="main pb-2">
            <div className="content">
              <ul className="books">
              {this.state.data.map((d,i) => {
                return(
                  <Link to={{pathname: `/page/detailpage/${d.bookCode}`}}>
                    <li>
                      <div className="book">
                        <div className="row">
                          <img src={d.bookDetailsEntity.cover} alt={d.bookDetailsEntity.bookTitle} className="book-image"/>
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
                              <div className="book-rating text-muted">
                                <i class="fa fa-star star-rate pr-1"><span className="text-muted" id={"bookRate" + i}></span></i>{this.review(d.bookDetailsEntity.bookDetailCode,i)}
                              </div>
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

export default withRouter(SeeMoreBooks);
