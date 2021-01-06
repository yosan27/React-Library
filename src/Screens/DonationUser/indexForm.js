import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
            title: '',
            author: '',
            category: '',
            year: '',
            condition: '',
            photo: '',
            categoryName: '',

            formErrors: {
                title: '',
                author: '',
                category: '',
                year: '',
                condition: '',
                photo: '',
            },
            titleValid: false,
            authorValid: false,
            categoryValid: false,
            yearValid: false,
            conditionValid: false,
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

    handleChange(e) {
        this.setState({ categoryName: e.label })
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value },
            () => { this.validateField(name, value) });
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let titleValid = this.state.titleValid;
        let authorValid = this.state.authorValid;
        let categoryValid = this.state.categoryValid;
        let yearValid = this.state.yearValid;
        let conditionValid = this.state.conditionValid;
        let photoValid = this.state.photoValid;


        switch (fieldName) {
            case 'title':
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
            case 'condition':
                conditionValid = value.length >= 6;
                fieldValidationErrors.condition = conditionValid ? '' : ' should not be empty!';
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
            conditionValid: conditionValid,
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
                            <div className={`form-group ${this.errorClass(this.state.formErrors.title)}`}>
                                <label for="exampleFormControlInput1">Title Book</label>
                                <input type="text" class="form-control" name="title" value={this.state.title} onChange={this.handleUserInput}
                                    placeholder="Bumi Manusia" />
                            </div>
                            <div className="">
                                <label for="exampleFormControlSelect1">Category</label>
                                <Select options={this.state.categoryList} onChange={this.handleChange.bind(this)} />
                                {/* <option>{this.state.categoryName}</option> */}

                            </div>
                            <div className={`form-group ${this.errorClass(this.state.formErrors.year)}`}>
                                <label for="exampleFormControlInput1">Year</label>
                                <input type="text" name="year" class="form-control" id="exampleFormControlInput1"
                                    placeholder="2020" value={this.state.year} onChange={this.handleUserInput} />
                            </div>

                            <div className={`form-group ${this.errorClass(this.state.formErrors.author)}`}>
                                <label for="exampleFormControlInput1">Author</label>
                                <input type="text" name="author" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Pramodya A. Toer" value={this.state.author} onChange={this.handleUserInput} />
                            </div>

                            <div className={`form-group ${this.errorClass(this.state.formErrors.condition)}`}>
                                <label for="exampleFormControlTextarea1">Condition</label>
                                <textarea name="condition" class="form-control" id="exampleFormControlTextarea1" rows="3" value={this.state.condition} onChange={this.handleUserInput}></textarea>
                            </div>

                            <div className={`form-group ${this.errorClass(this.state.formErrors.photo)}`}>
                                <label for="exampleFormControlInput1">Photo Book</label>
                                <input class="form-control" type="file" id="avatar" name="photo     "
                                    accept="image/png, image/jpeg" value={this.state.photo} onChange={this.handleUserInput} />
                            </div>
                        </form>
                    </div>
                    <br /><br />
                    <i className="wrong-user"><FormErrors formErrors={this.state.formErrors} /></i>

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