import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import NavBar from '../NavBar'
import '../Admin.scss'
import axios from "axios"
import { useHistory } from 'react-router-dom'


const AddBrand = (props) => {
    var user = JSON.parse(localStorage.getItem('user'));

    let history = useHistory()

    const [dataUri, setDataUri] = useState('')

    const [brand, setBrand] = useState({
        name: "",
        link: "",
        telegram_chat_id: "",
        image: dataUri
    });
    const { name, link, telegram_chat_id, image } = brand;

    const onInputChange = (e) => {
        setBrand({ ...brand, [e.target.name]: e.target.value })
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
        setBrand({ ...brand, image: dataUri })
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
        await axios.post("https://sport-mix.uz/backend/brand/addBrand.php", brand);
        console.log(brand);
        history.push("/admin/brands")
        window.location.href = "/admin/brands";
    }

    return (
        <>
            <NavBar action={user[0].username} toLink="/admin/dashboard" />
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={e => onSubmitHandler(e)}>
                            <Form.Group>
                                <Form.Label>Название магазина</Form.Label>
                                <Form.Control value={name} name="name" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Ссылка магазина</Form.Label>
                                <Form.Control value={link} name="link" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <Form.Label>Telegram chat id</Form.Label>
                                <Form.Control value={telegram_chat_id} name="telegram_chat_id" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>
                            <Form.Group>
                                <img width="200" height="200" src={dataUri} alt="avatar" />
                                <textarea type="text" className="imageText" value={image} name="image" />
                                <Form.File
                                    onChange={(e) => onChangeImage(e.target.files[0]) || null}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="addButton" >
                                Создать магазин
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddBrand
