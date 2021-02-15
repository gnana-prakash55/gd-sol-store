import React, { useEffect, useState } from 'react'
import Base from './Base'
import Cards from './Cards'
import {loadCart} from './helper/carthelper'
import PaymentB from './PaymentB'



function Cart() {
    const [products,setProducts] = useState([])
    const [reload,setReload] = useState(false)

    const loadCartProducts = (products) => {
        return(
            <div>
                {products.map((product,index) => {
                    return(
                        <div key={index}>
                            <Cards product= {product}
                                    removeCart ={true}
                                    addtoCart = {false}
                                    reload={reload}
                                    setReload = {setReload}
                            />
                       </div>
                    );
                })}
            </div>
        )
       
    };

    useEffect(()=>{
        setProducts(loadCart());
},[reload]);

    return (
        <Base title="Your Cart" description="Welcome to Cart">
            <div className="row">
                <div className="col-6">
                {loadCart().length===0?<h3>No Products😞 </h3>:loadCartProducts(products)}
                </div>
                <div className="col-6">
                    {
                        products.length > 0 ?
                        (
                            <PaymentB products={products} setReload={setReload}/>
                        ):
                        (
                            <h3>Add something in Cart</h3>
                        )
                    }
                </div>
            </div>
            
        </Base>
    )
}

export default Cart
