import React, { Component } from 'react'

class HistoryUser extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { "id": "202010052078", "book": "Unbranding", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010052079", "book": "Koala Kumal", "borrowed": "2020/10/05", "due": "2020/10/11", "returned": "2020/10/09", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010082453", "book": "Laut Bercerita", "borrowed": "2020/10/08", "due": "2020/10/14", "returned": "2020/10/14", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010092605", "book": "Pulang", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/14", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010092606", "book": "Becoming", "borrowed": "2020/10/09", "due": "2020/10/15", "returned": "2020/10/16", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010163390", "book": "The Book You Wish Your Parents Had Read", "borrowed": "2020/10/16", "due": "2020/10/22", "returned": "2020/10/21", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010305132", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202010305133", "book": "Book of Invisible Question", "borrowed": "2020/10/30", "due": "2020/11/05", "returned": "2020/11/04", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202011065898", "book": "Atomic Habits", "borrowed": "2020/11/06", "due": "2020/11/12", "returned": "2020/11/13", "status": "Returned", "badge": "badge badge-success" },
                { "id": "202011126431", "book": "Hujan", "borrowed": "2020/11/12", "due": "2020/11/18", "returned": "", "status": "Overdue", "badge": "badge badge-danger" },
                { "id": "202011166876", "book": "Dilan 1990", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "badge badge-warning" },
                { "id": "202011166877", "book": "Dilan 1991", "borrowed": "2020/11/16", "due": "2020/11/22", "returned": "", "status": "Borrowed", "badge": "badge badge-warning" }
            ]
        }
    }

    render() {
        const { data } = this.state
        return (
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Borrowed and Returned</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id="history-user" className="table table-striped table-white" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Transaction ID</th>
                                                        <th>Action</th>
                                                        <th>Book Title</th>
                                                        <th>Date Borrowed</th>
                                                        <th>Due Date</th>
                                                        <th>Date Returned</th>
                                                        <th>Status</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map(user => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.id}</td>
                                                                    <td>
                                                                        <span className="d-flex justify-content-center">
                                                                            <button className="btn btn-primary btn-sm">
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                        </span>
                                                                    </td>
                                                                    <td>{user.book}</td>
                                                                    <td>{user.borrowed}</td>
                                                                    <td>{user.due}</td>
                                                                    <td>{user.returned}</td>
                                                                    <td><span className={user.badge}>{user.status}</span></td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
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

export default HistoryUser