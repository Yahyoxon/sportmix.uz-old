import React from 'react'
import ProductsByCat from '../components/ProductCatPage/ProductsByCat'

const ProductsCatPage = (props) => {
    return (
        <>
        <ProductsByCat
        brandsProps = {props.brands}
        selectedProductProps={props.product}
        categoriesProps ={props.category}
        />
        </>
    )
}

export default ProductsCatPage
