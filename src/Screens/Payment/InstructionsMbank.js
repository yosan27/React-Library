import React, { Component } from "react";
import * as FaIcons from "react-icons/fa";

export default class InstructionsMbank extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      mbankCollapse: "",
      internetCollapse: "",
    }
  }

  componentDidMount() {
    this.setState({
      mbankCollapse: document.querySelector(".mbank-collapse"),
      internetCollapse: document.querySelector(".internet-collapse"),
    });
  }
  
  openMbank = () => {
    this.state.mbankCollapse.classList.toggle("hide");
    this.state.internetCollapse.classList.add("hide");
  };

  openInternet = () => {
    this.state.internetCollapse.classList.toggle("hide");
    this.state.mbankCollapse.classList.add("hide");
  };

  render() {
    return (
      <div className="container mbank-box shadow-sm p-5 bg-white blackText hide">
        <div className="row method-title mb-4">
          <div className="col">Internet / Mobile Banking</div>
        </div>

        <div className="row mb-5">
          <div className="col">
            <div className="row mb-4">
              <div className="col">
                <span id="mbank-btn" onClick={() => this.openMbank()}>
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
                          Login to your <b>Mobile Banking</b> account
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
                        <li>
                          Follow the instructions to complete the transaction
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
              </div>
            </div>

            <div className="row">
              <div className="col">
                <span id="internet-btn" onClick={() => this.openInternet()}>
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
                          Login to your <b>Internet Banking</b> account
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
                        <li>
                          Follow the instructions to complete the transaction
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
