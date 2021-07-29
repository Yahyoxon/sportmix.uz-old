import React, { useState } from 'react'
import './Admin.scss'
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import logo from "../sportmix-logo.png"

const Admin = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (props.admin[0].username === username && props.admin[0].password === password) {
            console.log("success user");
            localStorage.setItem("user", JSON.stringify(props.admin));
            window.location.href = "/admin/dashboard";
        }else{
            console.log("error user");
        }
    }

    return (
        <div className="formContainer">
            <Container>
                <Row>
                    <Col>
                        <Form onSubmit={handleSubmit}>
                            <div className="login">
                                <div className="logo">
                                    <img src={logo} alt="" />
                                </div>
                                <Form.Group controlId="formGroupUsername">
                                    <Form.Control type="text" placeholder="username" onChange={e=>setUsername(e.target.value)}/>

                                </Form.Group>
                                <Form.Group controlId="formGroupPassword">
                                    <Form.Control type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button className="submit" type="submit">Submit</Button>

                            </div>

                        </Form>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Admin
