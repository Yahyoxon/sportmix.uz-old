import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./singleproduct.scss";
import Footer from "../Footer/Footer";

const SingleProduct = ({ product }) => {
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  
  let singleProduct = [];
  for (let index = 0; index < product.length; index++) {
    if (product[index].id === id) {
      singleProduct = product[index];
    }
  }
  const [mainImage, setMainImage] = useState('');

  useEffect(()=>{
    setMainImage(singleProduct.image)
  },[product,singleProduct.image])
  
  const clickBtn = () => {
    localStorage.setItem("singleProductValue",JSON.stringify(singleProduct))
    history.push("/");
  };
  return (
    <>
      <div className="viewComponent">
        <Container>
          <Row>
            <Col className="centeredCol" lg="6" md="6" sm="12">
              <div className="main-image">
                <img className="oneImage"
                  src={"https://admin.sportmix.uz/uploads/" + mainImage}
                  alt={singleProduct.image}
                />
              </div>
              <div className="images-gallery">
                {singleProduct.gallery_1 ? (
                  <img
                    src={"https://admin.sportmix.uz/uploads/" + singleProduct.gallery_1}
                    alt=""
                    onClick={() => setMainImage(singleProduct.gallery_1)}
                  />
                ) : (
                  ""
                )}
                {singleProduct.gallery_2 ? (
                  <img
                    src={"https://admin.sportmix.uz/uploads/" + singleProduct.gallery_2}
                    alt=""
                    onClick={() => setMainImage(singleProduct.gallery_2)}
                  />
                ) : (
                  ""
                )}
                {singleProduct.gallery_3 ? (
                  <img
                    src={"https://admin.sportmix.uz/uploads/" + singleProduct.gallery_3}
                    alt=""
                    onClick={() => setMainImage(singleProduct.gallery_3)}
                  />
                ) : (
                  ""
                )}
              </div>
            </Col>

            <Col lg="6" md="6" sm="12" className="centeredCol">
              <h3 className="title">{singleProduct.name}</h3>
              <p className="price">{singleProduct.price} сум</p>
              <p className="desc">{singleProduct.description}</p>

              <Button
                variant="dark"
                onClick={() => {
                  clickBtn();
                }}
              >
                Купить в рассрочку
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default SingleProduct;
