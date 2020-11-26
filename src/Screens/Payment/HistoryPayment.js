import React, { Component } from "react";

export default class HistoryPayment extends Component {
  render() {
    return (
      <>
        {this.props.paymentRecord.reverse().map((rec) => {
          return (
            <div className="row">
              <div className="col">
                <div className="row payment-date m-3 pb-1 pt-1">
                  <div className="col">{rec.date}</div>
                </div>

                <div className="row pl-4">
                  <div className="col">
                    <b className="blackText">Reference Code :</b>
                    <span className="blackText"> {rec.ref}</span>
                  </div>
                </div>

                <div className="row pl-4 pt-2">
                  <div className="col">
                    <span className={rec.class}>{rec.desc}</span>
                  </div>

                  <div className="col d-flex justify-content-end pr-5">
                    <span className={rec.class}>
                      {rec.icon}Rp<span>{rec.price}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
