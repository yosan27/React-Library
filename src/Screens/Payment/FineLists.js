import React, { Component } from "react";

export default class FineLists extends Component {
  render() {
    return (
      <div>
        <div className="container list-box">
          {/* Header */}
          <div className="row list-header pb-2 pt-2">
            <div className="col">Order ID</div>

            <div className="col d-flex justify-content-center">Details</div>

            <div className="col d-flex justify-content-end">Fine</div>
          </div>
          {/* Header */}

          <div className="row listBar list-1 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">1. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-2 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">2. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-3 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">3. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-4 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">4. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-5 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">5. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-6 pb-3 pt-3 border-bottom border-secondary bg-white">
            <div className="col">6. Order ID</div>

            <div className="col d-flex justify-content-center">Late</div>

            <div className="col d-flex justify-content-end">
              {this.props.denda}
            </div>
          </div>

          <div className="row listBar list-total pb-2 pt-2">
            <div className="col">
              <button
                className="btn-sm btn-success"
                type="button"
                onClick={() => this.props.pay()}
              >
                Pay
              </button>
            </div>

            <div className="col d-flex justify-content-center">Total</div>

            <div className="col d-flex justify-content-end">
              {this.props.sum}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
