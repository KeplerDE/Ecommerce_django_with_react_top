import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
   const match = useParams()
   const dispatch = useDispatch()

   const productDetails = useSelector(state => state.productDetails)
       const { loading, error, product } = productDetails
    useEffect(() => {
        dispatch(listProductDetails(match.id))

    }, [dispatch, match]);



  return (
      <div>
          <Link to='/home' className='btn btn-light my-3'>Go Back</Link>
          {loading ?
              <Loader />
              : error
                  ? <Message variant='danger'>{error}</Message>
              :(
                  <Row>
                      <Col md={5}>
                          <Image src={product.image} alt={product.name} fluid />
                      </Col>

                      <Col md={5}>
                          <ListGroup variant="flush">
                              <ListGroup.Item>
                                  <h3>{product.name}</h3>
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8bc25'} />
                              </ListGroup.Item>

                              <ListGroup.Item>
                                  Price: £{product.price}
                              </ListGroup.Item>
                          </ListGroup>

                          <ListGroup.Item>
                              Description: {product.description}
                          </ListGroup.Item>
                      </Col>

                      <Col md={3}>
                          <Card>
                              <ListGroup variant='flush'>
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Price:</Col>
                                          <Col>
                                              <strong>$ {product.price}</strong>
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>
                              </ListGroup>
                              <ListGroup variant='flush'>
                                  <ListGroup.Item>
                                      <Row>
                                          <Col>Status:</Col>
                                          <Col>
                                              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                          </Col>
                                      </Row>
                                  </ListGroup.Item>

                                  <ListGroup.Item>
                                      <Button className='btn-block' type='button' disabled={product.countInStock == 0}>
                                          Add to Cart
                                      </Button>

                                  </ListGroup.Item>
                              </ListGroup>
                          </Card>
                      </Col>
                  </Row>
              )
          }


      </div>
  )
}

export default ProductScreen
