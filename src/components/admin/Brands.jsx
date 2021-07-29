import React from 'react'
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import NavBar from './NavBar'
import './Admin.scss'
import axios from "axios";
import { Link } from 'react-router-dom';

const Brands = (props) => {

    return (
        <>
            <NavBar action="Добавить" toLink="/admin/addBrand" />
            <div className="mt-4"></div>
            <Container id="addBrand">
            <Row>
                    <h1>Магазины</h1>
                    <div className="mb-2"></div>
                </Row>
                <Row>
                    <Col>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Магазин</th>
                                    <th>Ссылка</th>
                                    <th>Teleram</th>
                                    <th>Изображение</th>
                                    <th colSpan={2}>Действие</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.brands.map((brands, i) => {
                                    return (<tr key={i} className="List">
                                        <td>{i + 1}</td>
                                        <td>{brands.name}</td>
                                        <td>{brands.link}</td>
                                        <td>{brands.telegram_chat_id}</td>
                                        <td><img className="productImage" src={brands.image} alt="" /></td>
                                        <td><Button as={Link} className="btn btn-primary" to={`/admin/editBrand/${brands.id}`}>Редактировать</Button></td>
                                        <td><Button className="btn btn-danger" onClick={
                                            async () => {
                                                let conf = window.confirm(`Do you want to delete brand ${brands.name}?`)
                                                if (conf === true) {
                                                    await axios.get("https://sport-mix.uz/backend/delete.php?id=" + brands.id + "&from=" + brands.filter_by);
                                                    window.location.href = "/admin/brands"
                                                }
                                            }}>Удалить</Button></td>
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

export default Brands
