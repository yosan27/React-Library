import React, { Component } from 'react';
import { Table, Modal, Button } from 'react-bootstrap';
import swal from "sweetalert";
//Datatable Modules
import 'datatables.net-dt/js/dataTables.dataTables'
import 'datatables.net-dt/css/jquery.dataTables.min.css'
import 'datatables.net-responsive-dt/js/responsive.dataTables.js'
import 'datatables.net-responsive-dt/css/responsive.dataTables.css'
import $ from 'jquery'; 
import API from "../../api";
 
class PublisherManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabledata: [],
      showAdd: false,
      showEdit: false,
      showDelete: false,
      publisherId: "",
      publisherName: "",
      publisherCode: "",
      address: ""
    };
  }

  async componentDidMount() {
    // DATA TABEL
    try {
      const res = await API.get(`/api/publisher/active`);
      const tabledata = res.data;
      this.setState({ tabledata: tabledata });
    } catch (error) {
      console.log(error);
    }

    $(function () {
      $('#publishermanagement').DataTable({
          responsive: true
      });
    });
    
  }

  //modal add
  handleShowAdd = () => {
    this.setState({ showAdd: true })
  }

  handleAddPublisher = (e) => {
    API.post(
      `api/publisher`,
      {
        publisherName: this.state.publisherName,
        address: this.state.address,
      },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        window.location.reload();
        swal("Success!", "Publisher Has Been Added", "success");
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }

  //button edit
  handleShowEdit = (pbid) => {
    this.setState({showEdit: true, publisherId : pbid})
    API.get(`/api/publisher/id/${pbid}`).then((res) => {
      let response = res.data;
      console.log(response)
      this.setState({
        publisherName: response.publisherName,
        address: response.address,
        publisherCode : response.publisherCode
      });
    });
    console.log("tes pbid : "+this.state.publisherId)
  };

  handleSaveEdit = () => {
    this.setState({ showEdit: false })
    API.put(
      `api/publisher/${this.state.publisherId}`,
      {
        publisherName: this.state.publisherName,
        address: this.state.address,
        publisherCode: this.state.publisherCode,
      },
        {
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        this.setState({ publisherId: "" })
        window.location.reload();
        swal("Great!", "Publisher Has Been edited", "success");
      })
      .catch((error) => {
        swal("Oops!", "Please try again", "error");
        console.log(error);
      });
  }

  //button delete
  handleShowDelete = (pbid) => {
    this.setState({showDelete: true, publisherId : pbid})
  }

  handleDelete = () => {
    this.setState({ showDelete: false });
    API.delete(`/api/publisher/${this.state.publisherId}`)
      .then(()=>window.location.reload())
    swal("Deleted!", "Publisher Is Successfully Deleted", "success");
  }

  //util
  handleCloseModal = () => {
    this.setState({ showAdd: false, showEdit: false, showDelete: false, publisherName: "",
    publisherCode: "", address: ""})
  }

  render() {
    const { showAdd, showEdit, showDelete, tabledata, disableSubmitting, publisherName, address } = this.state;
   
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
                        tabledata.map((pb, index) => {
                          return (
                              <tr key={index}>
                                <td>{pb.publisherCode}</td>
                                <td>
                                  <div class='d-flex justify-content-around mt-4' style={{ border: 'none' }}>
                                    <button class="btn btn-primary" data-toggle="modal" data-target="#edit" 
                                                  onClick={ ()=> {this.handleShowEdit(pb.id)}}><i
                                      class="fa fa-edit"></i></button>
                                    <button class="btn btn-danger" data-toggle="modal" data-target="#delete"
                                                  onClick={()=> this.handleShowDelete(pb.id)}><i
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
                            <form>
                              <div class="form-group row">
                                <label for="addPublisherName" class="col-sm-2 col-form-label">Publisher Name</label>
                                <div class="col-sm-10">
                                  <input 
                                  type="text" 
                                  name="publisherName"
                                  class="form-control" 
                                  id="addPublisherName" 
                                  placeholder="Name..." 
                                  onChange={(e) => this.setState({publisherName : e.target.value})}
                                  value={publisherName} 
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
                                  onChange={(e) => this.setState({address : e.target.value})}
                                  value={address} 
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
                            <form>
                              <div class="form-group row">
                                <label for="editPublisherName" class="col-sm-2 col-form-label">Publisher Name</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    class="form-control" 
                                    id="editPublisherName" 
                                    placeholder="Please input publisher" 
                                    value={publisherName} 
                                    onChange={(e) => this.setState({publisherName : e.target.value})}/>
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
                                    value={address} 
                                    onChange={(e) => this.setState({address : e.target.value})}/>
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