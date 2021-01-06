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
            id: "",
            bookCode: "",
            bookTitle: "",
            cover: "",
            authorName: "",
            categoryName: "",
            publisherName: "",
            
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
            value: 0,
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

    rating = (event, newValue) => {
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
                                                                    <td>
                                                                        <span className="d-flex justify-content-center" data-toggle="tooltip" title="detail">
                                                                            <button className="btn btn-primary" data-toggle="modal" data-target="#detail" onClick={this.handleShowDetail}><i className="fa fa-info-circle"></i></button>
                                                                        </span>
                                                                    </td>
                                                                    <td>{user.bookTitle}</td>
                                                                    <td>{user.authorName}</td>
                                                                    <td>{user.categoryName}</td>
                                                                    <td>{user.publisherName}</td>
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

            {/* modal detail */}
            <Modal size="lg" show={showDetail} onHide={this.handleCloseDetail}>
                <Modal.Header closeButton>
                    <Modal.Title> Book  Detail </Modal.Title>                                     
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='modal-body'>
                            <form>
                            <div class="form-group row">
                            <label for="editImage" class="col-sm-2 col-form-label">Description</label>
                            <div class="col-sm-10" >
                                <p>"Selena" dan "Nebula" adalah buku ke-8 dan ke-9 yang menceritakan siapa orangtua Raib dalam serial petualangan dunia paralel. Dua buku ini sebaiknya dibaca berurutan. Kedua buku ini juga bercerita tentang Akademi Bayangan Tingkat Tinggi, sekolah terbaik di seluruh Klan Bulan. Tentang persahabatan tiga mahasiswa, yang diam-diam memiliki rencana bertualang ke tempat-tempat jauh. Tapi petualangan itu berakhir buruk, saat persahabatan mereka diuji dengan rasa suka, egoisme, dan pengkhianatan. Ada banyak karakter baru, tempat-tempat baru, juga sejarah dunia paralel yang diungkap. Di dua buku ini kalian akan berkenalan dengan salah satu karakter paling kuat di dunia paralel sejauh ini. Tapi itu jika kalian bisa menebaknya. Dua buku ini bukan akhir. Justru awal terbukanya kembali portal menuju Klan Aldebaran.</p>
                            </div>
                            </div>
                            <hr />
                            <div class="form-group row">
                            <label for="editTitle" class="col-sm-2 col-form-label">Number of Pages</label>
                            <div class="col-sm-4">
                                <p>368</p>
                            </div>
                            <label class="col-sm-2 col-form-label">ISBN</label>
                            <div class="col-sm-4">
                                <p>9786020639512</p>
                            </div>
                            </div>
                            <div class="form-group row">
                            <label for="editDesc" class="col-sm-2 col-form-label">Published Date</label>
                            <div class="col-sm-4">
                                <p>20 Mar 2016</p>
                            </div>
                            <label class="col-sm-2 col-form-label">Weight</label>
                            <div class="col-sm-4">
                                <p>0.25 kg</p>
                            </div>
                            </div>
                            <div class="form-group row">
                            <label for="editTitle" class="col-sm-2 col-form-label">Language</label>
                            <div class="col-sm-4">
                                <p>Indonesia</p>
                            </div>
                            <label class="col-sm-2 col-form-label">Width</label>
                            <div class="col-sm-4">
                                <p>13.5 cm</p>
                            </div>
                            </div>
                            <div class="form-group row">
                            <label for="editTitle" class="col-sm-2 col-form-label">Publisher</label>
                            <div class="col-sm-4">
                                <p>Gramedia Pustaka Utama</p>
                            </div>
                            <label class="col-sm-2 col-form-label">Length</label>
                            <div class="col-sm-4">
                                <p>20.0 cm</p>
                            </div>
                            </div>
                        </form>                         
                        </div>
                    </div>                                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-info" variant="secondary" onClick={this.handleShowReview}>
                            <i class="fa fa-book"></i> Review
                    </Button> 
                    <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseDetail}>
                            <i class="fa fa-times-circle"></i> Close
                    </Button> 
                </Modal.Footer>
            </Modal>                                         
             {/* modal detail */}

             {/* modal review */}
            <Modal size="lg" show={showReview} onHide={this.handleCloseReview}>
                <Modal.Header closeButton>
                    <Modal.Title> Book  Review </Modal.Title>                                     
                </Modal.Header>
                <Modal.Body>
                    <div className='container'>
                        <div className='modal-body'>
                            <form>
                                <div class="form-group row">
                                    <label for="editImage" class="col-sm-2 col-form-label">By Afiff <br /><span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    <span class="fa fa-star"></span>
                                    </label>
                                    <div class="col-sm-10" >
                                        <p>Tarik napas....fiuhhhhhhh..
                                        Selesai juga baca buku ke-8 series tersayang sekaligus terkampret ini, kampret krn buku pertama terbit dr 2015, 5 tahun umurku aku pake buat nunggu buku ini🤣 Buku serial bumi ini menceritakan tentang biografi Selena (pasti tau dong siapa dia kalau ngikutin).</p>
                                    </div>
                                    </div>
                                    <hr />
                                    <div class="form-group row">
                                    <label for="editImage" class="col-sm-2 col-form-label">By Desti <br /> <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    </label>
                                    <div class="col-sm-10" >
                                        <p>** spoiler alert ** Selena dan Nebula.

                                        Satu, eh, dua buku fantasi yang dibumbui romantika. Diulang: fantasi dibumbui romantika, bukan romantika berbumbu fantasi—seperti kata Tere Liye di salah satu status Facebooknya, "... membaca kisah roman dalam serial fantasi ..." Tapi, tenang. Karena cerita utamanya genre fantasi—bukan roman—nggak ada adegan bergalau ria disini. </p>
                                    </div>
                                    </div>
                                    <hr />
                                    <div class="form-group row">
                                    <label for="editImage" class="col-sm-2 col-form-label">By omnivoreader <br /><span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    </label>
                                    <div class="col-sm-10" >
                                        <p>Iseng mulai baca, eh keterusan sampai selesai.
                                        Kisah tentang Miss Selena ini seru juga ya. Sejarah akan guru matematikanya Raib dan kawan-kawannya ini ternyata asyik juga diikuti. Dan untuk masalah tentang dua sahabatnya alias Mata dan Tazk mah udah jelas lah ya siapa mereka.</p>
                                    </div>
                                    </div>
                                    <hr />
                                    <div class="form-group row">
                                    <label for="editImage" class="col-sm-2 col-form-label">By  Hamim <br /><span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star checked"></span>
                                    <span class="fa fa-star"></span>
                                    </label>
                                    <div class="col-sm-10" >
                                        <p>Bagi yang telah menunggu kelanjutan pertualangan raib, Ali Dan seli pasti udah ga sabar pengen baca cerita nya..
                                        Ets tapi harus bersabar karena buku ke 8 ini banyak menceritakan tokoh baru yang pasti bakal bikin kalian penasaran.
                                        Jelas sekali di judul nya, siapa yang tidak kenal dengan nama itu, yaps</p>
                                    </div>
                                </div>
                            </form>                   
                        </div>
                    </div>                                                            
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseReview}>
                            <i class="fa fa-times-circle"></i> Close
                    </Button> 
                    <Button className="btn btn-primary" variant="primary" onClick={this.handleAddReview}>
                            <i class=""></i> Add Review
                    </Button> 
                </Modal.Footer>
            </Modal>                                         
             {/* modal review */}

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
                                        
                                        onClick={this.rating}
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

             {/* modal add */}
             <Modal size="lg" show={showAddCategory} onHide={this.handleCloseCategory}>
                      <Modal.Header closeButton>
                        <Modal.Title>Add Book Data</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <div class='container'>
                          <div class="modal-body">
                            <form
                              noValidate
                              autoComplete="off"
                            >
                              <div class="form-group row">
                                <label for="addCategoryCode" class="col-sm-2 col-form-label">Category Code</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    name="categoryCode"
                                    class="form-control" 
                                    id="addCategoryCode" 
                                    placeholder="Category Code..." 
                                    value={fields.categoryCode} 
                                    data-attribute-name="Category Code"
                                    data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.categoryCode ? errors.categoryCode : ""}
                                  </label>
                                </div>
                              </div>
                              <div class="form-group row">
                                <label for="addCategoryCode" class="col-sm-2 col-form-label">Category Name</label>
                                <div class="col-sm-10">
                                  <input 
                                    type="text" 
                                    name="categoryName"
                                    class="form-control" 
                                    id="addCategoryCode" 
                                    placeholder="Category Name..." 
                                    value={fields.categoryName} 
                                    data-attribute-name="Category Name"
                                    data-async
                                  />
                                  <label className="error" style={{color: "red"}}>
                                    {errors.categoryName ? errors.categoryName : ""}
                                  </label>
                                </div>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button className="btn btn-secondary" variant="secondary" onClick={this.handleCloseCategory}>
                          <i class="fa fa-times-circle"></i> Close
                        </Button>
                        <Button id="buttonAddBook" disabled={disableSubmitting} type="submit" className="btn btn-success" variant="primary" onClick={this.handleAddCategory}>
                          <i class="fa fa-plus"></i> Add
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal add */}

            </div >                
        )
    }
}

export default Catalog