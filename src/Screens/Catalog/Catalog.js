import React, { Component } from 'react'
import axios from "../../Services/axios-instance";
import {Card, Table, Modal, Form, Row, Col, Badge, Button } from 'react-bootstrap';
import swal from "sweetalert";
import Image from 'react-bootstrap/Image'
import './Catalog.css'
import AuthService from "../../Services/auth.service";
// Rating
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import API from "../../api";
import api from '../../api';
import { Link } from 'react-router-dom';

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
            userCode: "",
        }
        
    };

    componentDidMount() {
       
    $('.img-book').hover(makeBigger, returnToOriginalSize);
      function makeBigger() {
          $(this).css({width: '+=10%'});
      }
      function returnToOriginalSize() {
          $(this).css({width: "-=10%"});
      }

      axios.get("catalog").then((e) => {
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
        axios.get(`detailBook/${id}`).then((res) => {
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
        const { data } = this.state;
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
                                                                            <Link to={{pathname: `/page/detailpage/${user.bookCode}`}}>
                                                                            <button className="btn btn-primary">
                                                                            <i className="fa fa-info-circle"></i>
                                                                            </button>
                                                                            </Link>                                                             
                                                                            
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
                                                                            return <img class="img-book" className='photoOfOrder text-center card-img-top' src={cover} wrapped ui={false} style={{ width: '20%', height: 'auto', marginLeft: '40%' }} />
                                                                                 
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

  
            </div >                
        )
    }
}

export default Catalog