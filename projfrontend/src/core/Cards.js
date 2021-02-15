import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import {Redirect} from 'react-router-dom'
import {addItemCart, removeItemFromCart} from './helper/carthelper'
import { isAuthenticated } from "../auth/helper";
// import Imagehelper from './helper/Imagehelper'



function Cards({ product, addtoCart = true, removeCart = false ,reload= undefined,setReload=f=>f}) {
  const cardTitle = product ? product.name : "Default name";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default price";

  const [redirect,setRedirect] = useState(false)
  

  const addToCart = () => {
    if(isAuthenticated()){
      addItemCart(product,() => {setRedirect(true)})
      console.log("Added to Cart");
    } else {
      console.log("Please Login")
    }
  }

  const getAredirect = (redirect) => {
    if (redirect){
      return <Redirect to="/cart" />
    }
  }

  const showAddToCart = (addToCart) => {
    return (addtoCart && (
      <Button onClick={addToCart} variant="outline-success" block>
      Add to Cart
    </Button>
    ))
  }

  const showremoveCart = (removeCart) => {
      return (removeCart &&
       ( <Button onClick={() => {
         removeItemFromCart(product.id)
         setReload(!reload)
         console.log("Object removed from Cart")
       }} variant="outline-danger" block>
            Remove from cart
          </Button>)
      )
  }

  return (
    <div className="text-center p-3">
      {getAredirect(redirect)}
      <Card className="bg-light border" style={{ width: "20rem" }}>
        <Card.Img
          style={{ height: "50vh", width: "auto" }}
          className="mb-3 rounded"
          variant="top"
          src={product.image}
        />
        <Card.Body>
          <Card.Title className="text-dark">{cardTitle}</Card.Title>
          <Card.Text className="text-muted">{cardDescription}</Card.Text>
          <Card.Text className="bg-success">${cardPrice}</Card.Text>
          {showAddToCart(addToCart)}
          {showremoveCart(removeCart)}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
