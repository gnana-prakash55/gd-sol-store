import React,{useState,useEffect} from 'react'
import {getProducts} from './helper/coreApicalls';

import Base from './Base'
import '../styles.css'
import Cards from './Cards'

export default function Home() {
    
    const [products,setProducts] = useState([])
    const [error,setError] = useState(false)
    


    const loadAllProducts = () => {
        getProducts()
        .then(data => {
            if(data.error){
                setError(data.error)
                console.log(error)
            } else {
                setProducts(data)
            }
        });

    };

    useEffect(()=>{
        loadAllProducts();
},[]);

    return (
        <Base title="Home Page" description="My Description">
            <h1>Home Component</h1>
            <div className="row">
                {products.map((product,index) => {
                    return(
                        <div key={index}>
                            <Cards product= {product} />
                       </div>
                    );
                })}
            </div>
        </Base>
    )
}
