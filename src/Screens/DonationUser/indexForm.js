import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import swal from 'sweetalert'
import './donation-styles.css'
import axios from "../../Services/axios-instance";
import Select from 'react-select';
import AuthService from "../../Services/auth.service";

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
            categoryName: '',
            categoryCode: '',
            button: 'Submit',
            selectedFiles: undefined,
            currentFile: undefined,
            photo: AuthService.API_URL() + "getFile/user.png",
            nameFileImage: "",
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

    selectFile = (event) => {
        this.setState({
            selectedFiles: event.target.files,
        });
        var sampul = document.querySelector("#foto"); //input type file
        var sampulLabel = document.querySelector(".custom-file-label");

        sampulLabel.textContent = sampul.files[0].name;

        var fileSampul = new FileReader();
        fileSampul.readAsDataURL(sampul.files[0]);
    }


    addDonation2 = () => {
        let currentFile = this.state.selectedFiles[0];
        console.log(this.state.selectedFiles)
        console.log(currentFile);
        this.setState({
            currentFile: currentFile,
        });
        let formData = new FormData();
        formData.append("file", currentFile);
        var newFileName = AuthService.getUserCode() + "_donationPict_";

        axios.post("uploadFile/" + newFileName, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            console.log(response)
            console.log(response.data.message)
            console.log(this.state.nameFileImage)

            this.setState({
                photo: AuthService.API_URL() + "getFile/" + newFileName + currentFile.name,
                nameFileImage: newFileName + currentFile.name
            })

            const donation = {
                bookTitle: this.state.bookTitle,
                author: this.state.author,
                year: this.state.year,
                photo: newFileName + currentFile.name,
                description: this.state.description,
                categoryCode: this.state.categoryCode,
                userCode: AuthService.getUserCode()

            };

            axios.post("donation", donation)
                .then(() =>
                    swal("Success!", "Donation Form Has Been Added", "success")
                );
        }).catch(function (error) {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
        })
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

                    <div className="col-12 col-lg-9 mt-4 mt-lg-1">

                        <div className=" form-group row">
                            <label htmlFor="title" className="col-sm-2 col-form-label">Title Book</label>
                            <div className="col-sm-10">
                                <input type="text" class="form-control" name="bookTitle" value={this.state.bookTitle} onChange={(e) => this.handleChange(e, e.target.value)}
                                    placeholder="Bumi Manusia" />
                                <small className="text-danger">
                                    {this.state.bookTitle.length < 1 ? '- Please insert the book title -' : ""}
                                </small>
                            </div>
                        </div>

                        <div className=" form-group row">
                            <label htmlFor="category" className="col-sm-2 col-form-label">Category</label>
                            <div className="col-sm-10">
                                <Select name="category" options={this.state.categoryList} onChange={this.handleChangeCategory} />
                            </div>
                        </div>

                        <div className=" form-group row">
                            <label htmlFor="year" className="col-sm-2 col-form-label">Year</label>
                            <div className="col-sm-10">
                                <input type="text" name="year" class="form-control" id="exampleFormControlInput1"
                                    placeholder="2020" value={this.state.year} onChange={(e) => this.handleChange(e, e.target.value)} />
                                <small className="text-danger">
                                    {this.state.year.length < 4 ? '- Please insert year of the book -' : ""}
                                </small>
                            </div>
                        </div>

                        <div className=" form-group row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Author</label>
                            <div className="col-sm-10">
                                <input type="text" name="author" class="form-control" id="exampleFormControlInput1"
                                    placeholder="Pramodya A. Toer" value={this.state.author} onChange={(e) => this.handleChange(e, e.target.value)} />
                                <small className="text-danger">
                                    {this.state.author.length < 1 ? '- Please insert author of this book -' : ""}
                                </small>
                            </div>
                        </div>

                        <div className=" form-group row">
                            <label htmlFor="author" className="col-sm-2 col-form-label">Description</label>
                            <div className="col-sm-10">
                                <textarea name="description" class="form-control" value={this.state.description} onChange={(e) => this.handleChange(e, e.target.value)}></textarea>
                                <small className="text-danger">
                                    {this.state.description.length < 10 ? '- Please insert description and condition of this book -' : ""}
                                </small>
                            </div>
                        </div>


                        <div className="custom-file">
                            {/* <input class="form-control" type="text" id="avatar" name="photo"
                                    value={this.state.photo} onChange={(e) => this.handleChange(e, e.target.value)} /> */}

                            <input id="foto" name="foto" onChange={this.selectFile} type="file" className="custom-file-input" />
                            <label className="custom-file-label"
                                htmlFor="foto">Choose Photo Book</label>
                        </div>
                        <small>*format gambar berupa .jpg dengan ukuran
                                                                        maksimal 1MB</small>

                        <br /><br />
                        <button
                            className="btn btn-success btn-block"
                            onClick={this.addDonation2}
                            disabled={!this.state.bookTitle || !this.state.description || !this.state.year || !this.state.photo}
                        >
                            {this.state.button}
                        </button>
                    </div>
                </div>

            </div >


        )
    }
}

export default withRouter(DonationForm);