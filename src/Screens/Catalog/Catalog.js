import React, { Component } from 'react'
import Image from 'react-bootstrap/Image'

class Catalog extends Component {
    constructor(){
        super()
        this.state = {
            data: [
                {"id": "2017100251", "title":"Selena", "cover":"https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg", "author":"Tere Liye", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Nebula", "cover":"https://www.gramedia.com/blog/content/images/2020/05/nebula_gramedia.jpg", "author":"Tere Liye", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Misteri Terakhir #1", "cover":"https://www.gramedia.com/blog/content/images/2020/05/misteri-terakhir_gramedia.jpg", "author":"S. Mara Gd", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"After the Funeral (Setelah Pemakaman)", "cover":"https://www.gramedia.com/blog/content/images/2020/05/after-the-funeral_gramedia.jpg", "author":"Agatha Christie", "categories":"Detective and mystery stories", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"MetroPop: Ganjil Genap", "cover":"https://www.gramedia.com/blog/content/images/2020/05/metropop-ganjil-genap_gramedia.jpg", "author":"Almira Bastari", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Tokyo dan Perayaan Kesedihan", "cover":"https://www.gramedia.com/blog/content/images/2020/05/tokyo-dan-perayaan-kesedihan_gramedia.jpg", "author":"Ruth Priscilia Angelina", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Segi Tiga", "cover":"https://www.gramedia.com/blog/content/images/2020/05/Segi-Tiga_gramedia.jpg", "author":"Sapardi Djoko Damono", "categories":"Young Adult Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Ibuk", "cover":"https://www.gramedia.com/blog/content/images/2020/05/Ibuk_Gramedia.jpg", "author":"Iwan Setyawan", "categories":"Juvenile Fiction", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Laut Bercerita", "cover":"https://www.gramedia.com/blog/content/images/2020/05/Laut-bercerita_gramedia.jpg", "author":"Leila S. Chudori", "categories":"Foreign Language Study", "publisher":"Gramedia Pustaka "},
                {"id": "2017100251", "title":"Defending Jacob", "cover":"https://www.gramedia.com/blog/content/images/2020/05/defending-jacob_gramedia.jpg", "author":"William Landay", "categories":"Juvenile Fiction", "publisher":"Gramedia Pustaka "},
    
            ]
        }
    }

    render(){
        const { data } = this.state,
        Photo = data.map(user => (
            <Image className='photoOfOrder text-center' key={user.id} src={user.cover} wrapped ui={false} style={{width:'30%',height:'auto'}}/>
        ));
        return(
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
                                            <table id="history-user" className="table table-striped table-white table-bordered" style={{ width: '100%' }}>
                                                <thead className='thead-dark'>
                                                    <tr>
                                                        <th>Book ID</th>
                                                        <th>Book Title</th>                         
                                                        <th>Book Cover</th>
                                                        <th>Author</th>
                                                        <th>Categories</th>
                                                        <th>Publisher</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        data.map(user => {
                                                            return (
                                                                <tr>
                                                                    <td>{user.id}</td>
                                                                    <td>{user.title}</td>
                                                                    <td className="text-center"><Image className='photoOfOrder text-center' key={user.id} src={user.cover} wrapped ui={false} style={{width:'30%',height:'auto'}} /></td>
                                                                    <td>{user.author}</td>
                                                                    <td>{user.categories}</td>
                                                                    <td>{user.publisher}</td>
                                                                    <td>
                                                                        <span className="d-flex justify-content-center" data-toggle="tooltip" title="detail">
                                                                            <button className="btn btn-primary" data-toggle="modal" data-target="#ModalDetail"><i className="fa fa-info-circle"></i></button>
                                                                        </span>
                                                                    </td>
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

export default Catalog