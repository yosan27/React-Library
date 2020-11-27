import React, { Component } from "react";

export default class DebitModal extends Component {
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
                      type="text"
                      name="nameCard"
                      autocomplete="off"
                      required
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
                      type="text"
                      name="cardNumber"
                      autocomplete="off"
                      required
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
                      type="text"
                      name="cvc"
                      placeholder="ex. 311"
                      autocomplete="off"
                      size="3"
                      required
                    />
                  </div>

                  <div className="col-3">
                    <input
                      className="short-input"
                      type="text"
                      name="masa"
                      placeholder="MM"
                      autocomplete="off"
                      size="4"
                      required
                    />
                  </div>

                  <div className="col d-flex justify-content-end">
                    <input
                      className="short-input"
                      type="text"
                      name="masa"
                      placeholder="YY"
                      autocomplete="off"
                      size="4"
                      required
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
                        <span>{this.props.nominalTopUp}</span>
                      </div>
                    </div>
                  </div>

                  <div className="col d-flex align-items-center justify-content-end">
                    <div className="row">
                      <div className="col">
                        <button
                          className="btn debit-modal-pay-btn"
                          type="button"
                          data-dismiss="modal"
                          onClick={() => this.props.debitPay()}
                        >
                          Pay
                        </button>
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
