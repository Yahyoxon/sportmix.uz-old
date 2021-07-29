import React from 'react'
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import NavBar from './NavBar'
import './Admin.scss'
import axios from "axios"
import { Link } from 'react-router-dom';

const Categories = (props) => {

    return (
        <>
            <NavBar action="Добавить" toLink="/admin/addCategory" />
            <div className="mt-4"></div>
            <Container id="addCategory">
                <Row>
                    <h1>Категория</h1>
                    <div className="mb-2"></div>
                </Row>
                <Row>
                    <Col>
                        <Table bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Категория</th>
                                    <th>Ссылка</th>
                                    <th>Изображение</th>
                                    <th colSpan={2}>Действие</th>
                                </tr>
                            </thead>
                            <tbody>

                                {props.category.map((category, i) => {
                                    return (<tr key={i} className="List">
                                        <td>{i + 1}</td>
                                        <td>{category.name}</td>

                                        <td>{category.link}</td>
                                        <td><img className="productImage" src={category.image} alt="" /></td>
                                        <td><Button as={Link} className="btn btn-primary" to={`/admin/editCategory/${category.id}`}>Редактировать</Button></td>
                                        <td><Button className="btn btn-danger" onClick={
                                            async () => {
                                                let conf = window.confirm(`Do you want to delete category ${category.name}?`)
                                                if (conf === true) {
                                                    await axios.get("https://sport-mix.uz/backend/delete.php?id=" + category.id + "&from=" + category.filter_by);
                                                    window.location.href = "/admin/categories"
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

export default Categories
