import React, { Component } from "react";
import swal from "sweetalert";
import axios from 'axios';

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

    this.state = {
      lastCode : "",
      userCode : "",
      paymentRecord: [],
      saldo: "",
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
    axios.get("http://localhost:8500/api/user-by-id/1").then((e) => {
      this.setState({
        saldo : e.data[0].balance,
        userCode : e.data[0].userCode
      })
    });

    axios.get("http://localhost:8500/api/transaction").then((e) => {
      this.setState({
        paymentRecord : e.data
      });
      if(this.state.paymentRecord.length !== 0){
        let lastDigit = this.state.paymentRecord[this.state.paymentRecord.length-1].transactionCode.substr(3);
        let secondDigit = this.state.paymentRecord[this.state.paymentRecord.length-1].transactionCode.substr(2,1);
        let firstDigit = this.state.paymentRecord[this.state.paymentRecord.length-1].transactionCode.substr(1,1);
        if(lastDigit === 9){
          if(secondDigit === 9){
            let firstPlus = parseInt(firstDigit)+1;
            let code = `T${firstPlus}00`;
            this.setState({lastCode : code});
          }else{
            let secondPlus = parseInt(secondDigit)+1;
            let code = `T${firstDigit}${secondPlus}0`;
            this.setState({lastCode : code});
          }
        }else{
          let lastPlus = parseInt(lastDigit)+1;
          let code = `T${firstDigit}${secondDigit}${lastPlus}`;
          this.setState({lastCode : code});
        }
      }else{
        this.setState({lastCode : "T000"});
      }
    });

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
      const kurang = this.state.saldo - this.state.sum;
      let updateBalance = {
        balance: kurang
      }
        axios.put("http://localhost:8500/api/user-balance/1", updateBalance).then(()=>{
          this.setState({ saldo: kurang });
          this.state.listBox.classList.toggle("hide");
          this.state.noBill.classList.toggle("hide");
            let paymentRecord = {
              transactionCode: this.state.lastCode,
              nominal: this.state.sum,
              paymentMethod: "LibraryPay",
              paymentStatus: 2,
              userCode : this.state.userCode
            };
            axios.post("http://localhost:8500/api/transaction", paymentRecord).then(()=>{
              swal("Thank You", "Your Payment Was Successful!", "success")
                .then(() =>window.open("http://localhost:3000/User", "_self"));
            })
      })
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
    let topUp = parseInt(this.state.saldo) + parseInt(this.state.nominalTopUp);
    let updateBalance = {
      balance: topUp
    }
    axios.put("http://localhost:8500/api/user-balance/1", updateBalance).then(()=>{
        this.setState({ saldo: topUp, inputNominal: "", });
            let paymentRecord = {
              transactionCode: this.state.lastCode,
              nominal: this.state.nominalTopUp,
              paymentMethod: "Debit Card",
              paymentStatus: 2,
              userCode : this.state.userCode
            };
            axios.post("http://localhost:8500/api/transaction", paymentRecord).then(()=>{
              swal("Thank You", "Your Payment Was Successful!", "success")
                .then(() =>window.open("http://localhost:3000/User", "_self"));
            })
      })
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
