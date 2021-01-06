import React, { Component } from 'react'
import axios from 'axios'
import swal from 'sweetalert'

import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'

class AuthorManagement extends Component {
    constructor(props) {
        super(props)
        this.state = {
            author: [],
            id: '',
            authorCode: '',
            authorName: ''
        }
        // this.changeAuthorNameHandler = this.changeAuthorNameHandler.bind(this)
        // this.insertAuthor = this.insertAuthor.bind(this)
        // this.updateAuthor = this.updateAuthor.bind(this)
        // this.deleteAuthor = this.deleteAuthor.bind(this)
    }

    componentDidMount() {
        this.getAll()
        document.addEventListener('click', this.clearModal);
    }

    getAll() {
        axios.get('http://localhost:8500/api/author/active').then((res) => {
            this.setState({ author: res.data })

            $(function () {
                $('#manageAuthor').DataTable({
                    responsive: true
                })
            })
        })
    }

    getById(getId) {
        axios.get(`http://localhost:8500/api/author/id/${getId}`).then((res) => {
            this.setState({
                id: res.data.id,
                authorCode: res.data.authorCode,
                authorName: res.data.authorName
            })
        })
    }

    changeAuthorNameHandler = (e) => {
        this.setState({authorName: e.target.value})
    }

    insertAuthor = (e) => {
        e.preventDefault();
        let author = { authorName: this.state.authorName }
        axios.post('http://localhost:8500/api/author', author).then(() => {
            this.alertAdd()
        })
    }

    updateAuthor = (e) => {
        e.preventDefault();
        let author = { authorName: this.state.authorName }
        axios.put(`http://localhost:8500/api/author/${this.state.id}`, author).then((e) => {
            this.alertEdit()
        })
    }

    deleteAuthor = () => {
        axios.delete(`http://localhost:8500/api/author/${this.state.id}`).then(() => {
            this.alertDelete()
        })
    }

    alertAdd = () => {
        swal("Success!", "Author Data Has Been Added", "success").then(() => {
            window.location.reload()
        })
    }

    alertEdit = () => {
        swal("Success!", "Author Data Is Updated", "success").then(() => {
            window.location.reload()
        })
    }

    alertDelete = () => {
        swal("Deleted!", "Author Data Is Successfully Deleted", "success").then(() => {
            window.location.reload()
        })
    }

    clearModal = (e) => {
        // console.log(e.target.className)
        if (e.target.className === "modal fade" || e.target.className === "modal-clear" || e.target.className === "btn btn-secondary modal-clear") {
            document.getElementById('authorName').value = ''
        }
    }

    render() {
        const { author } = this.state
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
                                                author.map((author, index ) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{author.authorCode}</td>
                                                            <td>
                                                                <div className="btn-group" role="group">
                                                                    <button className="btn btn-primary btn-sm rounded-sm w-30 mr-1" data-toggle="modal" data-target="#edit" onClick={() => this.getById(author.id)}>
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                    <button className="btn btn-danger btn-sm rounded-sm w-30" data-toggle="modal" data-target="#delete" onClick={() => this.getById(author.id)}>
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
                                    <span aria-hidden="true" className="modal-clear">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Code</label>
                                        <div className="col-sm-9">
                                            <input className="form-control input" name="authorCode" readOnly disabled />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Name</label>
                                        <div className="col-sm-9">
                                            <input className="form-control input" name="authorName" id="authorName" placeholder="Enter Author Name"
                                                onChange={this.changeAuthorNameHandler} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary modal-clear" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-success" data-dismiss="modal" onClick={this.insertAuthor}>Add</button>
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
                                            <input className="form-control input" name="authorCode" readOnly disabled
                                                value={this.state.authorCode} />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Name</label>
                                        <div className="col-sm-9">
                                            <input className="form-control input" name="authorName"
                                                value={this.state.authorName} onChange={this.changeAuthorNameHandler} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-success" data-dismiss="modal" onClick={this.updateAuthor}>Update</button>
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
                                <button className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-warning" data-dismiss="modal" onClick={() => this.deleteAuthor()}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default AuthorManagement