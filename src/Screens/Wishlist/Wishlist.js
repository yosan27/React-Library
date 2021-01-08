import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import axios from "axios";
import Axios from "../../Services/axios-instance";
import AuthService from "../../Services/auth.service";

export default class Wishlist extends Component {

    constructor() {
        super()
        this.state = {
            dataWish: [],
            dataStatus: [],
            bookCodeTemp: "",
            bookDetailCode: "",
            userCode: "",
        }
    }

    componentDidMount() {
        Axios.get("wishlist/usercode/" + AuthService.getUserCode()).then((e) => {
            this.setState({
                dataWish: e.data.data
            })
            console.log(e)
            this.state.dataWish.map((wish, i) => {
                Axios.get("book/detailcode/" + wish.bookDetailsEntity.bookDetailCode).then((resp) => {
                    // console.log(resp.data.data)
                    this.setState({
                        dataStatus: [...this.state.dataStatus, {
                            'datawish': wish,
                            'detailbooks': resp.data.data
                        }]
                    })
                    $(function () {
                        $('#wishlist_table').DataTable({
                            responsive: true
                        });
                    });
                }).catch(function (error) {
                    console.log(error);
                    $(function () {
                        $('#wishlist_table').DataTable({
                            responsive: true
                        });
                    });
                })
            })
            
        }).catch(function (error) {
            console.log(error);
            $(function () {
                $('#wishlist_table').DataTable({
                    responsive: true
                });
            });
        })

    }
    deleteBtn = (id) => {
        Axios.delete('wishlist/' + id).then
            (() => {
                window.location.reload()
            })
    }

    pinjamBtn = (id) => {
        Axios.get("wishlist/id/" + id).then((e) => {
            // console.log(e)
            const cartdto = {
                bookDetailsCode: e.data.bookDetailsEntity.bookDetailCode,
                userCode: e.data.userEntity.userCode
            }
            Axios.post('cart', cartdto)
                .then((response) => {
                    console.log(response);
                    this.deleteBtn(id)
                })
        }).catch(function (error) {
            console.log(error);
        })
    }

    render() {
        const mystyleBtn = {
            color: "white",
            cursor: 'pointer',
        };
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
                                                        <th>Cover</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.state.dataStatus.map((wish, i) => {
                                                        return (
                                                            <tr id={"data" + i}>
                                                                <td>{wish.datawish.bookDetailsEntity.bookDetailCode}</td>
                                                                <td>
                                                                    <Link to="/page/detailPage" className="btn shadow btn-sm btn-light">
                                                                        <i className="fa fa-info"></i>
                                                                    </Link>
                                                                    <a id={"btn-data" + i} onClick={() => this.deleteBtn(wish.datawish.id)} style={mystyleBtn}
                                                                        className="btn shadow btn-sm btn-danger"><i
                                                                            className="fa fa-trash"></i></a>
                                                                    <a id={"btn-pinjam" + i} onClick={() => this.pinjamBtn(wish.datawish.id)} style={mystyleBtn} className="btn shadow btn-sm btn-success">
                                                                        Borrow
                                                                    </a>
                                                                </td>
                                                                <td>{wish.datawish.bookDetailsEntity.bookTitle}</td>
                                                                <td>{wish.detailbooks.authorEntity.authorName}</td>
                                                                <td className="text-center">
                                                                    <img height="100" src={wish.datawish.bookDetailsEntity.cover} />
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}
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