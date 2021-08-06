import React, { useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./singleproduct.scss";
import Footer from "../Footer/Footer";
import { VscClose } from "react-icons/vsc";
import "../../components/Product/product.scss";

const SingleProduct = ({ product, brands }) => {
  const history = useHistory();
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  const [singleProductBrand, setSingleProductBrand] = useState({});
  const [prodOrder, setProdOrder] = useState([]);
  const [prodOrderPrice, setProdOrderPrice] = useState([]);
  const [clientName, setName] = useState("");
  const [clientphoneNumber, setPhoneNumber] = useState("");
  const [openModalClass, setOpenModalClass] = useState("modalSectionHidden");
  const [successModal, setSuccessModal] = useState("forHidden");
  const orderPriceSplite = Number(prodOrderPrice).toLocaleString();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let singleProduct = [];
  for (let index = 0; index < product.length; index++) {
    if (product[index].id === id) {
      singleProduct = product[index];
    }
  }
  useEffect(() => {
    const brandFinder = (brand) => {
      for (let i = 0; i < brand.length; i++) {
        if (brand[i].link === singleProduct.brand_name) {
          setSingleProductBrand(brand[i]);
        }
      }
    };
    brandFinder(brands);
  }, [brands, singleProduct.brand_name]);

  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    setMainImage(singleProduct.image);
  }, [product, singleProduct.image]);

  const clickBtn = () => {
    localStorage.setItem("singleProductValue", JSON.stringify(singleProduct));
    history.push("/");
  };
  const chat_ID = singleProductBrand.telegram_chat_id;
  //send telegram
  const onSubmitModal = (e) => {
    // e.preventDefault();
    let api = new XMLHttpRequest();
    var forSend = `🏪 Магазин: ${prodOrder}%0A💵 Наличными%0A%0A👥Имя: ${clientName}%0A📞Тел: ${clientphoneNumber}%0A📦Товар: ${order}%0A💵Итого: ${orderPriceSplite} сум`;
    var token = "1745885286:AAGnCac1rJJnQI2XIAUW8LL2_RN2MHN-SVE";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_ID}&text=${forSend}`;
    api.open("GET", url, true);
    api.send();
    setName("");
    setPhoneNumber("");
    setSuccessModal("modalSuccessSubmit");
    setOpenModalClass("forHidden");
  };

  return (
    <>
      <div className="viewComponent">
        <Container>
          <Row>
            <Col className="centeredCol" lg="6" md="6" sm="12">
              <div className="main-image">
                <img
                  className="oneImage"
                  src={"https://admin.sportmix.uz/uploads/" + mainImage}
                  alt={singleProduct.image}
                />
              </div>
              <div className="images-gallery">
                {singleProduct.gallery_1 ? (
                  <img
                    src={
                      "https://admin.sportmix.uz/uploads/" +
                      singleProduct.gallery_1
                    }
                    alt=""
                    onClick={() => setMainImage(singleProduct.gallery_1)}
                  />
                ) : (
                  ""
                )}
                {singleProduct.gallery_2 ? (
                  <img
                    src={
                      "https://admin.sportmix.uz/uploads/" +
                      singleProduct.gallery_2
                    }
                    alt=""
                    onClick={() => setMainImage(singleProduct.gallery_2)}
                  />
                ) : (
                  ""
                )}
                {singleProduct.gallery_3 ? (
                  <img
                    src={
                      "https://admin.sportmix.uz/uploads/" +
                      singleProduct.gallery_3
                    }
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
              <div className="brandsBox">
                <div className="imageBoxSingle">
                  <Link to={`/${singleProductBrand.link}`}>
                    <img
                      src={
                        "https://admin.sportmix.uz/uploads/" +
                        singleProductBrand.image
                      }
                      alt={singleProductBrand.name}
                    />
                  </Link>
                </div>
                <Link to={`/${singleProductBrand.link}`}>
                  <p className="brand">{singleProductBrand.name}</p>
                </Link>
              </div>

              <p className="price">{Number(singleProduct.price).toLocaleString()} сум</p>
              <p className="desc">{singleProduct.description}</p>
              <div className="singleProductButtons">
                {singleProduct.order_type === "all" ||
                singleProduct.order_type === "" ||
                singleProduct.order_type === "order" ? (
                  <div
                    className="orderr"
                    onClick={() => {
                      setOpenModalClass("modalSection");
                    }}
                  >
                    <Button
                    className="zakazatButton"
                      variant="dark"
                      onClick={() => {
                        setOrder(singleProduct.name);
                        setProdOrder(singleProduct.brand_name);
                        setProdOrderPrice(singleProduct.price);
                      }}
                    >
                      Заказать
                    </Button>
                  </div>
                ) : (
                  ""
                )}
                {singleProduct.order_type === "all" ||
                singleProduct.order_type === "" ||
                singleProduct.order_type === "installment" ? (
                  <Button
                    className="orderButton"
                    onClick={() => {
                      clickBtn();
                    }}
                  >
                    Рассрочку
                  </Button>
                ) : (
                  ""
                )}
              </div>
            </Col>
          </Row>
          <Row>
            <div className={openModalClass}>
              <form className="mainModalContainer" onSubmit={onSubmitModal}>
                <div
                  className="closeBtn"
                  onClick={() => setOpenModalClass("forHidden")}
                >
                  <VscClose />
                </div>
                <div className="inputFormBox">
                  <label htmlFor="">
                    <b>Товар:</b> {order}
                  </label>
                  <input
                    type="text"
                    className="textsModalForm"
                    placeholder="Имя"
                    onChange={(e) => setName(e.target.value)}
                    value={clientName}
                  />
                  <input
                    type="text"
                    className="textsModalForm"
                    placeholder="Номер телефона"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    value={clientphoneNumber}
                  />
                  <input
                    type="hidden"
                    className="textsModalForm"
                    placeholder="product"
                    value={order}
                  />
                  <button type="submit" className="buttonModal">
                    Отправить
                  </button>
                </div>
              </form>
            </div>
            <div className={successModal}>
              <div id="success-icon">
                <div></div>
              </div>
              <svg
                id="close-modal"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                viewBox="0 0 10 10"
                onClick={() => setSuccessModal("forHidden")}
              >
                <line x1="1" y1="-1" x2="9" y2="11" strokeWidth="2.5" />
                <line x1="9" y1="-1" x2="1" y2="11" strokeWidth="2.5" />
              </svg>
              <h3>
                <strong>Ваша заявка успешно отправлена</strong>
              </h3>
            </div>
          </Row>
        </Container>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default SingleProduct;
