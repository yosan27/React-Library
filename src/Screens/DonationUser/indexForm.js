import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert'
import './donation-styles.css'
import { FormErrors } from '../Login/FormErrors';
import axios from "axios";
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
            button: 'Submit',

            formErrors: {
                title: '',
                author: '',
                category: '',
                year: '',
                description: '',
                photo: '',
            },
            titleValid: false,
            authorValid: false,
            categoryValid: false,
            yearValid: false,
            descriptionValid: false,
            photoValid: false
        }
    }

    async getCategory() {
        const res = await axios.get('http://localhost:8500/api/category')
        const data = res.data

        const options = data.map(d => ({
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

        if (event.target.name === "category") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }


    };


    addDonation = () => {
        let donation = {
            bookTitle: this.state.bookTitle,
            author: this.state.author,
            year: this.state.year,
            photo: this.state.photo,
            description: this.state.description,
            categoryCode: this.state.categoryCode
        };

        axios.post("http://localhost:8500/api/donation", donation)
            .then(() => window.location.reload());
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let authorValid = this.state.authorValid;
        let categoryValid = this.state.categoryValid;
        let yearValid = this.state.yearValid;
        let descriptionValid = this.state.descriptionValid;
        let photoValid = this.state.photoValid;


        switch (fieldName) {
            case 'bookTitle':
                titleValid = value.length >= 1;
                fieldValidationErrors.title = titleValid ? '' : ' should not be empty!';
                break;
            case 'author':
                authorValid = value.length >= 6;
                fieldValidationErrors.author = authorValid ? '' : ' should not be empty!';
                break;
            case 'category':
                categoryValid = value.length >= 2;
                fieldValidationErrors.category = categoryValid ? '' : ' should not be empty!';
                break;
            case 'year':
                yearValid = value.length >= 4;
                fieldValidationErrors.year = yearValid ? '' : ' should not be empty!';
                break;
            case 'description':
                descriptionValid = value.length >= 6;
                fieldValidationErrors.description = descriptionValid ? '' : ' should not be empty!';
                break;

            case 'photo':
                photoValid = value.length >= 1;
                fieldValidationErrors.photo = photoValid ? '' : ' should not be empty!';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors,
            titleValid: titleValid,
            authorValid: authorValid,
            categoryValid: categoryValid,
            yearValid: yearValid,
            descriptionValid: descriptionValid,
            photoValid: photoValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({ formValid: this.state.nameValid && this.state.emailValid && this.state.passwordValid });
    }

    errorClass(error) {
        return (error.length === 0 ? '' : 'has-error');
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
                            </div>
                            <div className >
                                <label for="exampleFormControlInput1">Category</label>
                                <Select name="category" options={this.state.categoryList} onChange={(e) => this.handleChange(e, e.target.value)} value={this.state.categoryCode} />
                                {/* <option>{this.state.categoryName}</option> */}

                            </div>
                            <div className>
                                <label for="exampleFormControlInput1">Year</label>
                                <input type="text" name="year" class="form-control" id="exampleFormControlInput1"
                                    placeholder="2020" value={this.state.year} onChange={(e) => this.handleChange(e, e.target.value)} />
                            </div>

                            <div className>
                                <label for="exampleFormControlInput1">Author</label>
                                <input type="text" name="author" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Pramodya A. Toer" value={this.state.author} onChange={(e) => this.handleChange(e, e.target.value)} />
                            </div>

                            <div className>
                                <label for="exampleFormControlTextarea1">Description</label>
                                <textarea name="description" class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.description} onChange={(e) => this.handleChange(e, e.target.value)}></textarea>
                            </div>

                            <div className>
                                <label for="exampleFormControlInput1">Photo Book</label>
                                <input class="form-control" type="text" id="avatar" name="photo"
                                    value={this.state.photo} onChange={(e) => this.handleChange(e, e.target.value)} />
                            </div>
                            <i className="wrong-user"><FormErrors formErrors={this.state.formErrors} /></i>

                            <Link
                                className="btn btn-success add-btn"
                                onClick={this.addDonation}
                            >
                                <i class="fa fa-plus mr-1"></i>
                                {this.state.button}
                            </Link>
                        </form>
                    </div>
                    <br /><br />
                </div>
            </div>


        )
    }
}

export default withRouter(DonationForm);