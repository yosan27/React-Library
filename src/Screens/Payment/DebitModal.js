import React, { Component } from "react";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import swal from "sweetalert";

export default class DebitModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nameCard: "",
      cardNumber: "",
      cvc: "",
      expiredMonth: "",
      expiredYear: "",
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
      f: false,
    };
  }

  handleChange = (event, value) => {
    const text = /^[a-zA-Z\s]*$/;
    const re = /^[0-9\b]+$/;
    let {a,b,c,d,e,f} = this.state;
    
    if (event.target.name === "cardNumber") {
      if (event.target.value === "" || re.test(event.target.value)) {
        if (value.length === 16) {
          this.setState({a : true});
          if(d && b && c && e && f) {
            document.querySelector(".debit-modal-pay-btn").classList.remove("disabled");
          }
        }else{
          this.setState({a : false});
          document.querySelector(".debit-modal-pay-btn").classList.add("disabled");
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    }

    if (event.target.name === "cvc") {
      if (event.target.value === "" || re.test(event.target.value)) {
        if (value.length === 3) {
          this.setState({b : true});
          if(a && d && c && e && f) {
            document.querySelector(".debit-modal-pay-btn").classList.remove("disabled");
          }
        }else{
          this.setState({b : false});
          document.querySelector(".debit-modal-pay-btn").classList.add("disabled");
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    }

    if (event.target.name === "expiredMonth") {
      if (event.target.value === "" || re.test(event.target.value)) {
        if(value.substring(0,1)>1){
          event.target.value = event.target.value.slice(0,0);
        }
        if((value.substring(0,1) === "1" && value.substring(1,2)>2)){
          event.target.value = event.target.value.slice(0,1);
        }
        if (value.length === 2) {
          this.setState({c : true});
          if(a && b && d && e && f) {
            document.querySelector(".debit-modal-pay-btn").classList.remove("disabled");
          }
        }else{
          this.setState({c : false});
          document.querySelector(".debit-modal-pay-btn").classList.add("disabled");
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    }

    if (event.target.name === "expiredYear") {
      if (event.target.value === "" || re.test(event.target.value)) {
        if (value.length === 4) {
          this.setState({d : true});
          if(a && b && c && e && f) {
            document.querySelector(".debit-modal-pay-btn").classList.remove("disabled");
          }
        }else{
          this.setState({d : false});
          document.querySelector(".debit-modal-pay-btn").classList.add("disabled");
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    }
    
    if (event.target.name === "nameCard") {
      if (event.target.value === "" || text.test(event.target.value)) {
        if (value.length !== 0) {
          this.setState({e : true});
          if(a && b && c && d && f) {
            document.querySelector(".debit-modal-pay-btn").classList.remove("disabled");
          }
        }else{
          this.setState({e : false});
          document.querySelector(".debit-modal-pay-btn").classList.add("disabled");
        }
        this.setState({
          [event.target.name]: event.target.value,
        });
      }
    }

    if (this.props.nominalTopUp !== 0) {
      this.setState({f : true});
    }else{
      this.setState({f : false});
    }
  };

  maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
      object.target.value = object.target.value.slice(
        0,
        object.target.maxLength
      );
    }
  };

  confirm = () =>{
    swal({
      title: "Are you sure?",
      text: "Make sure the data is correct!",
      icon: "warning",
      buttons: {
        cancel: true,
        confirm: "Confirm",
    }
    }).then((ok) => {
      if(ok){
        this.props.debitPay();
      }
    })
  }

  render() {
    return (
      <div className="modal fade" tabindex="-1" id="debitModal">
        <div className="modal-dialog modal-sm modal-dialog-centered">
          <div className="modal-content modal-debit">
            <div className="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col">
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                </div>

                <div className="row">
                  <div className="col title">
                    <b>Debit Card</b>
                    <hr />
                  </div>
                </div>

                <div className="row pb-3">
                  <div className="col">
                    <label for="nameCard">
                      <b>Name on Card</b>
                    </label>
                    <br />
                    <input
                      className="long-input"
                      maxLength="32"
                      type="text"
                      placeholder="Card Holder Name"
                      name="nameCard"
                      autocomplete="off"
                      value={this.state.nameCard}
                      onChange={(e) => this.handleChange(e, e.target.value)}
                      onInput={this.maxLengthCheck}
                    />
                  </div>
                </div>

                <div className="row pb-3">
                  <div className="col">
                    <label for="cardNumber">
                      <b>Card Number</b>
                    </label>
                    <br />
                    <input
                      className="long-input"
                      maxLength="16"
                      placeholder="Minimum 16 Digit"
                      type="text"
                      name="cardNumber"
                      autocomplete="off"
                      value={this.state.cardNumber}
                      onChange={(e) => this.handleChange(e, e.target.value)}
                      onInput={this.maxLengthCheck}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-4">
                    <label for="cvc">
                      <b>CVC</b>
                    </label>
                  </div>

                  <div className="col">
                    <label for="masa">
                      <b>Expiry Date</b>
                    </label>
                  </div>
                </div>

                <div className="row pb-3">
                  <div className="col-4 mr-1">
                    <input
                      className="short-input"
                      maxLength="3"
                      type="text"
                      name="cvc"
                      placeholder="ex. 311"
                      size="3"
                      value={this.state.cvc}
                      onChange={(e) => this.handleChange(e, e.target.value)}
                    />
                  </div>

                  <div className="col-3">
                    <input
                      className="short-input"
                      type="text"
                      maxLength="2"
                      name="expiredMonth"
                      placeholder="mm"
                      autocomplete="off"
                      size="4"
                      value={this.state.expiredMonth}
                      onChange={(e) => this.handleChange(e, e.target.value)}
                    />
                  </div>

                  <div className="col d-flex justify-content-end">
                    <input
                      className="short-input"
                      maxLength="4"
                      type="text"
                      name="expiredYear"
                      placeholder="yyyy"
                      autocomplete="off"
                      size="4"
                      value={this.state.expiredYear}
                      onChange={(e) => this.handleChange(e, e.target.value)}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="row">
                      <div className="total col">
                        <span>Total : </span>
                      </div>
                    </div>

                    <div className="row">
                      <div className="total col">
                        <span>
                          Rp{" "}
                          <NumberFormat
                            value={this.props.nominalTopUp}
                            displayType={"text"}
                            thousandSeparator="&#8228;"
                          />
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex align-items-center justify-content-end">
                    <div className="row">
                      <div className="col">
                        <Link
                          className="btn debit-modal-pay-btn disabled"
                          type="button"
                          data-dismiss="modal"
                          onClick={this.confirm}
                        >
                          Pay
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
