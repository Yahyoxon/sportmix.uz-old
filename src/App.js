import React, { useState, useEffect } from "react";
import axios from "axios"
import Home from "./pages/Home";
import { BrowserRouter, Route } from "react-router-dom";
import { Switch } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import SinglePage from './pages/SinglePage'
import PageNotFound from "./pages/PageNotFound";
import Admin from "./pages/Admin";
import HomeByBrand from './pages/HomeByBrand';

function App() {
  let user = localStorage.getItem("user")
  if (user === "null") {
    user = null;
    // console.log(user);
  }
  
  const [admin, setAdmin] = useState([])
  const [product, setProduct] = useState([])
  const [category, setCategory] = useState([])
  const [brands, setBrands] = useState([])

  //admin
  useEffect(() => {
    async function getAdmins() {
      const response = await axios.get("https://admin.sportmix.uz/api/admins");
      setAdmin(response.data);
    }
    getAdmins();
  }, []);
  //products
  useEffect(() => {
    async function getProducts() {
      const response = await axios.get("https://admin.sportmix.uz/api/products");
      setProduct(response.data);
    }
    getProducts();
  }, []);
  //categories
  useEffect(() => {
    async function getCategories() {
      const response = await axios.get("https://admin.sportmix.uz/api/categories");
      setCategory(response.data);
    }
    getCategories();
  }, []);
  //brands
  useEffect(() => {
    async function getBrands() {
      const response = await axios.get("https://admin.sportmix.uz/api/brands");
      setBrands(response.data);
    }
    getBrands();
  }, []);



  return (
    <>
      <BrowserRouter >
        <Switch >

          <Route exact path="/" >
            < Home product={product} category={category} brands={brands} />
          </Route>

          <Route path="/product/:id" >
            <SinglePage product={product} category={category} brands={brands} />
          </Route>

          {/* +++++++++++++++++++++ admin ++++++++++++++++++++++ */}

          <Route path="/s-mix-admin" >
            <Admin admin={admin} product={product} category={category} brands={brands} />
          </Route>
        
          {/* filter by brand */}

          <Route path="/:id" >
            < HomeByBrand product={product} category={category} brands={brands} />
          </Route>

          <Route component={PageNotFound}></Route>

        </Switch >
      </BrowserRouter>
    </>
  );
}

export default App;