import React, { Component } from 'react'
import axios from "../../Services/axios-instance";
import Image from 'react-bootstrap/Image'
import { Modal, Button, Card, Table, Form, Row, Col, Badge } from 'react-bootstrap';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';
import swal from 'sweetalert';
import Moment from 'react-moment';
import AuthService from "../../Services/auth.service";
//css
import "./usermanagement.css"


class UserManagement extends Component {
    constructor() {
        super()
        this.state = {
            userList: [],
            id: "",
            userName: "",
            fullName: "",
            email: "",
            status: "",
            address: "",
            profilePict: AuthService.API_URL() + "getFile/user.png",
            unsuspenDate: "",
        }
    }

    suspend = () => {
        swal({
            title: "Are you sure?",
            text: "Once suspended, you will not be able to undo the action!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((Delete) => {
                if (Delete) {
                    swal('User will be suspended!', {
                        icon: "success",
                    })
                } else {
                    swal('User will not be suspended!');
                }
            })

    };

    alertEdit = () => {
        swal("Success!", "User has been suspended", "success").then(() => {
            window.location.reload()
        })
    }

    changeStatusHandler = (e) => {
        this.setState({status: e.target.value})
    }

    componentDidMount() {
        $('.img-card').hover(makeBigger, returnToOriginalSize);
        function makeBigger() {
            $(this).css({ width: '+=30%', paddingRight: '20%'});
        }
        function returnToOriginalSize() {
            $(this).css({ width: "-=30%" });
        }

        axios.get('user').then((e) => {
            this.setState({ userList: e.data });

            $(function () {
                $('#historyUser').DataTable({
                    responsive: true
                });
            });
        })
    }

    getById(id) {
        axios.get(`user/id-all/${id}`).then((res) => {
            this.setState({
                id: res.data.id,
                userName: res.data.userName,
                fullName: res.data.fullName,
                address: res.data.address,
                email: res.data.email,
                phone: res.data.phone,
                status: res.data.status,
                profilePict: AuthService.API_URL() + "getFile/" + res.data.profilePict,
            });
        })
    }

    updateSuspend = (e) => {
        let status = {
            status: this.state.status
        }
        axios.put(`user/suspendate/${this.state.id}`, status).then((e) => {
            this.alertEdit()
        })
    }

    updateUnsuspend = (e) => {
        let status = {}
        axios.put(`user/unsuspendate/${this.state.id}`, status).then((e) => {
            swal("Success!", "User has been unsuspended", "success").then(() => {
                window.location.reload()
            })
        })
    }


    setStatus(status) {
        if (status === 1) {
            return <span>Active</span>
        } else if (status === 2) {
            return <span>Suspend</span>
        } else if (status === 0) {
            return <span>Delete</span>
        }
    }

