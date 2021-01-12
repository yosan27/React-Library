import React, { Component } from "react";
import axios from "../../Services/axios-instance";
import swal from "sweetalert";
import AuthService from "../../Services/auth.service";

import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import "datatables.net-responsive-dt/js/responsive.dataTables.js";
import "datatables.net-responsive-dt/css/responsive.dataTables.css";
import "jquery/dist/jquery.min.js";
import $ from "jquery";

export default class AllHistory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      record: [],
    };
  }

  componentDidMount() {
    // Get Data On List
    this.getRecord();
  }

  getRecord = () => {
    axios.get("transaction/user/" + AuthService.getUserCode())
      .then((e) => {
        this.setState({ record: e.data });
        $(function () {
          $("#fine-list").DataTable({
            responsive: true,
          });
        });
      })
      .catch(function (error) {
        swal("Failed", error.response.data.message, "error");
      });
  };

  render() {
    return (
      <div className="right_col" role="main">
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3>Payment History</h3>
                  </div>

                  <div className="card-body">
                    <table
                      responsive
                      striped
                      id="fine-list"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>Reference Code</th>
                          <th>Transaction Date</th>
                          <th>Detail</th>
                          <th>Nominal</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.record.map((e) => {
                          return (
                            <tr>
                              <td>{e.transactionCode}</td>
                              <td>{e.date}</td>
                              <td>{(e.paymentMethod === "LibraryPay") ? "Payment" : "Top-Up"}</td>
                              <td>{e.nominal}</td>
                              <td>{e.paymentMethod}</td>
                              <td>{(e.paymentStatus === 1) ? "Pending" : "Success"}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
