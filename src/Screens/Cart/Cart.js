import React, { Component } from 'react';

export default class Cart extends Component {
    render() {
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Cart</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="callout callout-info">
                                                    <h5>Profile Peminjam</h5>
                                                    <p>
                                                        Name :
                                                    </p>
                                                    <p>
                                                        ID Number :
                                                    </p>
                                                    <p>Date : November, 16 2020</p>
                                                </div>
                                            </div>
                                        </div>
                                        <h5 className="text-center">Book List</h5>
                                        <div className="table-responsive">
                                            <table id="example" className="table table-striped table-white"
                                                style={{width:"100%"}}>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Register</th>
                                                        <th>Judul</th>
                                                        <th>Pengarang</th>
                                                        <th>Aksi</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr id="data1">
                                                        <td>1</td>
                                                        <td>10100733</td>
                                                        <td>Selena</td>
                                                        <td>Tere Liye</td>
                                                        <td>
                                                            <a id="btn-data1" href="#" className="btn btn-sm btn-danger"><i
                                                                className="fa fa-trash"></i></a>
                                                        </td>
                                                    </tr>
                                                    <tr id="data2">
                                                        <td>2</td>
                                                        <td>10100785</td>
                                                        <td>Nebula</td>
                                                        <td>Tere Liye</td>
                                                        <td>
                                                            <a id="btn-data2" href="#" className="btn btn-sm btn-danger"><i
                                                                className="fa fa-trash"></i></a>
                                                        </td>
                                                    </tr>

                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div id="wait" className="pt-4"
                                        style={{ display: 'none', width: '69px', height: '89px', position: 'fixed', zIndex: 999, top: '50%', left: '50%', padding: '2px' }}>
                                        <img src="assets/images/demo_wait.gif" width="64" height="64" /><br />Loading..
                                    </div>
                                    <div className="card-footer" id="foot-card">
                                        <form action="" method="post">
                                            <div className="row">
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Tanggal Pinjam</label>
                                                        <input required onchange="pickDatePinjam(event)" id="tgl_pinjam"
                                                            type="date" name="tanggal_pinjam" className="form-control" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6">
                                                    <div className="form-group">
                                                        <label>Tanggal Pengembalian</label>
                                                        <input readonly id="tgl_kembali" type="date"
                                                            name="tanggal_kembali" className="form-control" required />
                                                    </div>
                                                </div>
                                                <div className="col-lg-12">
                                                    <div className="form-group">
                                                        <label className="text-success">*Ajukan Peminjaman</label>
                                                        <a id="btn-confirmPinjam" href="#"
                                                            className="btn shadow disabled btn-sm btn-success btn-block">
                                                            Borrow
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
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