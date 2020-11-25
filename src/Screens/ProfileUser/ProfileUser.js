import React, { Component } from 'react';

export default class ProfileUser extends Component {
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
                                                            enctype="multipart/form-data">
                                                            <div className="form-group row">
                                                                <label for="nama"
                                                                    className="col-sm-2 col-form-label">Name</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" className="form-control" id="nama"
                                                                        name="nama" value="User Baginda" readonly />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label for="id"
                                                                    className="col-sm-2 col-form-label">ID</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" name="id" className="form-control"
                                                                        id="id" placeholder="masukan id..." value="123"
                                                                        readonly />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label for="email"
                                                                    className="col-sm-2 col-form-label">Email</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" name="email" className="form-control"
                                                                        id="email" placeholder="masukan email..."
                                                                        value="user@gmail.com" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label for="username"
                                                                    className="col-sm-2 col-form-label">Username</label>
                                                                <div className="col-sm-10">
                                                                    <input type="text" name="username"
                                                                        className="form-control" id="username"
                                                                        placeholder="masukan username..." value="user" />
                                                                </div>
                                                            </div>
                                                            <div class="form-group row">
                                                                <label for="alamat"
                                                                    class="col-sm-2 col-form-label">Address</label>
                                                                <div class="col-sm-10">
                                                                    <textarea name="alamat" class="form-control"
                                                                        id="alamat">Jl. Patriot Kp.2 No.50</textarea>
                                                                </div>
                                                            </div>
                                                            <div class=" form-group row">
                                                                <label for="no_hp" class="col-sm-2 col-form-label">No
                                                                    Hp</label>
                                                                <div class="col-sm-10">
                                                                    <input type="tel" name="no_hp" class="form-control"
                                                                        id="no_hp" placeholder="masukan nomer hp..."
                                                                        pattern="[0-9]+" value="088290332283" />
                                                                </div>
                                                            </div>
                                                            <div className="form-group row">
                                                                <label for="inputEmail3"
                                                                    className="col-sm-2 col-form-label">Profile
                                                                    Picture</label>
                                                                <div className="col-sm-2">
                                                                    <img src="assets/images/user.png"
                                                                        className="img-thumbnail img-preview" />
                                                                </div>
                                                                <div className="col-sm-8">
                                                                    <div className="custom-file">
                                                                        <input id="foto" name="foto"
                                                                            onchange="previewImg()" type="file"
                                                                            className="custom-file-input" />
                                                                        <label className="custom-file-label"
                                                                            for="foto">Choose file</label>
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
                                                        <form action="" method="post">
                                                            <div className="card-body">
                                                                <div className="form-group">
                                                                    <label for="password1" className="">
                                                                        New Password
                                                                    </label>
                                                                    <input type="password" name="password" required
                                                                        autocomplete="off" id="password1"
                                                                        className="form-control simm-inv" />
                                                                </div>
                                                                <div className="form-group">
                                                                    <label for="password2" className="">Confirm
                                                                        Password</label><br />
                                                                    <input type="password" name="password_confirm"
                                                                        required autocomplete="off" id="password2"
                                                                        className="form-control simm-inv" />
                                                                    <small id="passmatch" style={{ display: 'none' }}><i
                                                                        id="pwmatch" className="fa fa-close"
                                                                        style={{ color: '#FF0004' }}></i> Passwords
                                                                        Match</small>
                                                                </div>
                                                                <br />
                                                                <div className="form-group">
                                                                    <button type="submit" disabled id="btn-save"
                                                                        className="btn btn-primary btn-block">Change</button>
                                                                </div>
                                                            </div>
                                                        </form>
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