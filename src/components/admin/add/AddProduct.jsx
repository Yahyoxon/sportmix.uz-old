import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import NavBar from '../NavBar'
import '../Admin.scss'
import axios from "axios"
import { useHistory } from 'react-router-dom'


const AddProduct = (props) => {
    var user = JSON.parse(localStorage.getItem('user'));

    let history = useHistory()

    const [dataUri, setDataUri] = useState('')

    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        image: dataUri
    });
    const { name, description, price, category, brand, image } = product;

    const onInputChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }



    const onChangeImage = async (file) => {

        if (!file) {
            setDataUri('');
            return;
        }

        await fileToDataUri(file)
            .then(dataUri => {
                setDataUri(dataUri)
            })
        setProduct({ ...product, image: dataUri })
    }
    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        await axios.post("https://sport-mix.uz/backend/product/addProduct.php", product);
        console.log(product);
        history.push("/admin/products")
        window.location.href = "/admin/products";
    }

    return (
        <>
            <NavBar action={user[0].username} toLink="/admin/dashboard" />
            <Container>
                <Row>
                    <h2>Добавить товар</h2>
                    <div className="mb-3"></div>
                </Row>
                <Row>
                    <Col>
                        <Form onSubmit={e => onSubmitHandler(e)}>
                            <Form.Group>
                                <Form.Label>Название товара</Form.Label>
                                <Form.Control required value={name} name="name" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Описание товара</Form.Label>
                                <Form.Control required as="textarea" rows={3}  value={description} name="description" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Цена товара</Form.Label>
                                <Form.Control required value={price} name="price" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Выберите категория</Form.Label>
                                <Form.Control required value={category} onChange={e => onInputChange(e)} name="category" as="select">
                                    <option value="">Выберите категория</option>
                                    {props.category.map((cat, i) => {
                                        return <option key={i} value={cat.link}>{cat.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Выберите магазин</Form.Label>
                                <Form.Control required value={brand} onChange={e => onInputChange(e)} name="brand" as="select">
                                    <option value="">Выберите магазин</option>
                                    {props.brands.map((brand, i) => {
                                        return <option key={i} value={brand.link}>{brand.name}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <div className="mb-3"></div>
                            <Form.Group>
                                <img width="200" height="200" src={dataUri} alt="avatar" />
                                <textarea type="text" className="imageText" value={image} name="image" />
                                <Form.File
                                    onChange={(e) => onChangeImage(e.target.files[0]) || null}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="addButton" >
                            Опубликовать
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddProduct
