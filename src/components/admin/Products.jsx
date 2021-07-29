import React from 'react'
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import NavBar from './NavBar'
import './Admin.scss'
import axios from "axios";
import { Link } from 'react-router-dom'

const Products = (props) => {

    return (
        <>
            <NavBar action="Добавить" toLink="/admin/addProduct" />
            <div className="mt-4"></div>
            <Container id="addProduct">
            <Row>
                    <h1>Продукты</h1>
                    <div className="mb-2"></div>
                </Row>
                <Row>
                    <Col>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Продукт</th>
                                    <th>Описание</th>
                                    <th>Цена</th>
                                    <th>Магазин</th>
                                    <th>Изображение</th>
                                    <th colSpan={2}>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.product.map((product, i) => {
                                    return (<tr key={i} className="List">
                                        <td>{i + 1}</td>

                                        <td>{product.name}</td>
                                        <td>{product.description.length >= 40 ? product.description.substring(0, 70) + "..."
                                            : product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.brand_name}</td>
                                        <td><img className="productImage" src={product.image} alt="" /></td>
                                        <td><Button as={Link} className="btn btn-primary" to={`/admin/editProduct/${product.id}`}>Редактировать</Button></td>
                                        <td><Button className="btn btn-danger" onClick={
                                            async () => {
                                                let conf = window.confirm(`Do you want to delete product ${product.name}?`)
                                                if (conf === true) {
                                                    await axios.get("https://sport-mix.uz/backend/delete.php?id=" + product.id + "&from=" + product.filter_by);
                                                    window.location.href = "/admin/products"
                                                }
                                            }
                                        }>Удалить</Button></td>
                                    </tr>)
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default Products
