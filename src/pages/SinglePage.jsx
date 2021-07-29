import React from 'react'
import Header from "../components/Header/Header";
import SingleProduct from "../components/SingleProduct/SingleProduct";

const SinglePage = (props) => {
    return (
        <>
          <Header/>
          <SingleProduct  product={props.product} category={props.category} brands={props.brands} />  
        </>
    )
}

export default SinglePage
