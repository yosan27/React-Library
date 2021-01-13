import React, { Component } from 'react';
import swal from "sweetalert";
import axios from "axios";
import Axios from "../../Services/axios-instance";
import AuthService from "../../Services/auth.service";

export default class ProfileUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userCode: "UU001",
            fullName: "James Rodriguez",
            email: "james@gmail.com",
            profilePict: AuthService.API_URL() + "getFile/user.png",
            nameFileImage: "",
            balance: "5000",
            address: "",
            username: "",
            userData: [],
            id: "",
            password: "",
            password2: "",
            notNullPhone: "",
            selectedFiles: undefined,
            currentFile: undefined,
        }
        this.userChange = this.userChange.bind(this)
    }

    componentDidMount() {
        Axios.get("user/code/" + AuthService.getUserCode()).then((resp) => {
            this.setState({
                username: resp.data.userName,
                userCode: resp.data.userCode,
                fullName: resp.data.fullName,
                email: resp.data.email,
                phone: resp.data.phone,
                address: resp.data.address,
                id: resp.data.id,
                profilePict: AuthService.API_URL() + "getFile/" + resp.data.profilePict,
                nameFileImage: resp.data.profilePict
            })
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
    }
    selectFile = (event) => {
        this.setState({
            selectedFiles: event.target.files,
        });
        var sampul = document.querySelector("#foto"); //input type file
        var sampulLabel = document.querySelector(".custom-file-label");
        var imgPreview = document.querySelector(".img-preview");

        sampulLabel.textContent = sampul.files[0].name;

        var fileSampul = new FileReader();
        fileSampul.readAsDataURL(sampul.files[0]);

        fileSampul.onload = function (e) {
            imgPreview.src = e.target.result;
        };
    }
    updateBtn = (id) => {
        let currentFile = this.state.selectedFiles[0];
        // console.log(this.state.selectedFiles)
        console.log(currentFile);
        this.setState({
            currentFile: currentFile,
        });
        let formData = new FormData();
        formData.append("file", currentFile);
        var newFileName = AuthService.getUserCode() + "_profilePict_";
        Axios.post("uploadFile/" + newFileName, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then((response) => {
            console.log(response)
            console.log(response.data.message)
            console.log(this.state.nameFileImage)
            if (this.state.nameFileImage === "user.png") {
                this.setState({
                    profilePict: AuthService.API_URL() + "getFile/" + newFileName + currentFile.name,
                    nameFileImage: newFileName + currentFile.name
                })
                const userDto = {
                    phone: this.state.phone,
                    address: this.state.address,
                    profilePict: newFileName + currentFile.name,
                }
                if (!this.state.phone || !this.state.address) {
                    swal("Failed", "Changed profile", "failed");
                } else {
                    Axios.put('user/profile/' + id, userDto)
                        .then((response) => {
                            console.log(response);
                        })
                    swal("Successfully", "Changed profile", "success");
                    window.location.reload()
                }
            } else {
                Axios.delete("deleteFile/" + this.state.nameFileImage).then((resp) => {
                    console.log(resp)
                    this.setState({
                        profilePict: AuthService.API_URL() + "getFile/" + newFileName + currentFile.name,
                        nameFileImage: newFileName + currentFile.name
                    })
                    const userDto = {
                        phone: this.state.phone,
                        address: this.state.address,
                        profilePict: newFileName + currentFile.name,
                    }
                    if (!this.state.phone || !this.state.address) {
                        swal("Failed", "Changed profile", "failed");
                    } else {
                        Axios.put('user/profile/' + id, userDto)
                            .then((response) => {
                                console.log(response);
                            })
                        swal("Successfully", "Changed profile", "success");
                        window.location.reload()
                    }
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
            }
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

    updatePassword = (id) => {
        const userDto = {
            password: this.state.password
        }
        Axios.put('user/password/' + id, userDto)
            .then((response) => {
                console.log(response);
            })
        this.setState({
            password: "",
            password2: "",
        });
        document.getElementById("passmatch").style.display = "none";
        swal("Successfully", "Changed password", "success");
    }

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
        console.log(this.state.phone.length)
        if (this.state.phone.length < 12) {
            this.setState({
                notNullPhone: "minimal 12 digit",
            });
        } else {
            this.setState({
                notNullPhone: "",
            });
        }
    }

    cekPass1 = (e) => {
        // alert(e);
        this.setState({
            password: e,
        });
        if (document.getElementById("password2").value === e) {
            document.getElementById("pwmatch").classList.remove("fa-close");
            document.getElementById("pwmatch").classList.add("fa-check");
            document.getElementById("pwmatch").style.color = "#00A41E";
        } else {
            document.getElementById("pwmatch").classList.remove("fa-check");
            document.getElementById("pwmatch").classList.add("fa-close");
            document.getElementById("pwmatch").style.color = "#FF0004";
        }
    };

    cekPass2 = (e) => {
        // alert(e);
        document.getElementById("passmatch").style.display = "";
        if (document.getElementById("password1").value === e) {
            document.getElementById("pwmatch").classList.remove("fa-close");
            document.getElementById("pwmatch").classList.add("fa-check");
            document.getElementById("pwmatch").style.color = "#00A41E";
        } else {
            document.getElementById("pwmatch").classList.remove("fa-check");
            document.getElementById("pwmatch").classList.add("fa-close");
            document.getElementById("pwmatch").style.color = "#FF0004";
        }
        this.setState({
            password2: e,
        });
    };

    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Profile</h3>
                                    </div>
                                    <div className="card-body" style={{ minHeight: '650px' }}>
                                        <div className="row">
                                            <div className="col-12 col-lg-3">
                                                <div className="nav flex-column nav-tabs h-100" id="vert-tabs-tab"
                                                    role="tablist" aria-orientation="vertical">
                                                    <a className="nav-link active" id="vert-tabs-home-tab"
                                                        data-toggle="pill" href="#vert-tabs-home" role="tab"
                                                        aria-controls="vert-tabs-home" aria-selected="true">Profile</a>
                                                    <a className="nav-link" id="vert-tabs-password-tab" data-toggle="pill"
                                                        href="#vert-tabs-password" role="tab"
                                                        aria-controls="vert-tabs-password" aria-selected="false">Change
                                                        Password</a>
                                                </div>
                                            </div>
                                            <div className="col-12 col-lg-9 mt-4 mt-lg-1">
                                                <div className="tab-content" id="vert-tabs-tabContent">
                                                    <div className="tab-pane text-left fade active show" id="vert-tabs-home"
                                                        role="tabpanel" aria-labelledby="vert-tabs-home-tab">
                                                        {/* <form className="form-horizontal"
                                                            encType="multipart/form-data"> */}
                                                        <div className="form-group row">
                                                            <label htmlFor="id"
                                                                className="col-sm-2 col-form-label">User ID</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" name="id" className="form-control"
                                                                    id="id" placeholder="masukan id..." value={this.state.userCode}
                                                                    readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="nama"
                                                                className="col-sm-2 col-form-label">Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="nama"
                                                                    name="nama" value={this.state.fullName} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="email"
                                                                className="col-sm-2 col-form-label">Email</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" name="email" className="form-control"
                                                                    id="email" placeholder="masukan email..."
                                                                    value={this.state.email} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="username"
                                                                className="col-sm-2 col-form-label">Username</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" name="username"
                                                                    className="form-control" id="username"
                                                                    placeholder="masukan username..." value={this.state.username} readOnly />
                                                            </div>
                                                        </div>
                                                        <div className=" form-group row">
                                                            <label htmlFor="phone" className="col-sm-2 col-form-label">Phone</label>
                                                            <div className="col-sm-10">
                                                                <input type="number" name="phone" className="form-control"
                                                                    id="phone" value={this.state.phone} onChange={this.userChange} />
                                                                <small className="text-danger">
                                                                    {this.state.notNullPhone}
                                                                    {!this.state.phone ? '- not null -' : ""}
                                                                </small>
                                                            </div>
                                                        </div>
                                                        <div className=" form-group row">
                                                            <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                                                            <div className="col-sm-10">
                                                                <textarea className="form-control" id="exampleFormControlTextarea1" name="address" rows="3" value={this.state.address} onChange={this.userChange}></textarea>
                                                                <small className="text-danger">
                                                                    {!this.state.address ? '- not null -' : ""}
                                                                </small>
                                                            </div>
                                                        </div>


                                                        <div className="form-group row">
                                                            <label htmlFor="inputEmail3"
                                                                className="col-sm-2 col-form-label">Profile
                                                                    Picture</label>
                                                            <div className="col-sm-2">
                                                                <img src={this.state.profilePict} className="img-thumbnail img-preview" />
                                                            </div>
                                                            <div className="col-sm-8">
                                                                <div className="custom-file">
                                                                    <input id="foto" name="foto" onChange={this.selectFile} type="file" className="custom-file-input" />
                                                                    <label className="custom-file-label"
                                                                        htmlFor="foto">Choose file</label>
                                                                </div>
                                                                <small>*format gambar berupa .jpg dengan ukuran
                                                                        maksimal 1MB</small>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="form-group">
                                                            <button disabled={!this.state.phone || !this.state.address || this.state.phone.length < 12}
                                                                className="btn btn-primary btn-block" onClick={() => this.updateBtn(this.state.id)}>Update</button>
                                                        </div>
                                                        {/* </form> */}
                                                    </div>

                                                    <div className="tab-pane fade" id="vert-tabs-password" role="tabpanel"
                                                        aria-labelledby="vert-tabs-password-tab">
                                                        {/* <form> */}
                                                        <div className="card-body">
                                                            <div className="form-group">
                                                                <label htmlFor="password1" className="">
                                                                    New Password
                                                                </label>
                                                                <input type="password" onChange={(e) => this.cekPass1(e.target.value)} value={this.state.password} name="password" required
                                                                    autoComplete="off" id="password1"
                                                                    className="form-control simm-inv" />
                                                                <small className="text-danger">
                                                                    {this.state.password.length < 8 ? '- minimal 8 digit -' : ""}
                                                                </small>
                                                            </div>
                                                            <div className="form-group">
                                                                <label htmlFor="password2" className="">Confirm
                                                                    Password</label><br />
                                                                <input onChange={(e) => this.cekPass2(e.target.value)} type="password" value={this.state.password2} name="password_confirm"
                                                                    required autoComplete="off" id="password2"
                                                                    className="form-control simm-inv" />
                                                                <small id="passmatch" style={{ display: 'none' }}><i
                                                                    id="pwmatch" className="fa fa-close"
                                                                    style={{ color: '#FF0004' }}></i> Passwords
                                                                    Match</small>
                                                            </div>
                                                            <br />
                                                            <div className="form-group">
                                                                <button id="btn-save" disabled={this.state.password.length < 8 || this.state.password2 != this.state.password}
                                                                    className="btn btn-primary btn-block" onClick={() => this.updatePassword(this.state.id)}>Change</button>
                                                            </div>
                                                        </div>
                                                        {/* </form> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </section >
            </div >
        )
    }
}