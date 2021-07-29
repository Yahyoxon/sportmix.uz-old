import React, { useState, useEffect } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import NavBar from '../NavBar'
import '../Admin.scss'
import axios from "axios"
import { useParams } from 'react-router-dom'


const AddCategory = (props) => {
    var user = JSON.parse(localStorage.getItem('user'));

    const { id } = useParams()
    const [dataUri, setDataUri] = useState('')

    const [category, setCategory] = useState({
        name: "",
        link: "",
        image: dataUri
    });
    const { name, link, image } = category;

    const onInputChange = (e) => {
        setCategory({ ...category, [e.target.name]: e.target.value })
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
        setCategory({ ...category, image: dataUri })
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
        await axios.post(`https://sport-mix.uz/backend/category/updateCategory.php?id=${id}`, category);
        console.log(category);
        window.location.href = "/admin/categories";
    }

    useEffect(() => {
        loadCategory(id);
    }, [id])

    const loadCategory = async (id) => {
        const result = await axios.get(`https://sport-mix.uz/backend/category/getByIdCategory.php?id=${id}`)
        setCategory(result.data)
    }

    return (
        <>
            <NavBar action={user[0].username} toLink="/admin/dashboard" />
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={e => onSubmitHandler(e)}>
                            <Form.Group>
                                <Form.Label>Название категории</Form.Label>
                                <Form.Control value={name} name="name" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>

                            <Form.Group>
                                <Form.Label>Ссылка на категорию</Form.Label>
                                <Form.Control value={link} name="link" type="text" onChange={e => onInputChange(e)} />
                            </Form.Group>
                            <div className="mb-2"></div>

                            <Form.Group>
                                <img width="200" height="200" src={dataUri || image} alt="avatar" />
                                <textarea type="text" className="imageText" value={image} name="image" />
                                <Form.File
                                    onChange={(e) => onChangeImage(e.target.files[0]) || null}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="addButton btn btn-warning" >
                                Изменить категорию
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

        </>
    )
}

export default AddCategory
