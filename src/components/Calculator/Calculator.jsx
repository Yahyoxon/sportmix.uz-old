import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./calculator.scss";
import { Link } from "react-router-dom";

const Calculator = (props) => {
  const api = "https://admin.sportmix.uz"
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setmonth] = useState(12);
  const [successMessage, setSuccessMessage] = useState("");
  const singleProductValue = JSON.parse(localStorage.getItem('singleProductValue')) || ''
  const price = props.selectedProduct.price || singleProductValue.price;
  const name = props.selectedProduct.name || singleProductValue.name;
  const image = props.selectedProduct.image || singleProductValue.image;
  const brand = props.selectedProduct.brand_name || singleProductValue.brand;
  let procent = 0.44;
  const handleSelectMonth = (e) => {
    setmonth(e.target.value);
  };
  switch (month) {
    case "3":
      procent = 0.11;
      break;
    case "6":
      procent = 0.23;
      break;
    case "9":
      procent = 0.34;
      break;
    case "12":
      procent = 0.44;
      break;

    default:
      break;
  }
  const ndsPrice =  price * 1.15;
  const resultPrice = ndsPrice + (ndsPrice * procent);
  const num = Number(resultPrice).toLocaleString();
  const numByMonth = Number(Math.trunc(resultPrice / month)).toLocaleString()
  const closeModalButton = () => {
    setSuccessMessage("");
  };
  //onsubmit
 var chat_ID = "-1001247339615"
  for(let i = 0; i< props.brands.length;i++){
    if (brand === props.brands[i].link) {
      chat_ID = props.brands[i].telegram_chat_id || "-1001247339615"
    }
  }
    
  const onSubmit = (e) => {
    e.preventDefault();
    let api = new XMLHttpRequest();
    var forSend = `🏪 Магазин: ${brand}%0A⏰ Рассрочку%0A%0A👥Имя: ${username}%0A📞Тел: ${phone}%0A📦Товар:+${name}%0A%0A📅Месяц: ${month}%0A💵Итого: ${num} сум%0A🌙Ежемесячная выплата: ${numByMonth} сум%0A https://admin.sportmix.uz/uploads/${image}`;
    var token = "1745885286:AAGnCac1rJJnQI2XIAUW8LL2_RN2MHN-SVE";
    var url = `https://api.telegram.org/bot${token}/sendMessage?chat_id=${chat_ID}&text=${forSend}`;
    api.open("GET", url, true);
    api.send();
    setUsername("");
    setPhone("");
    if (name) {
    setSuccessMessage(
      <div className="modalSuccess">
        <div id="success-icon">
          <div></div>
        </div>
        <svg
          id="close-modal"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 10 10"
          onClick={closeModalButton}
        >
          <line x1="1" y1="-1" x2="9" y2="11" strokeWidth="2.5" />
          <line x1="9" y1="-1" x2="1" y2="11" strokeWidth="2.5" />
        </svg>
        <h3>
          <strong>Ваша заявка успешно отправлена!</strong>
        </h3>
      </div>
    );}
    else  {
      setSuccessMessage(
        <div className="modalSuccess">
          <div id="failure-icon">
            <div></div>
          </div>
          <svg
            id="close-modal"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 10 10"
            onClick={closeModalButton}
          >
            <line x1="1" y1="-1" x2="9" y2="11" strokeWidth="2.5" />
            <line x1="9" y1="-1" x2="1" y2="11" strokeWidth="2.5" />
          </svg>
          <h3>
            <>Неудачная попытка! Нажмите на кнопку «рассрочку» товара, который хотите купить, чтобы оставить заявку!</>
          </h3>
        </div>
      );}
    
   
  };
  

  return (
    
    <div id="calcBox">
      <Container>
        <Row>
          <Col>
            <h1 className="generalTitle">Калькулятор рассрочки</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="selectedProductImage">
              <img src={api + "/uploads/" + image} alt="" />
            </div>
          </Col>
          {name ? (
            <Col>
              <div className="selectedProductImage">
                <Link to={`/product/${props.selectedProduct.id || singleProductValue.id }`}>
                  Свойства товаров
                </Link>
              </div>
            </Col>
          ) : (
            <div className="selectedProductImage"></div>
          )}
        </Row>
        <Row>
          <Col lg="3" md="3" xs="6" className="mb-4">
            <div className="selectedProduct">
              <div className="title">Название товара</div>
              <div className="selectedProductName">
                {name ? name : "не выбрано"}
              </div>
            </div>
          </Col>

          <Col lg="3" md="3" xs="6" className="mb-4">
            <div className="selectionBox">
              <div className="title">Срок рассрочки</div>
              <select
                onChange={handleSelectMonth}
                className="creditMonthSelect"
                name="month"
                id="month"
              >
                <option value="12">12 месяц</option>
                <option value="9">9 месяц</option>
                <option value="6">6 месяц</option>
                <option value="3">3 месяц</option>
              </select>
            </div>
          </Col>
          <Col lg="3" md="3" xs="6">
            <div className="perMonthPayment">
              <div className="title">Ежемесяцный платёж</div>
              <div className="valuePermonth value">
                {resultPrice
                
                  ? Number(Math.trunc(resultPrice / month)).toLocaleString()
                  : 0}
                сум
              </div>
            </div>
          </Col>
          <Col lg="3" md="3" xs="6">
            <div className="totalPayment">
              <div className="title">Итого с учетом рассрочки</div>
              <div className="valueTotal value">
                {resultPrice ? num : 0} сум
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col
            lg="4"
            md="4"
            sm="12"
            className="dogovorButton mb-3"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          ></Col>
        </Row>
        <Form onSubmit={onSubmit}>
          <Row>
            <Col lg="4" md="4" sm="12" className="mb-3">
              <Form.Group>
                <Form.Control
                  type="hidden"
                  value={name ? name : " "}
                  placeholder="Name"
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  type="hidden"
                  value={month ? month : " "}
                  placeholder="Month"
                  required
                />
              </Form.Group>
              <Form.Group>
                {/* <Form.Label>Name</Form.Label> */}
                <Form.Control
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Имя"
                  required
                  value={username}
                />
              </Form.Group>
            </Col>
            <Col lg="4" md="4" sm="12" className="mb-3">
              <Form.Group>
                {/* <Form.Label>Phone number</Form.Label> */}
                <Form.Control
                  type="tel"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Номер телефона"
                  required
                  value={phone}
                />
              </Form.Group>
            </Col>
            <Col lg="4" md="4" sm="12" className="mb-3">
              <Form.Group>
                <Form.Control
                  type="submit"
                  className="btn btn-dark"
                  value="Отправить заявку"
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        {successMessage}
      </Container>
    </div>
  );
};

export default Calculator;
