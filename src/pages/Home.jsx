import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Product from "../components/Product/Product";


const Home = (props) => {


  return (
    <>
      <Header />
      <Product product={props.product} category={props.category} brands={props.brands} />
      <Footer />
    </>
  );
};

export default Home;