    render() {
        const { data, showSuspend, showCard } = this.state;

        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <Card>
                                    <Card.Header>
                                        <h3>User Management</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive striped id="historyUser" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Action</th>
                                                    <th>Username</th>
                                                    <th>Name</th>
                                                    <th>Email Addres</th>
                                                    <th>Status</th>
                                                    <th>Unsuspend Date</th>
                                                    <th>Identification Card</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                    {
                                                        this.state.userList.map((user) => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.id}</td>
                                                                    <td>
                                                                        <span className="d-flex justify-content-center" data-toggle="tooltip" title="suspend">
                                                                        <button className="btn btn-danger btn-sm rounded-sm w-30 mr-1" data-toggle="modal" data-target="#suspend" onClick={() => this.getById(user.id)}>
                                                                        <i className="fa fa-gavel"></i>
                                                                        </button>
                                                                        <button className="btn btn-success btn-sm rounded-sm w-30 mr-1" data-toggle="modal" data-target="#unsuspend" onClick={() => this.getById(user.id)}>
                                                                        <i className="fa fa-check"></i>
                                                                        </button>
                                                                        </span>
                                                                    </td>
                                                                    <td>{user.userName}</td>
                                                                    <td>{user.fullName}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{this.setStatus(user.status)}</td>
                                                                    <td>
                                                                    <Moment format="DD/MM/YYYY">
                                                                    {user.unsuspendDate}
                                                                    </Moment>
                                                                    </td>
                                                                    <td className="text-center">
                                                                    <span className="d-flex justify-content-center" data-toggle="tooltip" title="card">
                                                                        <Button variant="primary" size="sm" data-toggle="modal" data-target="#card" onClick={() => this.getById(user.id)}>
                                                                            <i className="fa fa-credit-card"></i>
                                                                        </Button>
                                                                    </span>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div >
                </section >
    
            {/* modal suspend */}                                        
            <div className="modal fade" id="suspend" tabIndex="-1" aria-labelledby="addLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addLabel">User Suspend</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" className="modal-clear">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                <input type="hidden" readOnly className="form-control-plaintext" value={this.state.id} />      
                                <p>Are you sure this person will get suspend ?</p>
                                <div class="form-group">
                                <label for="exampleFormControlSelect1">How many weeks ?</label>
                                <select class="form-control" name="suspend" id="" value={this.state.status} onChange={this.changeStatusHandler}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                </select>
                                </div>   
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-secondary modal-clear" data-dismiss="modal">Cancel</button>
                                <button className="btn btn-success" data-dismiss="modal" onClick={this.updateSuspend}>Suspend</button>
                            </div>
                        </div>
                    </div>
            </div>
             {/* modal suspend*/}
            {/* modal unsuspend */}                                        
                <div className="modal fade" id="unsuspend" tabIndex="-1" aria-labelledby="addLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="addLabel">User Suspend</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">                                        <span aria-hidden="true" className="modal-clear">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                    <input type="hidden" readOnly className="form-control-plaintext" value={this.state.id} />      
                                    <p>Are you sure this person will get unsuspend ?</p>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-secondary modal-clear" data-dismiss="modal">Cancel</button>
                                    <button className="btn btn-success" data-dismiss="modal" onClick={this.updateUnsuspend}>Suspend</button>
                                </div>
                        </div>
                    </div>
                </div>
            {/* modal unsuspend*/}                                  

             {/* modal iden */}
             <div className="modal fade" id="card" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Kartu Identitas Perpus</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="card mb-3">
                                    <div class="row no-gutters">
                                        <h3 class="judulKartu"> Faraday E-Library </h3>
                                    </div>
                                    <div class="row no-gutters">
                                        <div class="col-md-8">
                                            <div class="card-body">
                                                <h5 class="card-title"><input type="text" readOnly className="form-control-plaintext" value={this.state.userName} />
                                                </h5>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <label for="fullName" class="col-sm-4 col-form-label"> FullName: </label>
                                                        <div class="col-sm-6">
                                                        <input type="text" readOnly className="form-control-plaintext" id="fullName" value={this.state.fullName} />
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <label for="fullName" class="col-sm-3 col-form-label"> Email: </label>
                                                        <div class="col-sm-6">
                                                        <input type="text" readOnly className="form-control-plaintext" id="email" value={this.state.email} />
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <label for="fullName" class="col-sm-3 col-form-label"> Address: </label>
                                                        <div class="col-sm-6">
                                                        <input type="text" readOnly className="form-control-plaintext" id="address" value={this.state.address} />
                                                        </div>
                                                    </div>
                                                    <div class="row">
                                                        <label for="fullName" class="col-sm-3 col-form-label"> Phone: </label>
                                                        <div class="col-sm-6">
                                                        <input type="text" readOnly className="form-control-plaintext" id="phone" value={this.state.phone} />
                                                        </div>
                                                    </div>
                                                        
                                                      
                                                        <p class="card-text"><small class="text-muted">{this.setStatus(this.state.status)}</small></p>
                                                 
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <Image className='photoOfOrder text-center img-card card-img-top' src={this.state.profilePict} wrapped ui={false} style={{ width: '100%', height: 'auto', paddingRight: '5%'}} />
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                {/* modal iden */}
            </div >
        )

    }
}

export default UserManagement;