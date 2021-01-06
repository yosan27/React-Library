import React, { Component } from 'react'
import axios from "axios";
import {Card, Table, Modal, Form, Row, Col, Badge, Button } from 'react-bootstrap';
import swal from "sweetalert";
import Image from 'react-bootstrap/Image'
import './Catalog.css'
// Rating
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

class Catalog extends Component {
    constructor(props){
        super(props)
        this.state = {

            catalogData: [],
            detailData: [],
            reviewData: [],
            id: "",
            bookCode: "",
            bookTitle: "",
            cover: "",
            authorName: "",
            categoryName: "",
            publisherName: '',
            isbn: '',
            language: '',
            numberOfPages: '',
            description: '',
            publishedDate: '',
            bookSubtitle: '',
            review: '',
            rate: "",
            userName: "",

            
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
    
            ],
            showAddCategory: false,
            showDetail: false,
            showReview: false,
            
            fields : [
                
            ],

            errors: {},
            disableSubmitting: false
        }
        
    };

    handleShowDetail = () => {
        this.setState({ showDetail: true})
    }

    handleCloseDetail = () => {
        this.setState({ showDetail: false})
    }

    handleShowReview = () => {
        this.setState({ showReview: true})
    }

    handleCloseReview = () => {
        this.setState({ showReview: false})
    }

    handleAddReview = () => {
        this.setState({ addReview: true})
    }

    handleCloseAddReview = () => {
        this.setState({ addReview: false})
    }
    
    handleShowAddCategory = () => {
        this.setState({ showAddCategory: true})
    }

    handleCloseCategory = () => {
        this.setState({ showAddCategory: false})
    }

    handleAddCategory = () => {
        this.setState({ showAddCategory: false})
        swal("Success!", "Category Has Been Added", "success");
    }

    rating = (value, newValue) => {
            this.setState({ value: this.state.value + 1})
    }
    

    componentDidMount() {
       
    $('.img-book').hover(makeBigger, returnToOriginalSize);
      function makeBigger() {
          $(this).css({width: '+=10%'});
      }
      function returnToOriginalSize() {
          $(this).css({width: "-=10%"});
      }

      axios.get("http://localhost:8500/api/catalog").then((e) => {
          this.setState({ catalogData: e.data.data});
          //console.log(e.data.data[0]);

          $(function () {
            $('#historyUser').DataTable({
                responsive: true
            });
          });
      });


    }

    getById(id) {
        axios.get(`http://localhost:8500/api/detailBook/${id}`).then((res) => {
            this.setState({
                description: res.data.bookDetailsEntity.description,
                numberOfPages: res.data.bookDetailsEntity.numberOfPages,
                publishedDate: res.data.publishedDate,
                language: res.data.bookDetailsEntity.language,
                publisher: res.data.publisherEntity.publisherName,
                isbn: res.data.isbn,
                bookSubtitle: res.data.bookDetailsEntity.bookSubtitle,
                bookCode: res.data.bookCode,
            });
        })
    }

    review(bookCode) {
        axios.get(`http://localhost:8500/api/reviewLook/${bookCode}`).then((e) => {
            this.setState({ reviewData: e.data});
            console.log(e.data.data);
        });
    }

    setRate(rate) {
        if(rate == 1) {
            return <div> <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>
        } else if(rate == 2) {
            return <div> <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>
        } else if(rate == 3) {
            return <div> <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            </div>
        } else if(rate == 4) {
            return <div> <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            </div>
        } else if(rate == 5) {
            return <div> <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            </div>
        } 
    }

    render(){
        const { data, showDetail, showReview, addReview, value, setValue, errors, showAddCategory, disableSubmitting, fields } = this.state,
   
        Photo = data.map(user => (
            <Image className='photoOfOrder text-center' key={user.id} src={user.cover} wrapped ui={false} style={{width:'30%',height:'auto'}}/>
        ));
        return(
            <div className="right_col" role="main" style={{ minHeight: '100vh' }}>
                <section className="mt-5 pt-5">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12 col-lg-12">
                                <Card>
                                    <Card.Header>
                                        <h3>Book Catalog</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <Table responsive striped id="historyUser" style={{ width: '100%' }}>
                                            <thead>
                                                <tr>
                                                <th>Book ID</th>
                                                        <th>Book Title</th>    
                                                        <th>Action</th>                     
                                                        <th>Book Cover</th>
                                                        <th>Author</th>
                                                        <th>Categories</th>
                                                        <th>Publisher</th>
                                                        
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.catalogData.map((user, index) => {
                                                            return (
                                                                <tr key={index}> 
                                                                    <td>{user.bookCode}</td>
                                                                    <td>{Object.keys(user.bookDetailsEntity?user.bookDetailsEntity:"").map(key => {
                                                                        if (key === "bookTitle"){
                                                                            const judul = (user.bookDetailsEntity[key])
                                                                            return judul;
                                                                        }
                                                                        })}   
                                                                    </td>
                                                                    <td>
                                                                        <span className="d-flex justify-content-center" data-toggle="tooltip" title="detail">
                                                                            <button className="btn btn-primary" data-toggle="modal" data-target="#detail" onClick={() => this.getById(user.id)}>
                                                                                <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                            <button className="btn btn-warning" data-toggle="modal" data-target="#">
                                                                                <i className="fa fa-shopping-cart"></i>
                                                                            </button>
                                                                            <button className="btn btn-info" data-toggle="modal" data-target="#">
                                                                                <i className="fa fa-bookmark"></i>
                                                                            </button>
                                                                        </span>
                                                                    </td>
                                                                    <td>{Object.keys(user.bookDetailsEntity?user.bookDetailsEntity:"").map(key => {
                                                                        if (key === "cover"){
                                                                            const cover = (user.bookDetailsEntity[key])
                                                                            return cover;
                                                                        }
                                                                        })}   
                                                                    </td>
                                                                    <td>{Object.keys(user.authorEntity?user.authorEntity:"").map(key => {
                                                                        if (key === "authorName"){
                                                                            const author = (user.authorEntity[key])
                                                                            return author;
                                                                        }
                                                                        })}   
                                                                    </td>
                                                                    <td>{Object.keys(user.categoryEntity?user.categoryEntity:"").map(key => {
                                                                        if (key === "categoryName"){
                                                                            const category = (user.categoryEntity[key])
                                                                            return category;
                                                                        }
                                                                        })}   
                                                                    </td>
                                                                    <td>{Object.keys(user.publisherEntity?user.publisherEntity:"").map(key => {
                                                                        if (key === "publisherName"){
                                                                            const publisher = (user.publisherEntity[key])
                                                                            return publisher;
                                                                        }
                                                                        })}   
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}

                                                </tbody>
                                        </Table>
                                    </Card.Body>
                                </Card>
                            </div>
                        </div>
                    </div >
                </section >

           

             {/* MODAL INFO */}
             <div className="modal fade" id="detail" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                            <form>
                            <div class="form-group row">
                            <label for="editImage" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10" >
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.description} />           
                            </div>
                            </div>
                            <hr />
                            <div class="form-group row">
                            <label for="editTitle" class="col-sm-2 col-form-label">Number of Pages</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.numberOfPages} />           
                            </div>
                            <label class="col-sm-2 col-form-label">ISBN</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.isbn} />           
                            
                            </div>
                            </div>
                            <div class="form-group row">
                            <label for="editDesc" class="col-sm-2 col-form-label">Published Date</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.publishedDate} />           
                            
                            </div>
                            <label for="editTitle" class="col-sm-2 col-form-label">Language</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.language} />           
                             </div>
                            </div>
                            <div class="form-group row">
                            <label for="editTitle" class="col-sm-2 col-form-label">Publisher</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.publisher} />           
                            </div>
                            <label class="col-sm-2 col-form-label">Subtitle</label>
                            <div class="col-sm-4">
                            <input type="text" readOnly className="form-control-plaintext" value={this.state.bookSubtitle} />           
                            </div>
                            </div>
                        </form>   
                         
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button className="btn btn-primary" data-toggle="modal" data-target="#review" onClick={() => this.review(this.state.bookCode)}>
                                   Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL */}
                <div className="modal fade" id="review" tabIndex="-1" aria-labelledby="infoLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="infoLabel">Info</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                                <div className="modal-body">
                                {this.state.reviewData.map((book, index) => {
                                return(
                                    <form key={index}>
                                            <div class="form-group row">
                                            <label for="editImage" class="col-sm-2 col-form-label">By   
                                            {Object.keys(book.userEntity?book.userEntity:"").map(key => {
                                                if (key === "userName"){
                                                const name = (book.userEntity[key])
                                                return name;
                                                }
                                            })}                       
                                            <br />       
                                            {this.setRate(book.rate)}         
                                            </label>
                                            <div class="col-sm-10" >
                                                {book.review}
                                            </div>
                                            </div>
                                            <hr />
                                    </form>   
                                    );
                                })}  
                                    </div>
                                
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <Button className="btn btn-primary" variant="primary" onClick={this.handleAddReview}>
                                        <i class=""></i> Add Review
                                </Button> 
                             </div>
                        </div>
                    </div>
                </div>                                           

             {/* modal create review */}
            <Modal size="lg" show={addReview} onHide={this.handleCloseAddReview}>
                <Modal.Header closeButton>
                    <Modal.Title> Book Review </Modal.Title>                                     
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='modal-body'>
                            <form>
                            
                                <div class="form-group row">
                                    <div class="col-sm-12 text-center">
                                    <Image className='' src={"https://www.gramedia.com/blog/content/images/2020/05/selena_gramedia.jpg"} wrapped ui={false} style={{width:'20%',height:'auto'}}/>
                                    </div>
                                </div>
                               <div class="form-group row">
                                    <label for="rating" class="col-sm-2 col-form-label">Rating</label>
                                    <div class="col-sm-10">
                                    <Box component="fieldset" mb={3} borderColor="transparent">
                                        <Rating
                                        name="simple-controlled"
                                        rate={value}
                                        name="rating"
                                        onChange={(event, newValue) => {
                                            this.setState({ value: newValue});
                                        }}
                                        
                                        />
                                    </Box>           
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label for="editRev" class="col-sm-2 col-form-label">Review</label>
                                    <div class="col-sm-10">
                                    <textarea class="form-control" id="editDesc" placeholder="Review..."></textarea>
                                    </div>
                              </div>
                            </form>                   
                        </div>
                    </div>                                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseAddReview}>
                        <i class="fa fa-times-circle"></i> Close
                    </Button> 
                </Modal.Footer>
            </Modal>                                         
             {/* modal create review */}

            </div >                
        )
    }
}

export default Catalog