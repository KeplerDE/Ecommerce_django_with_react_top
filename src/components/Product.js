import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'


/**
 * The props object can contain any number of properties that the parent component wants to pass down to its child component.
 * @returns 
 * Card component
 */
function Product({ product }) {
  return (
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${product._id}`}>
        <Card.Img src={product.image} />
        </a>
        <Card.Body>
            <a href={`/product/${product._id}`}>
                <Card.Title as="div">
                    <strong>{product.name}</strong>
                </Card.Title>
            </a>

            <Card.Text as="div">
                <div className='my-3'>
                    <Rating value={product.rating} text={`${product.NumReviews} reviews`} color={'#f8e825'}/>
                </div>

            </Card.Text>

            <Card.Text as="h3">
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card> 
  )             
}

export default Product
