import React, { Component } from "react";

export default class NoBills extends Component {
  render() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="hide p-5" id="no-bill">
          <span>No Transactions</span>
        </div>
      </div>
    );
  }
}
