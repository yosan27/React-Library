import React, { Component } from "react";
import { IconContext } from "react-icons";
import * as FaIcons from "react-icons/fa";

export default class TopUpBar extends Component {
  render() {
    return (
      <div>
        <div className="header-logo-bar shadow p-3 bg-white">
          <div className="row">
            <div className="col logo d-flex justify-content-start">
              <h4>
                <b>Farday E-Library | Payment</b>
              </h4>
            </div>

            <div className="col top-up d-flex justify-content-end">
              <p className="pr-1 saldo-text">Rp</p>
              <span>{this.props.saldo}</span>
              <div className="history-icon" onClick={() => this.props.history()}>
                <IconContext.Provider value={{ color: "green" }}>
                  <FaIcons.FaHistory />
                </IconContext.Provider>
              </div>
              <button
                className="btn btn-success top-up-btn"
                type="submit"
                onClick={() => this.props.topUp()}
              >
                {this.props.topUpBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
