import React, { Component } from "react";

export default class FineLists extends Component {
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
              <div className="row listBar pb-3 pt-3 border-bottom border-secondary bg-white" key={i}>
                <div className="col">{i+1}. {e.rentEntity.rentCode}</div>

                <div className="col d-flex justify-content-center">{e.description}</div>

                <div className="col d-flex justify-content-end">
                  {e.kredit}
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
              {this.props.sum}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
