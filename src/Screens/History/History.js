import React, { Component } from 'react'

class History extends Component {
    constructor() {
        super()
        this.state = {
            data: [
                { "id": "202010052078", "name": "John Elder", "book": "Unbranding", "borrowed": "10/05/2020", "due": "10/11/2020", "returned": "10/09/2020", "status": "Returned", "badge": "badge badge-success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010062201", "name": "Fiona Green", "book": "Koala Kumal", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/12/2020", "status": "Returned", "badge": "badge badge-success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010062219", "name": "Jane Gaines", "book": "Filosofi Teras", "borrowed": "10/06/2020", "due": "10/12/2020", "returned": "10/15/2020", "status": "Returned", "badge": "badge badge-success", "late": "3", "damage": "0", "total": "3" },
                { "id": "202010072324", "name": "Mary Soccer", "book": "Milea: Suara dari Dilan", "borrowed": "10/07/2020", "due": "10/13/2020", "returned": "10/13/2020", "status": "Returned", "badge": "badge badge-success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010082453", "name": "John Elder", "book": "Laut Bercerita", "borrowed": "10/08/2020", "due": "10/14/2020", "returned": "10/14/2020", "status": "Returned", "badge": "badge badge-success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010122921", "name": "June Watanabe", "book": "Nanti Kita Cerita Tentang Hari Ini", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Returned", "badge": "badge badge-success", "late": "2", "damage": "0", "total": "2" },
                { "id": "202010122934", "name": "Martha Stewart", "book": "Laut Bercerita", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/16/2020", "status": "Returned", "badge": "badge badge-success", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010122946", "name": "Martha Stewart", "book": "Pulang", "borrowed": "10/12/2020", "due": "10/18/2020", "returned": "10/20/2020", "status": "Waiting for Payment", "badge": "badge badge-info", "late": "2", "damage": "0", "total": "2" },
                { "id": "202010234187", "name": "July August", "book": "Hujan", "borrowed": "10/23/2020", "due": "11/05/2020", "returned": "", "status": "Overdue", "badge": "badge badge-danger", "late": "0", "damage": "0", "total": "0" },
                { "id": "202010284763", "name": "Fiona Green", "book": "The Book You Wish Your Parents Had Read", "borrowed": "10/28/2020", "due": "11/11/2020", "returned": "", "status": "Overdue", "badge": "badge badge-danger", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011097654", "name": "Mary Soccer", "book": "Book of Invisible Question", "borrowed": "11/09/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "badge badge-warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011107710", "name": "Mary Soccer", "book": "The Book You Wish Your Parents Had Read", "borrowed": "11/10/2020", "due": "11/23/2020", "returned": "", "status": "Borrowed", "badge": "badge badge-warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011168109", "name": "Angelica Smith", "book": "The Things You Can See Only When You Slow Down", "borrowed": "11/16/2020", "due": "11/22/2020", "returned": "", "status": "Borrowed", "badge": "badge badge-warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011198732", "name": "Devina Claire", "book": "Sapiens", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "badge badge-warning", "late": "0", "damage": "0", "total": "0" },
                { "id": "202011198765", "name": "Rey Frank", "book": "Educated", "borrowed": "11/19/2020", "due": "11/25/2020", "returned": "", "status": "Borrowed", "badge": "badge badge-warning", "late": "0", "damage": "0", "total": "0" }
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
                                            <table id="history" className="table table-striped table-white" style={{ width: '100%' }}>
                                                <thead>
                                                    <tr>
                                                        <th>Transaction ID</th>
                                                        <th>Action</th>
                                                        <th>Borrower Name</th>
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
                                                                        <button className="btn btn-primary btn-sm">
                                                                            <i className="fa fa-info-circle"></i>
                                                                        </button>
                                                                        <button className="btn btn-primary btn-sm">
                                                                            <i className="fa fa-edit"></i>
                                                                        </button>
                                                                        <button className="btn btn-primary btn-sm">
                                                                            <i className="fa fa-exchange"></i>
                                                                        </button>
                                                                    </td>
                                                                    <td>{user.name}</td>
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

export default History