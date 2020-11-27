import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";
import { IconContext } from "react-icons";
import swal from "sweetalert";

// CSS
import "./payment.css";
import HistoryPayment from "./HistoryPayment";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    let today = new Date();
    let todayDate = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    this.state = {
      date: todayDate,
      paymentRecord: [],
      saldo: 5000,
      denda1: 2000,
      denda2: 2000,
      denda3: 2000,
      denda4: 2000,
      denda5: 2000,
      denda6: 2000,
      sum: "",
      listBox: "",
      noBill: "",
      atmBox: "",
      mbankBox: "",
      topUpBox: "",
      historyPayment: "",
      topUpBtn: "Top Up",
      inputNominal: "",
      nominalTopUp: 0,
      minimum: "",
      mbankCollapse: "",
      internetCollapse: "",
      show: false,
      setShow: false,
    };
  }

  componentDidMount() {
    this.totalDenda();

    this.setState({
      listBox: document.querySelector("body .list-box"),
      noBill: document.getElementById("no-bill"),
      atmBox: document.querySelector(".atm-box"),
      mbankBox: document.querySelector(".mbank-box"),
      topUpBox: document.querySelector(".top-up-box"),
      historyPayment: document.querySelector(".history-payment"),
      minimum: document.querySelector(".top-up-box .min-nominal"),
      mbankCollapse: document.querySelector(".mbank-collapse"),
      internetCollapse: document.querySelector(".internet-collapse"),
    });
  }

  totalDenda = () => {
    const { denda1, denda2, denda3, denda4, denda5, denda6 } = this.state;

    this.setState({
      sum: denda1 + denda2 + denda3 + denda4 + denda5 + denda6,
    });
  };

  history = () => {
    console.log("ok");
    this.state.noBill.classList.add("hide");
    this.state.listBox.classList.add("hide");
    this.state.topUpBox.classList.add("hide");
    this.state.historyPayment.classList.toggle("hide");
    this.state.mbankBox.classList.add("hide");
    this.state.atmBox.classList.add("hide");

    if (this.state.historyPayment.classList.contains("hide")) {
      this.state.noBill.classList.remove("hide");
    } else {
      this.state.noBill.classList.add("hide");
    }
  };

  topUp = () => {
    this.state.mbankBox.classList.add("hide");
    this.state.atmBox.classList.add("hide");
    this.state.historyPayment.classList.add("hide");
    this.state.noBill.classList.add("hide");

    if (this.state.topUpBtn === "Top Up") {
      this.setState({ topUpBtn: "Payment" });
      this.state.listBox.classList.add("hide");
      this.state.topUpBox.classList.toggle("hide");
    } else {
      this.setState({ topUpBtn: "Top Up" });
      this.state.listBox.classList.remove("hide");
      this.state.topUpBox.classList.add("hide");
    }
  };

  pay = () => {
    if (this.state.saldo >= this.state.sum) {
      this.setState({
        paymentRecord: [
          ...this.state.paymentRecord,
          {
            // buat property baru
            id : this.state.paymentRecord.length+1,
            date: this.state.date,
            ref : 'PH-' + this.state.paymentRecord.length,
            class : 'detail-payment-min',
            desc: 'Payment',
            price : this.state.sum,
            icon: '-',
          }
        ]
      })

      const kurang = this.state.saldo - this.state.sum;
      this.setState({ saldo: kurang });
      this.state.listBox.classList.toggle("hide");
      this.state.noBill.classList.toggle("hide");
      swal("Thank You", "Your Payment Was Successful!", "success");
    } else {
      swal("We're Sorry", "Your Payment Failed!", "error");
    }
  };

  minimumTopUp = (e) => {
    this.setState({ inputNominal: e });
    if (parseInt(e) < 10000) {
      this.state.minimum.classList.remove("hide");
      this.setState({ nominalTopUp: 0 });
    } else {
      this.state.minimum.classList.add("hide");
      this.setState({ nominalTopUp: e });
    }
  };

  inputClick = (nominal) => {
    this.setState({ nominalTopUp: nominal, inputNominal: nominal });
  };

  atm = () => {
    this.state.atmBox.classList.toggle("hide");
    this.state.mbankBox.classList.add("hide");
  };

  mbank = () => {
    this.state.atmBox.classList.add("hide");
    this.state.mbankBox.classList.toggle("hide");
  };

  debit = () => {
    this.state.atmBox.classList.add("hide");
    this.state.mbankBox.classList.add("hide");
  };

  openMbank = () => {
    this.state.mbankCollapse.classList.toggle("hide");
    this.state.internetCollapse.classList.add("hide");
  };

  openInternet = () => {
    this.state.internetCollapse.classList.toggle("hide");
    this.state.mbankCollapse.classList.add("hide");
  };

  debitModal = () => {
    this.debit();
    this.setState({ show: !this.state.show });
  };

  debitPay = () => {
    this.handleClose();
    swal("Thank You", "Your Payment Was Successful!", "success");
    this.setState({
      paymentRecord: [
        ...this.state.paymentRecord,
        {
          // buat property baru
          id : this.state.paymentRecord.length+1,
          date: this.state.date,
          ref : 'PH-' + this.state.paymentRecord.length,
          class : 'detail-payment-plus',
          desc: 'Top Up',
          price : this.state.nominalTopUp,
          icon: '+',
        }
      ]
    })

    this.setState({
      saldo: parseInt(this.state.saldo) + parseInt(this.state.nominalTopUp),
      inputNominal: "",
    });
  };

  handleClose = () =>
    this.setState({
      setShow: false,
      show: !this.state.show,
    });
  handleShow = () => this.setState({ setShow: true });

  render() {
    return (
      <div className="right_col" role="main">
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    {/* Logo Bar */}
                    <div className="header-logo-bar shadow p-3 bg-white">
                      <div className="row">
                        <div className="col logo d-flex justify-content-start">
                          <h4>
                            <b>Farday E-Library | Payment</b>
                          </h4>
                        </div>

                        <div className="col top-up d-flex justify-content-end">
                          <p className="pr-1 saldo-text">Rp</p>
                          <span className="pr-3">{this.state.saldo}</span>
                          <div className="pr-3" onClick={() => this.history()}>
                            <IconContext.Provider value={{ color: "green" }}>
                              <FaIcons.FaHistory />
                            </IconContext.Provider>
                          </div>
                          <button
                            className="btn btn-success top-up-btn"
                            type="submit"
                            onClick={() => this.topUp()}
                          >
                            {this.state.topUpBtn}
                          </button>
                        </div>
                      </div>
                    </div>
                    {/* Logo Bar */}
                  </div>

                  <div className="card-body">
                    {/* List */}
                    <div className="container list-box">
                      <div className="row list-header pb-2 pt-2">
                        <div className="col">Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Details
                        </div>

                        <div className="col d-flex justify-content-end">
                          Fine
                        </div>
                      </div>

                      <div className="row listBar list-1 pb-3 pt-3 border-bottom border-secondary bg-white">
                        <div className="col">1. Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Late
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.denda1}
                        </div>
                      </div>

                      <div className="row listBar list-2 pb-3 pt-3 border-bottom border-secondary bg-white">
                        <div className="col">2. Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Late
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.denda2}
                        </div>
                      </div>

                      <div className="row listBar list-4 pb-3 pt-3 border-bottom border-secondary bg-white">
                        <div className="col">4. Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Late
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.denda4}
                        </div>
                      </div>

                      <div className="row listBar list-5 pb-3 pt-3 border-bottom border-secondary bg-white">
                        <div className="col">5. Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Late
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.denda5}
                        </div>
                      </div>

                      <div className="row listBar list-6 pb-3 pt-3 border-bottom border-secondary bg-white">
                        <div className="col">6. Order ID</div>

                        <div className="col d-flex justify-content-center">
                          Late
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.denda6}
                        </div>
                      </div>

                      <div className="row listBar list-total pb-2 pt-2">
                        <div className="col">
                          <button
                            className="btn-sm btn-success"
                            type="button"
                            onClick={() => this.pay()}
                          >
                            Pay
                          </button>
                        </div>

                        <div className="col d-flex justify-content-center">
                          Total
                        </div>

                        <div className="col d-flex justify-content-end">
                          {this.state.sum}
                        </div>
                      </div>
                    </div>
                    {/* List */}

                    {/* No Bill */}
                    <div className="container d-flex justify-content-center">
                      <div className="hide p-5" id="no-bill">
                        <span>No Transactions</span>
                      </div>
                    </div>
                    {/* No Bill */}

                    {/* History Payment */}
                    <div className="container history-payment shadow-sm p-3 bg-white hide">
                      <div className="row p-3">
                        <div className="col">
                          <b className="history-payment-title">
                            Payment History
                          </b>
                        </div>
                      </div>

                      {/* Payment List */}
                      <HistoryPayment paymentRecord={this.state.paymentRecord}/>

                      {/* <div className="row">
                        <div className="col">
                          <div className="row payment-date m-3 pb-1 pt-1">
                            <div className="col">17 Nov 2020</div>
                          </div>

                          <div className="row pl-4">
                            <div className="col">
                              <b className="blackText">Reference Code :</b>
                              <span className="blackText"> 000</span>
                            </div>
                          </div>

                          <div className="row pl-4 pt-2 detail-payment-min">
                            <div className="col">
                              <span>Payment</span>
                            </div>

                            <div className="col -flex justify-content-end pr-5">
                              <span>
                                -Rp<span>20.000</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <div className="row payment-date m-3 pb-1 pt-1">
                            <div className="col">16 Nov 2020</div>
                          </div>

                          <div className="row pl-4">
                            <div className="col">
                              <b className="blackText">Reference Code :</b>
                              <span className="blackText"> 000</span>
                            </div>
                          </div>

                          <div className="row pl-4 pt-2 detail-payment-plus">
                            <div className="col">
                              <span>Top Up</span>
                            </div>

                            <div className="col -flex justify-content-end pr-5">
                              <span>
                                +Rp<span>120.000</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                       */}
                      {/* Payment List */}
                    </div>
                    {/* History Payment */}

                    {/* Top Up Box */}
                    <div className="top-up-box hide">
                      <div className="container border-0 shadow-sm mb-4 bg-white p-3">
                        <div className="row pl-3 pt-3">
                          <div className="col blackText ">
                            <b>Select a top-up amount</b>
                          </div>
                        </div>

                        <div className="row p-3">
                          <div className="col">
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(10000)}
                            >
                              10000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(25000)}
                            >
                              25000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(50000)}
                            >
                              50000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(75000)}
                            >
                              75000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(100000)}
                            >
                              100000
                            </button>
                          </div>
                        </div>

                        <div className="row p-3">
                          <div className="col">
                            <p>Or enter the top-up amount here</p>
                            <input
                              className="pl-3 pt-2 pb-2"
                              type="text"
                              value={this.state.inputNominal}
                              placeholder="Minimun Rp 10.000"
                              onChange={(e) =>
                                this.minimumTopUp(e.target.value)
                              }
                            />
                          </div>
                        </div>

                        <div className="row pl-3">
                          <div className="col">
                            <p className="min-nominal hide">
                              Minimum top-up amount is Rp 10.000.
                            </p>
                          </div>
                        </div>
                      </div>

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
                              onClick={() => this.debitModal()}
                            >
                              Debit Card
                            </button>

                            <button
                              className="methodPay btn mr-1 btn-warning"
                              id="atm"
                              type="button"
                              onClick={() => this.atm()}
                            >
                              ATM
                            </button>

                            <button
                              className="methodPay btn mr-1 btn-warning"
                              id="mbank"
                              type="button"
                              onClick={() => this.mbank()}
                            >
                              Internet/Mobile Banking
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Payment Method */}
                    </div>
                    {/* Top Up Box */}

                    {/* ATM */}
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
                              Enter <b>12345</b> followed by your mobile number
                              : <b>(e.g. 12345 08xx-xxxx-xxxx)</b>
                            </li>
                            <li>
                              Enter <b>Top-up amount</b>
                            </li>
                            <li>
                              Follow the instructions to complete the
                              transaction
                            </li>
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
                    {/* ATM */}

                    {/* Mbank */}
                    <div className="container mbank-box shadow-sm p-5 bg-white blackText hide">
                      <div className="row method-title mb-4">
                        <div className="col">Internet / Mobile Banking</div>
                      </div>

                      <div className="row mb-5">
                        <div className="col">
                          <div className="row mb-4">
                            <div className="col">
                              <span
                                id="mbank-btn"
                                onClick={() => this.openMbank()}
                              >
                                <b id="icon1">
                                  <FaIcons.FaGenderless />
                                </b>
                                <b className="pl-2">Mobile Banking</b>
                              </span>
                              <div className="container mt-4 mbank-collapse hide">
                                <div className="row pb-2">
                                  <div className="col">
                                    <b>Instructions :</b>
                                  </div>
                                </div>

                                <div className="row mb-4">
                                  <div className="col">
                                    <ul>
                                      <li>
                                        Login to your <b>Mobile Banking</b>{" "}
                                        account
                                      </li>
                                      <li>
                                        Select <b>Transfer</b>
                                      </li>
                                      <li>
                                        Select <b>Virtual Account</b>
                                      </li>
                                      <li>
                                        Enter <b>12345</b> followed by your
                                        mobile number :{" "}
                                        <b>(e.g. 12345 08xx-xxxx-xxxx)</b>
                                      </li>
                                      <li>
                                        Enter <b>Top-up amount</b>
                                      </li>
                                      <li>
                                        Follow the instructions to complete the
                                        transaction
                                      </li>
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
                                        <i>
                                          Minimum top-up amount is Rp 10.000
                                        </i>
                                      </li>
                                      <li>
                                        <i>Top-up fee Rp 1.000</i>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="row">
                            <div className="col">
                              <span
                                id="internet-btn"
                                onClick={() => this.openInternet()}
                              >
                                <b id="icon1">
                                  <FaIcons.FaGenderless />
                                </b>
                                <b className="pl-2">Internet Banking</b>
                              </span>
                              <div className="container mt-4 internet-collapse hide">
                                <div className="row pb-2">
                                  <div className="col">
                                    <b>Instructions :</b>
                                  </div>
                                </div>

                                <div className="row mb-4">
                                  <div className="col">
                                    <ul>
                                      <li>
                                        Login to your <b>Internet Banking</b>{" "}
                                        account
                                      </li>
                                      <li>
                                        Select <b>Transfer</b>
                                      </li>
                                      <li>
                                        Select <b>Virtual Account</b>
                                      </li>
                                      <li>
                                        Enter <b>12345</b> followed by your
                                        mobile number :{" "}
                                        <b>(e.g. 12345 08xx-xxxx-xxxx)</b>
                                      </li>
                                      <li>
                                        Enter <b>Top-up amount</b>
                                      </li>
                                      <li>
                                        Follow the instructions to complete the
                                        transaction
                                      </li>
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
                                        <i>
                                          Minimum top-up amount is Rp 10.000
                                        </i>
                                      </li>
                                      <li>
                                        <i>Top-up fee Rp 1.000</i>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Mbank */}
                  </div>

                  {/* Debit modal */}
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
                                    <span>{this.state.nominalTopUp}</span>
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
                                      onClick={() => this.debitPay()}
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
                  {/* Debit modal */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
