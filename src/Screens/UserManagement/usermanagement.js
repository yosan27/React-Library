import React, { Component } from 'react'
import axios from "axios";
import Image from 'react-bootstrap/Image'
import { Modal, Button, Card, Table, Form, Row, Col, Badge } from 'react-bootstrap';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import swal from 'sweetalert';


class UserManagement extends Component {
    constructor(){
        super()
        this.state = {
            userList: [],
            id:"",
            userName:"",
            fullName:"",
            email:"",
            status:"",
            address:"",

            data: [
                {"id":"1", "username":"Yosan27", "fullname":"Yosan Fandi", "email":"yosan27@gmail.com", "status":"Active", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
                {"id":"2", "username":"Cleo", "fullname":"Cleoputra", "email":"cleo@gmail.com", "status":"Active", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
                {"id":"3", "username":"Todi", "fullname":"Todi Dewaranto", "email":"todi@gmail.com", "status":"Active", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
            ]
        }
    }

    handleShowSuspend = () => {
        this.setState({ showSuspend: true })
    }

    handleCloseSuspend = () => {
        this.setState({ showSuspend: false})
    }

    handleShowCard = () => {
        this.setState({ showCard: true})
    }

    handleCloseCard = () => {
        this.setState({ showCard: false})
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
                this.setState({
                    data: [
                        {"id":"1", "username":"Yosan27", "fullname":"Yosan Fandi", "email":"yosan27@gmail.com", "status":"Suspended", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
                        {"id":"2", "username":"Cleo", "fullname":"Cleoputra", "email":"cleo@gmail.com", "status":"Active", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
                        {"id":"3", "username":"Todi", "fullname":"Todi Dewaranto", "email":"todi@gmail.com", "status":"Active", "card":"https://img.favpng.com/6/1/21/identity-document-forgery-photo-identification-card-printer-badge-png-favpng-8UsS80yZfinYqa89SWnF75YPb.jpg"},
                    ],
                 showSuspend: false   
                 })
            } else {
                swal('User will not be suspended!');
            }
        })
        
    };

    componentDidMount() {
       

        $('.img-card').hover(makeBigger, returnToOriginalSize);
        function makeBigger() {
            $(this).css({width: '+=30%'});
        }
        function returnToOriginalSize() {
            $(this).css({width: "-=30%"});
        }

        axios.get("http://localhost:8500/api/user").then((e) => {
            this.setState({ userList: e.data });

            $(function () {
                $('#historyUser').DataTable({
                    responsive: true
                });
              });
        })}

    getById(id) {
        axios.get(`http://localhost:8500/api/user-by-id/${id}`).then((res) =>{
            this.setState({
                userName: res.data.userName,
                fullName: res.data.fullName,
                address: res.data.address,
                phone: res.data.phone,
                status: res.data.status
            })
        })
    }

    setStatus(status) {
        if(status === 1) {
            return <span>Active</span>
        } else if(status === 2) {
            return <span>Suspend</span>
        } else if(status === 0) {
            return <span>Delete</span>
        } 
    }

    render(){
        const { data, showSuspend, showCard} = this.state;

        return(
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
                                                                        <Button variant="danger" size="sm" data-toggle="modal" data-target="#detail" onClick={this.handleShowSuspend}>
                                                                            <i className="fa fa-gavel"></i>
                                                                        </Button>
                                                                        </span>
                                                                    </td>
                                                                    <td>{user.userName}</td>
                                                                    <td>{user.fullName}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{this.setStatus(user.status)}</td>
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
            <Modal size="lg" show={showSuspend} onHide={this.handleCloseSuspend}>
                <Modal.Header closeButton>
                    <Modal.Title> User Suspend </Modal.Title>                                     
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='modal-body'>
                        <p>Are you sure this person will get suspend ?</p>
                        <div class="form-group">
                        <label for="exampleFormControlSelect1">How many weeks ?</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>
                        </div>                       
                        </div>
                    </div>                                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-primary" variant="primary" onClick={this.suspend}>
                            <i class="fa fa-stopwatch"></i> Save Changes
                    </Button> 
                    <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseSuspend}>
                            <i class="fa fa-times-circle"></i> Close
                    </Button> 
                </Modal.Footer>
            </Modal>                                         
             {/* modal suspend */}
             {/* modal iden card */}
            <Modal size="lg" show={showCard} onHide={this.handleCloseCard}>
                <Modal.Header closeButton>
                    <Modal.Title> Identification Card </Modal.Title>                                     
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='modal-body'>
                            
                            
                        <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                <Image className='photoOfOrder text-center img-card card-img-top' src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png' wrapped ui={false} style={{width:'100%',height:'auto'}} />                                    
                                </div>
                                <div class="col-md-8">
                                { this.state.userList.map((usr) => {
                                    return(
                                    <div class="card-body">
                                        <h5 class="card-title">{usr.userName}</h5>
                                        <div class="form-group">
                                            <div>
                                            <p>Full Name: {usr.fullName}</p>
                                            <p>Address: {usr.address}</p>
                                            <p>Phone: {usr.phone}</p>
                                            <p class="card-text"><small class="text-muted">{this.setStatus(usr.status)}</small></p>
                                            </div>
                                        </div>  
                                    </div>
                                    )
                                    })
                                }
                                </div>
                            </div>
                        </div>
                            
                        </div>
                    </div>                                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseCard}>
                            <i class="fa fa-times-circle"></i> Close
                    </Button> 
                </Modal.Footer>
            </Modal>                                         
             {/* modal iden card */}   
             {/* MODAL iden */}
             <div className="modal fade" id="card" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <div class="card mb-3">
                            <div class="row no-gutters">
                                <div class="col-md-4">
                                <Image className='photoOfOrder text-center img-card card-img-top' src='https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png' wrapped ui={false} style={{width:'100%',height:'auto'}} />                                    
                                </div>
                                <div class="col-md-8">
                                    <div class="card-body">
                                        <h5 class="card-title"><input type="text" readOnly className="form-control-plaintext" value={this.state.userName} />           
                            </h5>
                                        <div class="form-group">
                                            <div>
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.fullName} />
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.address} />           
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.phone} />           
                                            <input type="text" readOnly className="form-control-plaintext" value={this.state.description} />           
                            
                                            
                                            <p class="card-text"><small class="text-muted">{this.setStatus(this.state.status)}</small></p>
                                            </div>
                                        </div>  
                                    </div>
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
            </div >
        )

    }
}

export default UserManagement;