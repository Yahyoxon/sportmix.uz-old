import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import Calculator from "../../components/Calculator/Calculator";
import "./product.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import { Link } from "react-router-dom";
import { VscClose } from "react-icons/vsc";
// import Pagination from "react-js-pagination";
import LazyLoad from 'react-lazyload';

const Product = (props) => {
  const uploadURL = "https://admin.sportmix.uz/uploads/";
  const [selectedProduct, setselectedProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [prodOrder, setProdOrder] = useState([]);
  const [prodOrderPrice, setProdOrderPrice] = useState([]);
  const [clientName, setName] = useState("");
  const [region, setRegion] = useState("Ташкент");
  const [quantity, setQuantity] = useState("1");
  const [clientphoneNumber, setPhoneNumber] = useState("");
  const [openModalClass, setOpenModalClass] = useState("modalSectionHidden");
  const [successModal, setSuccessModal] = useState("forHidden");
  const orderPriceSplite = Number(prodOrderPrice).toLocaleString();
  const [filteredData, setFilteredData] = useState();
  const [wordEntered, setWordEntered] = useState("");
  const [notFound, setNotFound] = useState();
  const [activePageData, setActivePageData] = useState([]);
  // const [activePage, setActivePage] = useState(1);
  // const [resultProduct, setResultProduct] = useState(props.product);

  // //Pagination
  // const handlePageChange = (pageNumber) => {
  //   console.log(`active page is ${pageNumber}`);
  //   setActivePage(pageNumber);
  // };
  // const perPageProduct = 20;
  // let paginationProduct = [];

  // const fetchProducts = () => {
  //   for (
  //     let k = activePage * perPageProduct - perPageProduct;
  //     k < 1 * perPageProduct;
  //     k++
  //   ) {
  //     paginationProduct[k] = props.product[k];
  //   }
  //   setResultProduct(paginationProduct);
  // };
  // useEffect(() => {
  //    fetchProducts();
  // },[activePage,props.product]);

  //  filter brands
  var chat_ID = "-1001247339615";
  for (let i = 0; i < props.brands.length; i++) {
    if (selectedProduct.brand_name === props.brands[i].link) {
      chat_ID = props.brands[i].telegram_chat_id || "-1001247339615";
    }
  }
  /// send telegram group
  const onSubmitModal = (e) => {
    e.preventDefault();
    let api = new XMLHttpRequest();
    var forSend = `🏪 Магазин: ${prodOrder}%0A💵 Наличными%0A%0A👥 Имя: ${clientName}%0A📞 Тел: ${clientphoneNumber}%0A📦 Товар: ${order}%0A💵 Итого: ${orderPriceSplite} сум%0A📍 Регион: ${region}%0A🖇 Количество: ${quantity}%0A%0A https://admin.sportmix.uz/uploads/${selectedProduct.image}`;
    var token = "1745885286:AAGnCac1rJJnQI2XIAUW8LL2_RN2MHN-SVE";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_ID}&text=${forSend}`;
    api.open("GET", url, true);
    api.send();
    setName("");
    setPhoneNumber("");
    setRegion("");
    setQuantity("");
    setSuccessModal("modalSuccessSubmit");
    setOpenModalClass("forHidden");
  };
  //search
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const searchResult = props.product.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (event === "") {
      setFilteredData([]);
    } else {
      setFilteredData(searchResult);
    }
    if (searchResult.length === 0) {
      setNotFound(
        <h5 style={{ textAlign: "center" }}>Ничего не найдено :(</h5>
      );
    }
  };
  useEffect(() => {
    setNotFound();
  }, [wordEntered]);

  useEffect(() => {
    const handleProductActive = () => {
      const activeProducts = [];
      for (let l = 0; l < props.product.length; l++) {
        if (props.product[l].order_type !== "none") {
          activeProducts[l] = props.product[l];
          setActivePageData(activeProducts);
        }
      }
    };
    handleProductActive();
  }, [props.product]);
  return (
    <>
      <Calculator
        brands={props.brands}
        CalcProductDB={props.product}
        selectedProduct={selectedProduct}
      />
      <Container>
        <Row>
          <Col>
            <div className="kategoriy">Категории</div>
          </Col>
        </Row>
        <Row>
          {props.category.map((categories, i) => {
            return (
              <Col key={i} lg="2" md="3" sm="3" xs="3">
                <div className="catBox">
                  <Link to={`/categories/${categories.link}`}>
                    <div className="imgBoxCat">
                      <div className="circle"></div>
                      <img src={uploadURL + categories.image} alt="" />
                    </div>
                  </Link>
                  <div className="CatText">{categories.name}</div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
      <div className="productComponent">
        <Container>
          <Row>
            <Col>
              <div className="searchContainer">
                <input
                  className="form-control searchInput"
                  type="text"
                  placeholder="Поиск товаров..."
                  value={wordEntered}
                  onChange={handleFilter}
                />
              </div>
              <br />
            </Col>
          </Row>
          <Row id="products">
            {notFound
              ? notFound
              : activePageData &&
              (filteredData ? filteredData : activePageData).map(
                (product, i) => (
                  <Col
                    lg="3"
                    md="4"
                    xs="6"
                    key={i}
                    onClick={() => setselectedProduct(product)}
                  >
                    <div className="procuctCard">
                      <div className="imgBox">
                        <LazyLoad height={300}>
                          <img src={uploadURL + product.image} alt="" />
                        </LazyLoad>
                        <div className="moreInfo">
                          <Link to={`/product/${product.id}`}>подробные</Link>
                        </div>
                      </div>
                      <div className="productTexts">
                        <h2 className="productName">{product.name}</h2>
                        <div className="priceAndbutton">
                          <p className="productPrice">
                            {Number(product.price).toLocaleString()} сум
                          </p>
                          <div className="bottomButtons">
                            {product.order_type === "all" ||
                              product.order_type === "" ||
                              product.order_type === "order" ? (
                              <div
                                className="orderr"
                                onClick={() => {
                                  setOpenModalClass("modalSection");
                                }}
                              >
                                <Button
                                  width="100%"
                                  variant="outline-dark"
                                  className="buttonkupitVrasrochka"
                                  onClick={() => {
                                    setOrder(product.name);
                                    setProdOrder(product.brand_name);
                                    setProdOrderPrice(product.price);
                                  }}
                                >
                                  Заказать
                                </Button>
                              </div>
                            ) : (
                              ""
                            )}
                            {product.order_type === "all" ||
                              product.order_type === "" ||
                              product.order_type === "installment" ? (
                              <Button
                                variant="outline-dark"
                                className="buttonkupitVrasrochka rassrochka"
                                href="#calcBox"
                              >
                                Рассрочку
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                )
              )}
          </Row>
          <Row>
            {/* <Pagination
              activePage={activePage}
              itemsCountPerPage={perPageProduct}
              totalItemsCount={216}
              pageRangeDisplayed={5}
              onChange={handlePageChange}
            /> */}
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
                  <Form.Group className="w-100">
                    <Form.Label className="w-100 mt-4">Имя</Form.Label>
                    <Form.Control

                      type="text"
                      onChange={(e) => setName(e.target.value)}
                      required
                      value={clientName}
                    />
                  </Form.Group>
                  <Form.Group className="w-100">
                    <Form.Label className="w-100">Номер телефона</Form.Label>
                    <Form.Control
                      type="tel"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+998901234567"
                      required
                      value={clientphoneNumber}
                    />
                  </Form.Group>
                  <Form.Group className="w-100">
                    <Form.Label className="w-100">Выберите регион</Form.Label>
                    <Form.Control as="select" onChange={(e) => setRegion(e.target.value)} required >
                      <option selected value="Ташкент">Ташкент</option>
                      <option value="Ташкентская область">Ташкентская область	</option>
                      <option value="Андижанская область">Андижанская область</option>
                      <option value="Бухарская область">Бухарская область</option>
                      <option value="Джизакская область">Джизакская область</option>
                      <option value="Кашкадарьинская область">Кашкадарьинская область</option>
                      <option value="Навоийская область">Навоийская область</option>
                      <option value="Наманганская область">Наманганская область</option>
                      <option value="Самаркандская область">Самаркандская область</option>
                      <option value="Сурхандарьинская область">Сурхандарьинская область</option>
                      <option value="Сырдарьинская область">Сырдарьинская область</option>
                      <option value="Ферганская область">Ферганская область</option>
                      <option value="Хорезмская область">Хорезмская область	</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="w-100">
                    <Form.Label className="w-100">Количество</Form.Label>
                    <Form.Control as="select" onChange={(e) => setQuantity(e.target.value)} required >
                      <option selected value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Form.Control>
                  </Form.Group>
                  <input
                    type="hidden"

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

        <Container>
          <Row>
            <div className="brands">
              <div className="mt-4"></div>
              <h2 className="magazine">Магазины</h2>
              <div className="mb-4"></div>
              <Swiper
                className="mySwiper"
                breakpoints={{
                  320: {
                    slidesPerView: 3.5,
                  },
                  480: {
                    slidesPerView: 4.5,
                  },
                }}
              >
                {props.brands.map((brands, i) => {
                  return (
                    <SwiperSlide className="brand" key={i}>
                      <Link to={`/${brands.link}`} className="brandImage">
                        <div className="circle"></div>
                        <img src={uploadURL + brands.image} alt="" />
                      </Link>
                      <div className="brandsText">{brands.name}</div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default Product;
