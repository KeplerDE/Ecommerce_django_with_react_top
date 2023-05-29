import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails } from "../actions/productActions";

function ProductScreen() {
   const [qty, setQty] = useState(1)

   const match = useParams()
   const dispatch = useDispatch()
   const history = useNavigate();

   const productDetails = useSelector(state => state.productDetails)
       const { loading, error, product } = productDetails
   useEffect(() => {
       dispatch(listProductDetails(match.id))

   }, [dispatch, match]);

   const addToCartHandler = () => {
       history(`/cart/${match.id}?qty=${qty}`)
   }


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

                                  {product.countInStock > 0 && (
                                      <ListGroup.Item>
                                          <Row>
                                              <Col>Qty</Col>
                                              <Col xs='auto' className='my-1'>
                                                  <Form.Control
                                                      as="select"
                                                      value={qty}
                                                      onChange={(e) => setQty(e.target.value)}
                                                  >
                                                      {

                                                          [...Array(product.countInStock).keys()].map((x) => (
                                                              <option key={x + 1} value={x + 1}>
                                                                  {x + 1}
                                                              </option>
                                                          ))
                                                      }
34
                                                  </Form.Control>
                                              </Col>
                                          </Row>
                                      </ListGroup.Item>
                                  )}
                                  <ListGroup.Item>
                                      <Button
                                          onClick={addToCartHandler}
                                          className='btn-block'
                                          type='button'
                                          disabled={product.countInStock == 0}>
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
