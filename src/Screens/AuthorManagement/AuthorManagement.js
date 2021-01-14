import React, { Component } from 'react'
import swal from 'sweetalert'
import Axios from '../../Services/axios-instance'

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
            authorName: '',
            buttonClick: false,
            button: 'Add'
        }
    }

    componentDidMount() {
        this.getAll()
        document.addEventListener('click', this.clearModal);
    }

    componentDidUpdate() {
        if(this.state.buttonClick === true) {
            Axios.get('author/active').then((res) => {
                this.setState({
                    author: res.data,
                    buttonClick: false
                })
            }).catch(function(error){
                swal("Failed!", error.response.data.message, "error");
            })
        }
    }

    getAll() {
        Axios.get('author/active').then((res) => {
            this.setState({ author: res.data })

            $(function () {
                $('#manageAuthor').DataTable({
                    responsive: true
                })
            })
        }).catch(function(error){
            swal("Failed!", error.response.data.message, "error");
        })
    }

    getById(getId) {
        Axios.get(`author/id/${getId}`).then((res) => {
            this.setState({
                id: res.data.id,
                authorCode: res.data.authorCode,
                authorName: res.data.authorName
            })
        }).catch(function(error){
            swal("Failed!", error.response.data.message, "error");
        })
    }

    handleChange = (e) => {
        this.setState({ authorName: e.target.value })
    }

    addOrEdit = (e) => {
        e.preventDefault();
        let author = { authorName: this.state.authorName }

        if (this.state.button === 'Add') {
            Axios.post('author', author).then((response) => {
                swal("Success!", response.data.message, "success").then(() => {
                    window.location.reload()
                })
            }).catch(function (error) {
                swal("Failed!", error.response.data.message, "error")
            })
        } else {
            Axios.put(`author/${this.state.id}`, author).then((response) => {
                swal("Success!", response.data.message, "success")
            }).catch(function (error) {
                swal("Failed!", error.response.data.message, "error")
            })
        }
    }

    deleteAuthor = (id) => {
        Axios.delete(`author/${id}`).then(() => {
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this data!",
                icon: "warning",
                buttons: true,
                dangerMode: true
            }).then((willDelete) => {
                if (willDelete) {
                    swal("Deleted!", "Author Data Is Delete", "success").then(() => {
                        this.setState({ buttonClick: true })
                        window.location.reload()
                    })
                } else {
                    swal("Canceled!", "Author Data Is Safe", "error")
                }
            }).catch(function(error){
                swal("Failed!", error.response.data.message, "error");
            })
        })
    }
    
    setButton(getId) {
        if (this.state.button === 'Add') {
            this.setState({ button: 'Update' })
            this.getById(getId)
        }
    }

    clearModal = (e) => {
        if (e.target.className === "modal fade" || e.target.className === "modal-clear" || e.target.className === "btn btn-secondary modal-clear" || e.target.className === "btn btn-success addOrEdit") {
            this.setState({
                authorCode: '',
                authorName: '',
                button: 'Add'
            })
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
                                        <button className="btn btn-success mb-5" data-toggle="modal" data-target="#addOrEdit">
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
                                                author.map((author, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{author.authorCode}</td>
                                                            <td>
                                                                <div className="btn-group" role="group">
                                                                    <button className="btn btn-primary btn-sm rounded-sm w-30 mr-1" data-toggle="modal" data-target="#addOrEdit" onClick={() => this.setButton(author.id)}>
                                                                        <i className="fa fa-edit"></i>
                                                                    </button>
                                                                    <button className="btn btn-danger btn-sm rounded-sm w-30" onClick={() => this.deleteAuthor(author.id)}>
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

                {/* MODAL ADD OR EDIT */}
                <div className="modal fade" id="addOrEdit" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Author Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="modal-clear">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label">Author Name</label>
                                        <div className="col-sm-9">
                                            <input className="form-control" name="authorName" placeholder="Enter Author Name"
                                                value={this.state.authorName} onChange={this.handleChange} />
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary modal-clear" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-success addOrEdit" data-dismiss="modal" disabled={!this.state.authorName} onClick={this.addOrEdit}>{this.state.button}</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div >
        )
    }
}

export default AuthorManagement