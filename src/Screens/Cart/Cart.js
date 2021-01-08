import React, { Component } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import swal from "sweetalert";
import axios from "axios";
import Axios from "../../Services/axios-instance";
import AuthService from "../../Services/auth.service";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            fullName: "",
            userCode: "",
            id: "",
            dataCart: [],
            dataStatus: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getTglNow()

        Axios.get("user/code/" + AuthService.getUserCode()).then((e) => {
            this.setState({
                userCode: AuthService.getUserCode(),
                fullName: e.data.fullName,
                id: e.data.id
            })
        })
        Axios.get("cart/usercode/" + AuthService.getUserCode()).then((e) => {
            // console.log(e.data.data)
            this.setState({
                dataCart: e.data.data
            })
            // console.log(this.state.dataCart)
            this.state.dataCart.map((cart, i) => {
                Axios.get("book/detailcode/" + cart.bookDetailsEntity.bookDetailCode).then((resp) => {
                    // console.log(resp)
                    this.setState({
                        dataStatus: [...this.state.dataStatus, {
                            'dataCart': cart,
                            'detailbooks': resp.data.data
                        }]
                    })
                    $(function () {
                        $('#cartlist_table').DataTable({
                            responsive: true
                        });
                    });
                })
            })
        }).catch(function (error) {
            console.log(error);
            $(function () {
                $('#cartlist_table').DataTable({
                    responsive: true
                });
            });
        })
    }

    async getTglNow() {
        var today = new Date();
        var datenow = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = "0" + dd;
        }
        if (mm < 10) {
            mm = "0" + mm;
        }

        today = yyyy + "-" + mm + "-" + dd;
        datenow = dd + "-" + mm + "-" + yyyy;
        document.getElementById("tgl_pinjam").setAttribute("min", today);
        document.getElementById("date-now").innerHTML = "Date : " + datenow;
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
        // alert('Date: ' + event.target.value);
        var val = event.target.value;
        var tahun = val.substr(0, 4);
        var bulan = val.substr(5, 2) - 1;
        var tanggal = val.substr(8, 2);
        var datePick = new Date(tahun, bulan, tanggal);

        var dateToAdd = 7;

        datePick.setDate(datePick.getDate() + dateToAdd);
        document.getElementById("tgl_kembali").value = datePick.format("yy-m-d");
        document.getElementById("btn-confirmPinjam").classList.remove("disabled");
    }

    handleSubmit(event) {

    }

    order = () => {
        document.getElementById("wait").style.display = "";
        setTimeout(function () {
            document.getElementById("wait").style.opacity = "0";
        }, 500);
        document.getElementById("data1").style.display = "none";
        document.getElementById("data2").style.display = "none";
        document.getElementById("foot-card").style.display = "none";
        document.getElementById("cartCount").innerHTML = "0";
        swal("Thank You", "Please wait for validation admin", "success");
    };

    deleteBtn = (id) => {
        Axios.delete("cart/" + id).then
            (() => {
                window.location.reload()
            })
    }

    render() {
        const mystyleBtn = {
            color: "white",
            cursor: 'pointer',
        };
        console.log(this.state.dataStatus)
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Cart</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="callout callout-info">
                                                    <h5>Profile Peminjam</h5>
                                                    <p>
                                                        Name : {this.state.fullName}
                                                    </p>
                                                    <p>
                                                        ID Number : {this.state.userCode}
                                                    </p>
                                                    <p id="date-now"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="text-center">Book List</h5>
                                        <div className="table-responsive">
                                            <table id="cartlist_table" className="table table-white" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>ID Book</th>
                                                        <th>Action</th>
                                                        <th>Title</th>
                                                        <th>Author</th>
                                                        <th>Cover</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.dataStatus.map((cart, i) => {
                                                        return (
                                                            <tr>
                                                                <td>{cart.dataCart.bookDetailsEntity.bookDetailCode}</td>
                                                                <td>
                                                                    <a id={"btn-data" + i} style={mystyleBtn} onClick={() => this.deleteBtn(cart.dataCart.id)} className="btn btn-sm btn-danger">
                                                                        <i className="fa fa-trash"></i>
                                                                    </a>
                                                                </td>
                                                                <td>{cart.dataCart.bookDetailsEntity.bookTitle}</td>
                                                                <td>{cart.detailbooks.authorEntity.authorName}</td>
                                                                <td className="text-center">
                                                                    <img height="100" src={cart.dataCart.bookDetailsEntity.cover} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div id="wait" className="pt-4"
                                        style={{ display: 'none', width: '69px', height: '89px', position: 'fixed', zIndex: 999, top: '50%', left: '50%', padding: '2px' }}>
                                        <img src="assets/images/demo_wait.gif" width="64" height="64" /><br />Loading..
                                    </div>
                                    <div className="card-footer" id="foot-card">
                                        <form action="" method="post">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Date Borrow</label>
                                                        <input required value={this.state.value} onChange={this.handleChange} id="tgl_pinjam"
                                                            type="date" name="tanggal_pinjam" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Tanggal Pengembalian</label>
                                                        <input readOnly id="tgl_kembali" type="date"
                                                            name="tanggal_kembali" className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="text-success">*Ajukan Peminjaman</label>
                                                        <a id="btn-confirmPinjam" style={mystyleBtn} onClick={() => this.order()} className="btn shadow disabled btn-sm btn-success btn-block">
                                                            Borrow
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        )
    }
}