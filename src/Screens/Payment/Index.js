import React, { Component } from "react";
import swal from "sweetalert";

// CSS
import "./payment.css";

// Component
import HistoryPayment from "./HistoryPayment";
import TopUpBar from "./TopUpBar";
import NoBills from "./NoBills";
import DebitModal from "./DebitModal";
import InstructionsATM from "./InstructionsATM";
import InstructionsMbank from "./InstructionsMbank";
import FineLists from "./FineLists";
import TopUpBox from "./TopUpBox";

export default class Payment extends Component {
  constructor(props) {
    super(props);

    let today = new Date();
    let todayDate =
      today.getDate() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getFullYear();

    this.state = {
      date: todayDate,
      paymentRecord: [],
      saldo: 5000,
      denda: 2000,
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
    });
  }

  totalDenda = () => {
    this.setState({
      sum: this.state.denda * 6,
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
            id: this.state.paymentRecord.length + 1,
            date: this.state.date,
            ref: "PH-" + this.state.paymentRecord.length,
            class: "detail-payment-min",
            desc: "Payment",
            price: this.state.sum,
            icon: "-",
          },
        ],
      });

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

  debitModal = () => {
    this.state.atmBox.classList.add("hide");
    this.state.mbankBox.classList.add("hide");
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
          id: this.state.paymentRecord.length + 1,
          date: this.state.date,
          ref: "PH-" + this.state.paymentRecord.length,
          class: "detail-payment-plus",
          desc: "Top Up",
          price: this.state.nominalTopUp,
          icon: "+",
        },
      ],
    });

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
                    {/* TopUpBar */}
                    <TopUpBar
                      saldo={this.state.saldo}
                      history={this.history}
                      topUp={this.topUp}
                      topUpBtn={this.state.topUpBtn}
                    />
                    {/* TopUpBar */}
                  </div>

                  <div className="card-body">
                    {/* List */}
                    <FineLists
                      denda={this.state.denda}
                      sum={this.state.sum}
                      pay={this.pay}
                    />
                    {/* List */}

                    {/* No Bill */}
                    <NoBills />
                    {/* No Bill */}

                    {/* History Payment */}
                    <HistoryPayment paymentRecord={this.state.paymentRecord} />
                    {/* History Payment */}

                    {/* Top Up Box */}
                    <div className="top-up-box hide">
                      {/* Nominal Box */}
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
                      {/* Nominal Box */}

                      <TopUpBox
                        inputClick={this.inputClick}
                        debitModal={this.debitModal}
                        atm={this.atm}
                        mbank={this.mbank}
                      />
                    </div>
                    {/* Top Up Box */}

                    {/* ATM */}
                    <InstructionsATM />
                    {/* ATM */}

                    {/* Mbank */}
                    <InstructionsMbank />
                    {/* Mbank */}
                  </div>

                  {/* Debit modal */}
                  <DebitModal
                    debitPay={this.debitPay}
                    nominalTopUp={this.state.nominalTopUp}
                  />
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