import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import './donation-styles.css'

class DonationForm extends Component {

    render() {
        return (
            <div class="right_col" role="main">
                <div class="container history">
                    <h3 class="">Donation</h3>
                </div>
                <div class="container-fluid" id="demo">
                    <div class="row justify-content-md-center">
                        <img src="assets/images/donation3.png" class="img-thumbnail" alt="" />
                    </div>
                    <div class="row justify-content-md-center">
                        <form>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Title Book</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Bumi Manusia" />
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Category</label>
                                <select class="form-control" id="exampleFormControlSelect1">
                                    <option>Romance</option>
                                    <option>History</option>
                                    <option>Fiction</option>
                                    <option>Novel</option>
                                    <option>Education</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlInput1">Year</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="2020" />
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlInput1">Author</label>
                                <input type="text" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Pramodya A. Toer" />
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlTextarea1">Condition</label>
                                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>

                            <div class="form-group">
                                <label for="exampleFormControlInput1">Photo Book</label>
                                <input class="form-control" type="file" id="avatar" name="avatar"
                                    accept="image/png, image/jpeg" />
                            </div>
                        </form>
                    </div>
                    <br /><br />
                    <div class="row justify-content-md-center">
                        <div class="col-lg-2">
                            <button type="button" class="btn btn-outline-info" data-toggle="modal"
                                data-target="#deleteSuccessModal" data-dismiss="modal">Submit</button>
                        </div>
                    </div>
                </div>
                // modal
                <div class="modal fade" id="deleteSuccessModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body text-center">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <i class="fa fa-check-circle mb-2" ></i>
                                <p>Buku donasi berhasil diterima!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}

export default withRouter(DonationForm);