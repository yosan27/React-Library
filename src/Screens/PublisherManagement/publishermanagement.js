import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
// import ReactFormInputValidation from "react-form-input-validation";
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import $ from 'jquery'; 
 
class PublisherManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:
        [
          {
            publisherID: "1",
            publisherCode: "BP1",
            publisherName: "Gramedia Pustaka",
            address: "Jalan jalan no 12"
          },
          {
            publisherID: "2",
            publisherCode: "BP2",
            publisherName: "Elex Media Komputindo",
            address: "Jalan jalan no 13"
          },
          {
            publisherID: "3",
            publisherCode: "BP3",
            publisherName: "Yudhistira",
            address: "Jalan jalan no 14"
          }
        ],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      fields: {
        publisherName: "",
        address: ""
      },
    };
  }

  componentDidMount(){
    $(function () {
      $('#publishermanagement').DataTable({
          responsive: true
      });
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    // const fields = {
    //   fields: this.state.fields
    // }
    // axios.post('', { fields })
    //   .then(res=>{
    //     console.log(res);
    //     console.log(res.data);
    //     window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    //   })
  }
  handleChange = event =>{
    this.setState({ fields: event.target.value});
  }

  handleSubmitEdit = event => {
    event.preventDefault();
    // const fields = {
    //   fields: this.state.fields
    // }
    // axios.post('', { fields })
    //   .then(res=>{
    //     console.log(res);
    //     console.log(res.data);
    //     window.location = "/retrieve" //This line of code will redirect you once the submission is succeed
    //   })
  }
  handleChangeEdit = event =>{
    this.setState({ fields: event.target.value});
  }

  handleAddPublisher = () => {
    this.setState({ showAdd: false })
    swal("Success!", "Publisher Has Been Added", "success");
  }

  handleCloseModal = () => {
    this.setState({ showAdd: false, showEdit: false, showDelete: false })
  }

  handleShowAdd = () => {
    this.setState({ showAdd: true })
  }

  handleSaveEdit = () => {
    this.setState({ showEdit: false })
    swal("Success!", "Your Data Is Updated", "success");
  }

  handleShowEdit = () => {
    this.setState({ showEdit: true })
  }

  handleDelete = () => {
    this.setState({ showDelete: false })
    swal("Deleted!", "Publisher Is Successfully Deleted", "success");
  }

  handleShowDelete = () => {
    this.setState({ showDelete: true })
  }

  

  render() {
    const { data, showAdd, showEdit, showDelete, fields, errors, disableSubmitting } = this.state;
   
    return (
      // page content
      <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
        <section className="mt-5 pt-5">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12 col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title">Publisher Management</h3>
                  </div>
                  <div className="card-body">
                    {/* title */}
                    <div class="">
                      <Button className="mb-5" variant="success" onClick={this.handleShowAdd}>
                        <i class="fa fa-plus"></i> Add Publisher
                      </Button>
                    </div>
                    {/* title */}

                    {/* publisher management table */}
                    <Table responsive striped id="publishermanagement" style={{ width: '100%' }}>
                      <thead>
                          <tr>
                            <th>Publisher Code</th>
                            <th>Action</th>
                            <th>Publisher Name</th>
                            <th>Address</th>
                          </tr>
                      </thead>
                      <tbody>
                      {
                        data.map((pb, index) => {
                          return (
                              <tr key={index}>
                                <td>{pb.publisherCode}</td>
                                <td>
                                  <div class='d-flex justify-content-around mt-4' style={{ border: 'none' }}>
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit" onClick={this.handleShowEdit}><i
                                      class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger" data-toggle="modal" data-target="#delete" onClick={this.handleShowDelete}><i
                                      class="fa fa-trash"></i></button>
                                  </div>
                                </td>
                                <td>{pb.publisherName}</td>
                                <td>{pb.address}</td>
                              </tr>
                          )
                        })
                      }
                      </tbody>
                    </Table>

                    {/* modal add */}
                    <Modal size="lg" show={showAdd} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Publisher Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form
                              onSubmit={this.handleSubmit}
                            >
                              <div class="form-group row">
                                <label for="addPublisherName" class="col-sm-2 col-form-label">Publisher Name</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="publisherName"
                                  class="form-control" 
                                  id="addPublisherName" 
                                  placeholder="Name..." 
                                  onChange={this.handleChange}
                                  value={fields.publisherName} 
                                  data-attribute-name="Name"
                                  data-async
                                  />
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addPublisherAddress" class="col-sm-2 col-form-label">Address</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="address"
                                  class="form-control" 
                                  id="addAddress" 
                                  placeholder="Address..." 
                                  onChange={this.handleChange}
                                  value={fields.address} 
                                  data-attribute-name="Address"
                                  data-async
                                  />
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                          <i class="fa fa-times-circle"></i> Close
                        </Button>
                        <Button id="buttonAddBook" disabled={disableSubmitting} type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddPublisher}>
                          <i class="fa fa-plus"></i> Add
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal add */}

                    {/* modal edit */}
                    <Modal show={showEdit} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Edit Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form onSubmit={this.handleSubmitEdit}>
                              <div class="form-group row">
                                <label for="editPublisherName" class="col-sm-2 col-form-label">Publisher Name</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    class="form-control" 
                                    id="editPublisherName" 
                                    placeholder="Please input publisher" 
                                    value='' 
                                    onChange={this.handleChangeEdit}/>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="editAddress" class="col-sm-2 col-form-label">Address</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    class="form-control" 
                                    id="editAddress" 
                                    placeholder="Please input address" 
                                    value='' 
                                    onChange={this.handleChangeEdit}/>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                          Cancel
                        </Button>
                        <Button className="btn btn-success" variant="primary" onClick={this.handleSaveEdit}>
                          Save
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal edit */}

                    {/* modal delete */}
                    <Modal show={showDelete} onHide={this.handleCloseModal}>
                      <Modal.Header closeButton>
                        <Modal.Title>Delete Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <p>Are you sure you want to delete publisher data?</p>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseModal}>
                          Close
                        </Button>
                        <Button className="btn btn-warning" variant="primary" onClick={this.handleDelete}>
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal delete */}
                  </div>
                </div>
              </div>
            </div>
          </div >
        </section >
      </div >
    );
  }
}

export default PublisherManagement;