import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert'
import './donation-styles.css'
import axios from "../../Services/axios-instance";
import Select from 'react-select';

class DonationForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryList: [],
            bookTitle: '',
            author: '',
            category: '',
            year: '',
            description: '',
            photo: '',
            categoryName: '',
            categoryCode: '',
            button: 'Submit'
        }
    }

    async getCategory() {
        const res = await axios.get('category')
        const data = res.data

        const options = data.map(d => ({
            "value": d.categoryCode,
            "label": d.categoryName

        }))

        this.setState({ categoryList: options })

    }

    handleChange = (event) => {
        if (event.target.name === "bookTitle") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

        if (event.target.name === "author") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

        if (event.target.name === "year") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

        if (event.target.name === "description") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

        if (event.target.name === "photo") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

    };

    handleChangeCategory = (e) => {
        this.setState({ categoryCode: e.value });
    }


    addDonation = () => {
        let donation = {
            bookTitle: this.state.bookTitle,
            author: this.state.author,
            year: this.state.year,
            photo: this.state.photo,
            description: this.state.description,
            categoryCode: this.state.categoryCode
        };

        axios.post("donation", donation)
            .then(() =>
                swal("Success!", "Donation Form Has Been Added", "success")
                    .then(window.location.reload()));

    }

    submitClick = () => {
        swal("Thank You", "Book Donation Successfully Received", "success");
    }

    componentDidMount() {
        this.getCategory();
    }

    render() {
        console.log(this.state.categoryList);
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
                            <div className>
                                <label for="exampleFormControlInput1">Title Book</label>
                                <input type="text" class="form-control" name="bookTitle" value={this.state.bookTitle} onChange={(e) => this.handleChange(e, e.target.value)}
                                    placeholder="Bumi Manusia" />
                                <small className="text-danger">
                                    {this.state.bookTitle.length < 1 ? '- Please insert the book title -' : ""}
                                </small>
                            </div>
                            <div className >
                                <label for="exampleFormControlInput1">Category</label>
                                <Select name="category" options={this.state.categoryList} onChange={this.handleChangeCategory} />
                            </div>
                            <div>
                                <label for="exampleFormControlInput1">Year</label>
                                <input type="text" name="year" class="form-control" id="exampleFormControlInput1"
                                    placeholder="2020" value={this.state.year} onChange={(e) => this.handleChange(e, e.target.value)} />
                                <small className="text-danger">
                                    {this.state.year.length < 4 ? '- Please insert year of the book -' : ""}
                                </small>
                            </div>

                            <div>
                                <label for="exampleFormControlInput1">Author</label>
                                <input type="text" name="author" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Pramodya A. Toer" value={this.state.author} onChange={(e) => this.handleChange(e, e.target.value)} />
                                <small className="text-danger">
                                    {this.state.author.length < 1 ? '- Please insert author of this book -' : ""}
                                </small>
                            </div>

                            <div className="form-group">
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.description} onChange={(e) => this.handleChange(e, e.target.value)}></textarea>
                                <small className="text-danger">
                                    {this.state.description.length < 10 ? '- Please insert description and condition of this book -' : ""}
                                </small>
                            </div>

                            <div>
                                <label for="exampleFormControlInput1">Photo Book</label>
                                <input class="form-control" type="text" id="avatar" name="photo"
                                    value={this.state.photo} onChange={(e) => this.handleChange(e, e.target.value)} />

                            </div>
                            <br /><br />
                            <button
                                className="btn btn-success btn-block"
                                onClick={this.addDonation}
                                disabled={!this.state.bookTitle || !this.state.description || !this.state.year || !this.state.photo}
                            >
                                {this.state.button}
                            </button>
                        </form>
                    </div>
                    <br /><br />
                </div>
            </div>


        )
    }
}

export default withRouter(DonationForm);