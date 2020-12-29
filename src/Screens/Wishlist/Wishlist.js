import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

export default class Wishlist extends Component {

    constructor() {
        super()
        this.state = {
            data: [
                {
                    "id": "2017100251",
                    "title": "Selena",
                    "author": "Tere Liye",
                    "cover": "https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg",
                    "status": "2"
                },
                {
                    "id": "2017100244",
                    "title": "Nebula",
                    "author": "Tere Liye",
                    "cover": "https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg",
                    "status": "1"
                }
            ],
        }
    }

    componentDidMount() {
        $(function () {
            $('#wishlist_table').DataTable({
                responsive: true
            });
        });
    }
    deleteBtn(data) {
        document.getElementById("data"+data).style.display = "none";
    }
    pinjamBtn(data) {
        document.getElementById("data"+data).style.display = "none";
        document.getElementById("cartCount").innerHTML = "3";
    };

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
                                        <h3 className="card-title">Wishlist</h3>
                                    </div>
                                    <div className="card-body pb-5">
                                        <h5 className="text-center">Book List</h5>
                                        <div className="table-responsive">
                                            <table id="wishlist_table" className="table table-white" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>ID Book</th>
                                                        <th>Action</th>
                                                        <th>Title</th>
                                                        <th>Author</th>
                                                        <th>Status</th>
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
                                                                        <Link to="/page/detailPage" className="btn shadow btn-sm btn-light">
                                                                            <i className="fa fa-info"></i>
                                                                        </Link>
                                                                        <a id={"btn-data" + i} onClick={() => this.deleteBtn(i)} style={mystyleBtn}
                                                                            className="btn shadow btn-sm btn-danger"><i
                                                                                className="fa fa-trash"></i></a>
                                                                        {(() => {
                                                                            if (book.status == 1) {
                                                                                return (
                                                                                    <a id={"btn-pinjam" + i} onClick={() => this.pinjamBtn(i)} style={mystyleBtn} className="btn shadow btn-sm btn-success">
                                                                                        Borrow
                                                                                    </a>
                                                                                )
                                                                            }
                                                                            return null;
                                                                        })()}

                                                                    </td>
                                                                    <td>{book.title}</td>
                                                                    <td>{book.author}</td>
                                                                    <td>
                                                                        <span className={book.status == 1 ? "badge badge-success" : "badge badge-danger"}>
                                                                            {book.status == 1 ? "Available for Borrow" : "Can't Borrow"}
                                                                        </span>
                                                                    </td>
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
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        )
    }
}