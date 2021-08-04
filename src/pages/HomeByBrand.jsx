import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Navbar } from "react-bootstrap";
import Calculator from "../components/Calculator/Calculator";
import { Link, useParams } from "react-router-dom";
import cardImage from "../assets/card.png";
import cartPasport from "../assets/passport.jpg";
import { VscClose } from "react-icons/vsc";
import '../components/Product/product.scss'

const HomeByBrand = (props) => {
  const api = "https://admin.sportmix.uz";
  const [selectedProduct, setselectedProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [prodOrder, setProdOrder] = useState([]);
  const [prodOrderPrice, setProdOrderPrice] = useState([]);
  const [clientName, setName] = useState("");
  const [clientphoneNumber, setPhoneNumber] = useState("");
  const [openModalClass, setOpenModalClass] = useState("modalSectionHidden");
  const [successModal, setSuccessModal] = useState("forHidden");
  const orderPriceSplite = Number(prodOrderPrice).toLocaleString();
  const [filteredData, setFilteredData] = useState();
  const [wordEntered, setWordEntered] = useState("");
  const [notFound, setNotFound] = useState();
  const { id } = useParams();
console.log(id)
  useEffect(() => {
    window.scroll(0,0)
  },[id]);
  
  /// filter brands
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
    var forSend = `🏪 Магазин: ${prodOrder}%0A💵 Наличными%0A%0A👥Имя: ${clientName}%0A📞Тел: ${clientphoneNumber}%0A📦Товар: ${order}%0A💵Итого: ${orderPriceSplite} сум%0A https://admin.sportmix.uz/uploads/${selectedProduct.image}`;
    var token = "1745885286:AAGnCac1rJJnQI2XIAUW8LL2_RN2MHN-SVE";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_ID}&text=${forSend}`;
    api.open("GET", url, true);
    api.send();
    setName("");
    setPhoneNumber("");
    setSuccessModal("modalSuccessSubmit");
    setOpenModalClass("forHidden");
  };
  
  //search
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(searchWord);
    const searchResult = props.product.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (event === "") {
      setFilteredData([]);
    } else {
      setFilteredData(searchResult);
    }
    if (searchResult.length === 0) {
        setNotFound(<h5 style={{textAlign:"center"}}>Ничего не найдено :(</h5>);
      }
  };
  
  useEffect(() => {
    setNotFound()
  }, [wordEntered])
  
  return (
    <>
      <div className="headerContent">
        <Container>
          <Row style={{ alignItems: "center" }}>
            <Col>
              <Navbar expand="lg">
                <Navbar.Brand className="logoBox">
                  {props.brands.map((brand, i) => {
                    return id === brand.link ? (
                      <div className="brandContent" key={i}>
                        <img
                          className="brandLogo"
                          key={i}
                          src={api + "/uploads/" + brand.image}
                          alt={brand.name}
                        />
                        <div className="brandName">{brand.name}</div>
                      </div>
                    ) : (
                      console.log("")
                    );
                  })}
                </Navbar.Brand>
              </Navbar>
            </Col>
            <Col>
              <div className="callButton">
                <a href="tel:+998712000277">
                  <Button variant="outline-dark">+998 71 200-02-77</Button>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
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
                <Link to={`/${id}/${categories.link}`}>
                  <div
                    className="imgBoxCat"
                  >
                    <div className="circle"></div>
                    <img src={api + "/uploads/" + categories.image} alt="" />
                  </div>
                  <div className="CatText">{categories.name}</div>
                </Link>
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
          <Row>
          {notFound
              ? notFound
              : (filteredData ? filteredData : props.product).map(
                  (product, i) => {
                    return id === product.brand_name ?
                    <Col
                      lg="3"
                      md="4"
                      xs="6"
                      key={i}
                      onClick={() => setselectedProduct(product)}
                    >
                      <div className="procuctCard">
                        <div className="imgBox">
                          <img
                              src={api+"/uploads/"+
                               product.image
                            }
                            alt=""
                          />
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
                              <div
                                className="orderr"
                                onClick={() => {
                                  setOpenModalClass("modalSection");
                                }}
                              >
                                <Button
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
                              <Button
                                variant="outline-dark"
                                className="buttonkupitVrasrochka rassrochka"
                                href="#calcBox"
                              >
                                Рассрочку
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  :""}
                )}
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

      <div className="footerSection">
        <Container>
          <Row className="footer-row">
            <Col lg="4" md="4" sm="12">
              <div className="logoBoxFooter">
                {props.brands.map((brand, i) => {
                  return id === brand.link ? (
                    <div className="brandContent" key={i}>
                      <img
                        className="brandLogo"
                        key={i}
                        src={api + "/uploads/" + brand.image}
                        alt={brand.name}
                      />{" "}
                      <div className="brandName">{brand.name}</div>
                    </div>
                  ) : (
                    console.log("")
                  );
                })}
              </div>
            </Col>
            <Col lg="4" md="4" sm="12">
              <div className="bezperviynachalnovo-vzos">
                <span>0 сум</span> - Без первоначального взноса
              </div>
            </Col>
            <Col lg="4" md="4" sm="12">
              <div className="left-footer-box">
                <div className="footerCardImg">
                  <img src={cardImage} alt="" />
                </div>
                <div className="footerCardImg2">
                  <img src={cartPasport} alt="" />
                </div>
                <div className="footerText">
                  Для оформления договора требуется копия паспорта и пластиковой
                  карты.
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HomeByBrand;
