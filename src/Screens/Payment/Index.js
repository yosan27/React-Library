import React, { Component } from "react";
import swal from "sweetalert";
import axios from "axios";

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
      lastCode: "",
      detailCode: "",
      userCode: "",
      userId: "",
      paymentRecord: [],
      listRecord: [],
      rentCodeList: [],
      saldo: "",
      denda: 2000,
      sum: 0,
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
    };
  }

  componentDidMount() {
      axios.get("http://localhost:8500/api/user/code/"+ sessionStorage.getItem('userCode')).then((e) => {
          this.setState({
              saldo: e.data.balance,
              userId: e.data.id,
              userCode : sessionStorage.getItem('userCode')
          })

      axios.get(`http://localhost:8500/api/transaction/user/${this.state.userCode}`)
        .then((record) => {
          this.setState({paymentRecord: record.data});
          let idCode = this.state.userCode.substring(2,this.state.userCode.length);
          if (this.state.paymentRecord.length !== 0) {
            let lastDigit = this.state.paymentRecord[this.state.paymentRecord.length - 1].transactionCode.substr(6);
            let secondDigit = this.state.paymentRecord[this.state.paymentRecord.length - 1].transactionCode.substr(5,1);
            let firstDigit = this.state.paymentRecord[this.state.paymentRecord.length - 1].transactionCode.substr(4,1);
            if (lastDigit === 9) {
              if (secondDigit === 9) {
                let firstPlus = parseInt(firstDigit) + 1;
                let code = `T${idCode}${firstPlus}00`;
                this.setState({ lastCode: code });
              } else {
                let secondPlus = parseInt(secondDigit) + 1;
                let code = `T${idCode}${firstDigit}${secondPlus}0`;
                this.setState({ lastCode: code });
              }
            } else {
              let lastPlus = parseInt(lastDigit) + 1;
              let code = `T${idCode}${firstDigit}${secondDigit}${lastPlus}`;
              this.setState({ lastCode: code });
            }
          } else {
            this.setState({ lastCode: `T${idCode}001` });
          }
        });

        axios.get(`http://localhost:8500/api/transaction-detail/user/${this.state.userCode}`).then((record) => {
          let idCode = this.state.userCode.substring(2,this.state.userCode.length);
          if (record.data.length !== 0) {
            let lastDigit = record.data[record.data.length - 1].detailCode.substr(7);
            let secondDigit = record.data[record.data.length - 1].detailCode.substr(6, 1);
            let firstDigit = record.data[record.data.length - 1].detailCode.substr(5, 1);
            if (lastDigit === 9) {
              if (secondDigit === 9) {
                let firstPlus = parseInt(firstDigit) + 1;
                let code = `TD${idCode}${firstPlus}00`;
                this.setState({ detailCode: code });
              } else {
                let secondPlus = parseInt(secondDigit) + 1;
                let code = `TD${idCode}${firstDigit}${secondPlus}0`;
                this.setState({ detailCode: code });
              }
            } else {
              let lastPlus = parseInt(lastDigit) + 1;
              let code = `TD${idCode}${firstDigit}${secondDigit}${lastPlus}`;
              this.setState({ detailCode: code });
            }
          } else {
            this.setState({ detailCode: `TD${idCode}001` });
          }
      });

      axios.get(`http://localhost:8500/api/transaction-detail/bill/${this.state.userCode}`).then((record)=>{
        record.data.map((d)=>{
          let bill = (parseInt(this.state.sum) + parseInt(d.kredit))
          if(d.rentEntity.status === 4){
            this.setState({
              listRecord : [
              ...this.state.listRecord, d
              ],
              rentCodeList : [
                ...this.state.rentCodeList, d.rentEntity.rentCode
                ],
              sum : bill
            })
            
          }
        })
        if(this.state.listRecord.length === 0){
          this.noBills();
        }else{
          this.state.listBox.classList.remove("hide");
        }
      })
    });

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

  history = () => {
    if (this.state.historyPayment.classList.contains("hide")) {
      this.state.historyPayment.classList.toggle("hide");
      this.state.noBill.classList.add("hide");
      this.state.listBox.classList.add("hide");
      this.state.topUpBox.classList.add("hide");
      this.state.mbankBox.classList.add("hide");
      this.state.atmBox.classList.add("hide");
    } else {
      this.state.historyPayment.classList.toggle("hide");
      if(this.state.listRecord.length === 0){
        this.noBills();
      }else{
        this.state.listBox.classList.remove("hide");
      }
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
      if(this.state.listRecord.length === 0){
        this.state.noBill.classList.remove("hide");
      }else{
        this.state.listBox.classList.remove("hide");
      }
      this.state.topUpBox.classList.add("hide");
    }
  };

  noBills = () =>{
    this.state.listBox.classList.add("hide");
    this.state.noBill.classList.remove("hide");
  }

  pay = () => {
    if (this.state.saldo >= this.state.sum) {
      const kurang = this.state.saldo - this.state.sum;
      let updateBalance = {
        balance: kurang,
      };
      let paymentRecord = {
        transactionCode: this.state.lastCode,
        nominal: this.state.sum,
        paymentMethod: "LibraryPay",
        paymentStatus: 2,
        userCode: this.state.userCode,
      };
      let updateStatus = {
        status: 5
      }
      axios.post("http://localhost:8500/api/transaction", paymentRecord).then(()=>{
        this.state.rentCodeList.map((e)=>{
          axios.put(`http://localhost:8500/api/rent/code/${e}`, updateStatus)
        });
        axios.put(`http://localhost:8500/api/user/balance/${this.state.userId}`, updateBalance)
          .then(() => {
            this.setState({ saldo: kurang });
            swal(
              "Thank You",
              "Your Payment Was Successful!",
              "success"
            ).then(() => window.open("http://localhost:3000/page/payment", "_self"));
        });
      });
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
  };

  debitPay = () => {
    let topUp = parseInt(this.state.saldo) + parseInt(this.state.nominalTopUp);
    let updateBalance = {
      balance: topUp,
    };
    let paymentRecord = {
      transactionCode: this.state.lastCode,
      nominal: this.state.nominalTopUp,
      paymentMethod: "Debit Card",
      paymentStatus: 2,
      userCode: this.state.userCode,
    };
    let detail = {
      detailCode: this.state.detailCode,
      transactionCode: this.state.lastCode,
      description: "Top-Up",
      debet: this.state.nominalTopUp,
      kredit: 0,
      fineCode: null,
      rentCode: null,
      userCode: this.state.userCode,
    };
    axios
      .post("http://localhost:8500/api/transaction", paymentRecord)
      .then(() => {
        axios
          .post("http://localhost:8500/api/transaction-detail", detail)
          .then(() => {
            axios
              .put(`http://localhost:8500/api/user/balance/${this.state.userId}`, updateBalance)
              .then(() => {
                this.setState({ saldo: topUp, inputNominal: "" });
                swal(
                  "Thank You",
                  "Your Payment Was Successful!",
                  "success"
                ).then(() =>
                  window.open("http://localhost:3000/page/payment", "_self")
                );
              });
          });
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
                      listRecord={this.state.listRecord}
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
                              10.000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(25000)}
                            >
                              25.000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(50000)}
                            >
                              50.000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(75000)}
                            >
                              75.000
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-secondary mt-2"
                              onClick={(nominal) => this.inputClick(100000)}
                            >
                              100.000
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
