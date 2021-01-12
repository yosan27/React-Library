import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "../../Services/axios-instance";
import swal from "sweetalert";
import noresult from "../../components/img/noresult.png";

// css
import "../SeeMoreBooks/booksList.css";
import "./SearchResult.css"

class SearchResult extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      filtered: [],
      title: this.props.match.params.search
    };
  }

  componentDidMount() {
    axios.get(`books`).then((e)=>{
      const filterData = e.data.data.filter((d) => d.bookDetailsEntity.bookTitle.toLowerCase().includes(this.state.title.toLowerCase()));
      this.setState({data: filterData})
      if(this.state.data.length === 0){
        document.querySelector(".no-result-search").classList.remove("hide");
      }
    }).catch(function(error){
      swal("Failed", error.response.data.message, "error");
    })
  }

  render() {
    return (
      <>
        <div className="right_col" role="main" style={{ minheight: "120vh" }}>
          <section className="mt-5 pt-5 container-fluid mb-4 border-bottom border-secondary">
            <h3>Result</h3>
          </section>

          <div className="container no-result-search hide">
            <div className="row">
              <div className="col d-flex justify-content-center">
                <img className="no-result-img" alt="No Result" src={noresult}/>
              </div>
            </div>
            <div className="row">
              <div className="col d-flex justify-content-center">
                <span className="no-result-text">Hmmm, we're not getting any result. Our bad - try another search.</span>
              </div>
            </div>
          </div>

          <main className="main pb-2">
            <div className="content">
              <ul className="books">
              {this.state.data.map((d) => {
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

export default withRouter(SearchResult);