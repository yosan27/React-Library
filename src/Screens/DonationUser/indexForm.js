import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import swal from 'sweetalert'
import './donation-styles.css'

class DonationForm extends Component {
    submitClick = () => {
        swal("Thank You", "Book Donation Successfully Received", "success");
    }

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
                            <button type="button" class="btn btn-outline-info" onClick={() => this.submitClick()}>Submit</button>
                        </div>
                    </div>
                </div>
                </div>


        )
    }
}

export default withRouter(DonationForm);