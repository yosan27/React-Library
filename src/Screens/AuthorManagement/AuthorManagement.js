import React, { Component } from 'react'
import swal from 'sweetalert'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

class AuthorManagement extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { "authorCode": "BA001", "authorName": "Andrea Hirata" },
                { "authorCode": "BA002", "authorName": "Leila S. Chudori" },
                { "authorCode": "BA003", "authorName": "Pramoedya Ananta Toer" },
                { "authorCode": "BA004", "authorName": "Raditya Dika" },
                { "authorCode": "BA005", "authorName": "Tere Liye" }
            ]
        }
    }

    componentDidMount() {
        $(function () {
            $('#manageAuthor').DataTable({
                responsive: true
            });
        });
    }

    alertAdd = () => {
        swal("Success!", "Author Data Has Been Added", "success");
        this.clearAddModal();
    }

    alertEdit = () => {
        swal("Success!", "Author Data Is Updated", "success");
        this.clearEditModal();
    }

    alertDelete = () => {
        swal("Deleted!", "Author Data Is Successfully Deleted", "success");
    }

    clearAddModal = () => {
        document.getElementById('addAuthorCode').value='';
        document.getElementById('addAuthorName').value='';
    }

    clearEditModal = () => {
        document.getElementById('editAuthorName').value='';
    }

    render() {
        const { data } = this.state
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Author Management</h3>
                                    </div>
                                    <div className="card-body">
                                        <button className="btn btn-success mb-5" data-toggle="modal" data-target="#add">
                                            <i className="fa fa-plus"></i> Add Author
                                        </button>
                                        <table id="manageAuthor" className="table table-striped" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>Author Code</th>
                                                    <th>Action</th>
                                                    <th>Author Name</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    data.map((author, index ) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{author.authorCode}</td>
                                                                <td>
                                                                    <div className="btn-group" role="group">
                                                                        <button className="btn btn-primary btn-sm rounded-sm mr-1" data-toggle="modal" data-target="#edit" style={{ width: '30px' }}>
                                                                            <i className="fa fa-edit"></i>
                                                                        </button>
                                                                        <button className="btn btn-danger btn-sm rounded-sm" data-toggle="modal" data-target="#delete" style={{ width: '30px' }}>
                                                                            <i className="fa fa-trash"></i>
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td>{author.authorName}</td>
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
                    </div >
                </section >

                {/* MODAL ADD */}
                <div className="modal fade" id="add" tabIndex="-1" aria-labelledby="addLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addLabel">Add Author</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="addAuthorCode" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="addAuthorName" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearAddModal}>Cancel</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.alertAdd}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL EDIT */}
                <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="editLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editLabel">Edit Author</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Code</label>
                                        <div className="col-sm-9">
                                            <input type="text" readOnly className="form-control" id="editAuthorCode" value="BA001" disabled />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Name</label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control" id="editAuthorName" value="Author" />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearEditModal}>Cancel</button>
                                <button type="button" className="btn btn-success" data-dismiss="modal" onClick={this.alertEdit}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL DELETE */}
                <div className="modal fade" id="delete" tabIndex="-1" aria-labelledby="deleteLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="deleteLabel">Delete Author</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete author data?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={this.alertDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default AuthorManagement