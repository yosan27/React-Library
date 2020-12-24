import React, { Component } from "react";

export default class InstructionsATM extends Component {
  render() {
    return (
      <div className="container atm-box shadow-sm p-5 bg-white blackText hide">
        <div className="row method-title mb-4">
          <div className="col">ATM</div>
        </div>

        <div className="row pb-2">
          <div className="col">
            <b>Instructions :</b>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col">
            <ul>
              <li>Insert your ATM card and enter your PIN</li>
              <li>
                Select <b>Other Transactions</b>
              </li>
              <li>
                Select <b>Transfer</b>
              </li>
              <li>
                Select <b>Virtual Account</b>
              </li>
              <li>
                Enter <b>12345</b> followed by your mobile number :{" "}
                <b>(e.g. 12345 08xx-xxxx-xxxx)</b>
              </li>
              <li>
                Enter <b>Top-up amount</b>
              </li>
              <li>Follow the instructions to complete the transaction</li>
            </ul>
          </div>
        </div>

        <div className="row footnote">
          <div className="col">
            <span>
              <i>Notes :</i>
            </span>
          </div>
        </div>

        <div className="row footnote">
          <div className="col">
            <ul>
              <li>
                <i>Minimum top-up amount is Rp 10.000</i>
              </li>
              <li>
                <i>Top-up fee Rp 1.000</i>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
