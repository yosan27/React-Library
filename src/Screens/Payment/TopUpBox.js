import React, { Component } from "react";

export default class TopUpBox extends Component {
  render() {
    return (
      <>
        {/* Payment Method */}
        <div className="container border-0 shadow-sm mb-4 bg-white p-3">
          <div className="row p-3">
            <div className="col blackText payment-method-btn">
              <b>Payment Methods</b>
            </div>
          </div>

          <div className="row p-3">
            <div className="col payment-method-btn">
              <button
                className="methodPay btn mr-1 btn-warning"
                id="debit"
                type="button"
                data-toggle="modal"
                data-target="#debitModal"
                onClick={() => this.props.debitModal()}
              >
                Debit Card
              </button>

              <button
                className="methodPay btn mr-1 btn-warning"
                id="atm"
                type="button"
                onClick={() => this.props.atm()}
              >
                ATM
              </button>

              <button
                className="methodPay btn mr-1 btn-warning"
                id="mbank"
                type="button"
                onClick={() => this.props.mbank()}
              >
                Internet/Mobile Banking
              </button>
            </div>
          </div>
        </div>
        {/* Payment Method */}
      </>
    );
  }
}
