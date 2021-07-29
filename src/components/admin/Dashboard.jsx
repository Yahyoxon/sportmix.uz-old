import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import NavBar from './NavBar'
import './Admin.scss'
import { Link } from 'react-router-dom';

const Dashboard = (props) => {

    var user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="dashboard">
            <NavBar action={user[0].username} toLink="/admin/dashboard" />
            <div className="mt-4"></div>
            <Container id="addProduct">
                <Row>
                    <h1>Dashboard</h1>
                    <div className="mb-2"></div>
                </Row>
                <Row>
                    <Col>
                        <Link to="/admin/products" className="infoBox">
                            Продукты
                            <span className="count">
                                {props.product.length}
                            </span>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/admin/categories" className="infoBox">
                            Категории
                            <span className="count">
                                {props.category.length}
                            </span>
                        </Link>
                    </Col>
                    <Col>
                        <Link to="/admin/brands" className="infoBox">
                            Магазины
                            <span className="count">
                                {props.brands.length}
                            </span>
                        </Link>
                    </Col>
                    {/* <Col>
                        <div className="infoBox">
                            <div className="count">
                                {props.product.length}
                            </div>
                        </div>
                    </Col> */}
                </Row>
            </Container>

        </div>
    )
}

export default Dashboard
