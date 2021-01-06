import React, { Component } from 'react';
import swal from "sweetalert";
import axios from "axios";
export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userCode: "UA001",
            fullName: "Admin",
            email: "admin@gmail.com",
            profilePict: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBG685vI07-3MsuqJxjCfzIabfFJJG-8yM-ppvjjNpD5QNtWNE4A",
            phone: "0812388291",
            userName: "",
            password : "",
            password2 : "",
            id : ""
        }
        this.userChange = this.userChange.bind(this)
    }

    componentDidMount() {
        if (!sessionStorage.getItem('userData')) {
            console.log("tidak ada userData")
        } else {
            console.log("ada local storage")
            console.log(JSON.parse(sessionStorage.getItem('userData')))
            axios.get("http://localhost:8500/api/user-by-code/" + sessionStorage.getItem('userCode')).then((e) => {
                // console.log(e);
                this.setState({
                    // saldo: e.data.balance,
                    username: e.data.userName,
                    userCode: sessionStorage.getItem('userCode'),
                    fullName: e.data.fullName,
                    email: e.data.email,
                    id : e.data.id
                })
            })
        }
    }

    updateBtn = () => {
        swal("Successfully", "Changed profile", "success");
    };

    updatePassword = (id) => {
        const userDto = {
            password: this.state.password
        }
        sessionStorage.clear();
        axios.put('http://localhost:8500/api/user-password/' + id, userDto)
            .then((response) => {
                sessionStorage.setItem('userData', JSON.stringify(response))
                console.log(response);
            })
        this.setState({
            password: "",
            password2: "",
        });
        swal("Successfully", "Changed password", "success");
    }

    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    cekPass1 = (e) => {
        // alert(e);
        if (document.getElementById("password2").value === e) {
            document.getElementById("pwmatch").classList.remove("fa-close");
            document.getElementById("pwmatch").classList.add("fa-check");
            document.getElementById("pwmatch").style.color = "#00A41E";
        } else {
            document.getElementById("pwmatch").classList.remove("fa-check");
            document.getElementById("pwmatch").classList.add("fa-close");
            document.getElementById("pwmatch").style.color = "#FF0004";
        }
        this.setState({
            password: e,
        });
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

    previewImg = () => {
        var sampul = document.querySelector("#foto"); //input type file
        var sampulLabel = document.querySelector(".custom-file-label");
        var imgPreview = document.querySelector(".img-preview");

        sampulLabel.textContent = sampul.files[0].name;

        var fileSampul = new FileReader();
        fileSampul.readAsDataURL(sampul.files[0]);

        fileSampul.onload = function (e) {
            imgPreview.src = e.target.result;
        };
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
                                                        <form className="form-horizontal" action="" method="post"
                                                            encType="multipart/form-data">
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
                                                                        placeholder="masukan username..." value={this.state.userName} readOnly />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label htmlFor="inputEmail3"
                                                                    className="col-sm-2 col-form-label">Profile
                                                                        Picture</label>
                                                                <div className="col-sm-2">
                                                                    <img src={this.state.profilePict}
                                                                        className="img-thumbnail img-preview" />
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <div className="custom-file">
                                                                        <input id="foto" name="foto" onChange={(e) => this.previewImg(e.target.value)} type="file"
                                                                            className="custom-file-input" />
                                                                        <label className="custom-file-label"
                                                                            htmlFor="foto">Choose file</label>
                                                                    </div>
                                                                    <small>*format gambar berupa .jpg dengan ukuran
                                                                            maksimal 1MB</small>
                                                                </div>
                                                            </div>
                                                            <br />
                                                            <div className="form-group">
                                                                <button type="submit"
                                                                    className="btn btn-primary btn-block">Update</button>
                                                            </div>
                                                        </form>
                                                    </div>

                                                    <div className="tab-pane fade" id="vert-tabs-password" role="tabpanel"
                                                        aria-labelledby="vert-tabs-password-tab">
                                                        {/* <form action="" method="post"> */}
                                                            <div className="card-body">
                                                                <div className="form-group">
                                                                    <label htmlFor="password1" className="">
                                                                        New Password
                                                                    </label>
                                                                    <input type="password" onChange={(e) => this.cekPass1(e.target.value)} value={this.state.password} name="password" required
                                                                        autoComplete="off" id="password1"
                                                                        className="form-control simm-inv" />
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
                                                                    <button type="submit" id="btn-save"
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