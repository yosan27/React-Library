import React, { Component } from "react";
import NumberFormat from 'react-number-format';
import { Link } from "react-router-dom";

export default class HistoryPayment extends Component {
  render() {
    if(this.props.paymentRecord.length > 20){
      document.querySelector("#next-history").classList.remove("hide");
    }
    return (
      <div className="container history-payment shadow-sm p-3 bg-white hide">
        <div className="row p-3">
          <div className="col">
            <b className="history-payment-title">Payment History</b>
          </div>
        </div>
        {this.props.paymentRecord.reverse().slice(0,20).map((rec, i) => {
          return (
            <div className="row" key={i}>
              <div className="col">
                <div className="row payment-date m-3 pb-1 pt-1">
                  <div className="col">{rec.date}</div>
                </div>

                <div className="row pl-4 payment-code">
                  <div className="col">
                    <b className="blackText">Reference Code :</b>
                    <span className="blackText"> {rec.transactionCode}</span>
                  </div>
                </div>

                <div className="row pl-4 pt-2 payment-method">
                  <div className="col">
                    <span className={(rec.paymentMethod === "LibraryPay") ? "detail-payment-min" : "detail-payment-plus"}>
                      {(rec.paymentMethod === "LibraryPay") ? "Payment" : "Top-Up"}</span>
                  </div>

                  <div className="col d-flex justify-content-center payment-status">
                    <span className={(rec.paymentStatus === 1) ? "detail-payment-min" : "detail-payment-plus"}>
                      {(rec.paymentStatus === 1) ? "Pending" : "Success"}</span>
                  </div>

                  <div className="col d-flex justify-content-end pr-5 history-nominal">
                    <span className={(rec.paymentMethod === "LibraryPay") ? "detail-payment-min" : "detail-payment-plus"}>
                      {(rec.paymentMethod === "LibraryPay") ? "-" : "+"}Rp <span><NumberFormat value={rec.nominal} displayType={'text'} thousandSeparator="&#8228;"/></span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="row pt-5 hide" id="next-history">
          <div className="col d-flex justify-content-end">
            <Link to="/page/all-history">
              <i class="fa fa-arrow-right payment-arrow"></i>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
