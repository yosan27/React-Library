import React, { Component } from 'react';
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import swal from "sweetalert";

export default class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            data: [
                {
                    "id": "2017100251",
                    "title": "Selena",
                    "author": "Tere Liye",
                    "cover": "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg",
                },
                {
                    "id": "2017100244",
                    "title": "Nebula",
                    "author": "Tere Liye",
                    "cover": "https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg",
                }
            ]
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getTglNow()
        $(function () {
            $('#example').DataTable({
                responsive: true
            });
        });
    }

    async getTglNow() {
        var today = new Date();
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
        document.getElementById("tgl_pinjam").setAttribute("min", today);
        document.getElementById("date-now").innerHTML = "Date : " + today;
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
    
    deleteBtn(data) {
        document.getElementById("data"+data).style.display = "none";
        document.getElementById("cartCount").innerHTML = "1";
    }

    render() {
        const mystyleBtn = {
            color: "white",
            cursor: 'pointer',
        };

        const { data } = this.state

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
                                                        Name : User Baginda
                                                    </p>
                                                    <p>
                                                        ID Number : 123
                                                    </p>
                                                    <p id="date-now"></p>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="text-center">Book List</h5>
                                        <div className="table-responsive">
                                            <table id="example" className="table table-striped table-white"
                                                style={{ width: "100%" }}>
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
                                                    {
                                                        data.map((book, i) => {
                                                            return (
                                                                <tr id={"data" + i}>
                                                                    <td>{book.id}</td>
                                                                    <td>
                                                                        <a id={"btn-data" + i} style={mystyleBtn} onClick={() => this.deleteBtn(i)} className="btn btn-sm btn-danger">
                                                                            <i className="fa fa-trash"></i>
                                                                        </a>
                                                                    </td>
                                                                    <td>{book.title}</td>
                                                                    <td>{book.author}</td>
                                                                    <td className="text-center">
                                                                        <img height="100" src={book.cover} />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
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