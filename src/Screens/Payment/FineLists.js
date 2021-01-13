import React, { Component } from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import Axios from '../../Services/axios-instance'
export default class FineLists extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       fine : [],
       rentCode : "",
       bookTitle : "",
       dateBorrow : "",
       dueDate : "",
       dateReturn : "",
    }
  }

  componentDidMount(){
    document.addEventListener('click', this.clearModal);
  }

  getById(code) {
    Axios.get(`rent/code/${code}`).then((res) => {
        this.setState({
            rentCode: res.data.rentCode,
            bookTitle: res.data.bookEntity.bookDetailsEntity.bookTitle,
            dateBorrow: res.data.dateBorrow,
            dueDate: res.data.dueDate,
            dateReturn: res.data.dateReturn
        })
        
        Axios.get(`transaction-detail/rent/${code}`).then((res) => {
            res.data.forEach((d) => {
                this.setState({ fine: [ ...this.state.fine, d ] })
            })
        })
    })
  }

  clearModal = (e) => {
    if (e.target.className === "modal-clear") {
        this.setState({ dateReturn: '', fine: [] })
    }
  }
  
  render() {
    return (
      <div>
        <div className="container list-box hide">
          {/* Header */}
          <div className="row list-header pb-2 pt-2">
            <div className="col">Rent Code</div>

            <div className="col d-flex justify-content-center">Details</div>

            <div className="col d-flex justify-content-end">Fine</div>
          </div>
          {/* Header */}

          {this.props.listRecord.map((e, i) => {
            return (
              <div
                className="row listBar pb-3 pt-3 border-bottom border-secondary bg-white"
                key={i}
              >
                <div className="col">
                  <Link
                    data-toggle="modal"
                    data-target="#info"
                    className="info-link"
                    onClick={() => this.getById(e.rentEntity.rentCode)}
                  >
                    {i + 1}. {e.rentEntity.rentCode}
                  </Link>
                </div>

                <div className="col d-flex justify-content-center">
                  {e.description}
                </div>

                <div className="col d-flex justify-content-end">
                  <NumberFormat
                    value={e.kredit}
                    displayType={"text"}
                    thousandSeparator="&#8228;"
                  />
                </div>
              </div>
            );
          })}

          <div className="row listBar list-total pb-2 pt-2">
            <div className="col">
              <button
                className="btn-sm btn-success"
                type="button"
                onClick={this.props.pay}
              >
                Pay
              </button>
            </div>

            <div className="col d-flex justify-content-center">Total</div>

            <div className="col d-flex justify-content-end">
              <NumberFormat
                value={this.props.sum}
                displayType={"text"}
                thousandSeparator="&#8228;"
              />
            </div>
          </div>
        </div>

        {/* MODAL INFO */}
        <div className="modal fade" id="info" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Info</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true" className="modal-clear">
                    &times;
                  </span>
                </button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Rent Code</label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        value={this.state.rentCode}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Book Title
                    </label>
                    <div className="col-sm-8">
                      <input
                        type="text"
                        className="form-control-plaintext"
                        value={this.state.bookTitle}
                        readOnly
                      />
                    </div>
                  </div>
                  <hr></hr>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Date Borrowed
                    </label>
                    <div className="col-sm-5">
                      <div className="input-group date">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.dateBorrow}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Due Date</label>
                    <div className="col-sm-5">
                      <div className="input-group date">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.dueDate}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      Date Returned
                    </label>
                    <div className="col-sm-5">
                      <div className="input-group date">
                        <input
                          type="text"
                          className="form-control"
                          value={this.state.dateReturn}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <hr></hr>
                  <div className="form-group row">
                    <label className="col-sm-4 col-form-label">
                      <b>Fine</b>
                    </label>
                    <div className="col-sm-8 ml-0 pl-0">
                      {this.state.fine.map((fine, index) => {
                        return (
                          <div className="col-sm-8" key={index}>
                            <input
                              type="text"
                              className="form-control-plaintext pb-0"
                              value={fine.kredit}
                            />
                            <small className="form-text text-muted">
                              {fine.fineEntity.fineType}
                            </small>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
