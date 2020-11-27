import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'
import { Modal, Button } from 'react-bootstrap';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import swal from 'sweetalert';


class UserManagement extends Component {
    constructor(){
        super()
        this.state = {
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
        $(document).ready(function () {
            $('.table').DataTable();
        });

        $('.img-card').hover(makeBigger, returnToOriginalSize);
        function makeBigger() {
            $(this).css({width: '+=30%'});
        }
        function returnToOriginalSize() {
            $(this).css({width: "-=30%"});
        }

    }

    render(){
        const { data, showSuspend} = this.state;

        return(
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">User Management</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="history" className="table table-striped table-white table-bordered dt-responsive nowrap" style={{ width: '100%' }}>
                                                <thead className='thead-dark'>
                                                    <tr>
                                                        <th>ID</th>
                                                        <th>Username</th>
                                                        <th>Name</th>
                                                        <th>Email Addres</th>
                                                        <th>Status</th>
                                                        <th>Identification Card</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map(user => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.id}</td>
                                                                    <td>{user.username}</td>
                                                                    <td>{user.fullname}</td>
                                                                    <td>{user.email}</td>
                                                                    <td>{user.status}</td>
                                                                    <td className="text-center"><Image className='photoOfOrder text-center img-card' key={user.id} src={user.card} wrapped ui={false} style={{width:'40%',height:'auto'}} /></td>
                                                                    <td>
                                                                        <span className="d-flex justify-content-center" data-toggle="tooltip" title="suspend">
                                                                            <button className="btn btn-danger" data-toggle="modal" data-target="#detail" onClick={this.handleShowSuspend}><i className="fas fa-stopwatch">Suspend</i></button>
                                                                        </span>
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
            </div >
        )

    }
}

export default UserManagement;