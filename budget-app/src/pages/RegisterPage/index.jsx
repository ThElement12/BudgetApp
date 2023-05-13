import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import ModalSuccess from "../../components/ModalSuccess";

import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css"

import UserService from '../../services/user.service.js'

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [mail, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [confirm, setConfirm] = useState("");

  const [msgError, setmsgError] = useState("");
  const [modalSuccess, setModalSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    if (password !== confirm) {
      setmsgError("Las contraseñas no coinciden");
    } else {
      register();
    }
  }
  const register = async () => {
    UserService.registerUser(name, mail, password, onSuccess)
      .then(onSuccess)
      .catch(() => setmsgError("El correo ya existe"));
  }
  const onSuccess = () => {
    setModalSuccess(true);
    setEmail("");
    setPass("");
    setConfirm("");
    setmsgError("");
    setName("");
  }

  const checkPassLength = () => {
    if(password.length >= 6 && confirm.length >= 6){
      return false;
    }else{
      return true;
    }
  }
  const hideModalSuccess = () => {
    setModalSuccess(false);
    navigate('/', { replace: true })
  }
  return (
    <div>
      <div className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <Card className="card-register">
          <Card.Body>
            <h2 className="text-center mb-4">Registrate</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Nombre:</Form.Label>
                <Form.Control type="name" name="name" onChange={(e) => { setName(e.target.value); }} required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Correo:</Form.Label>
                <Form.Control type="email" name="email" onChange={(e) => { setEmail(e.target.value); }} required></Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Contraseña:</Form.Label>
                <Form.Control type="password" name="password" onChange={(e) => { setPass(e.target.value); }} required></Form.Control>
                <Form.Label>Confirmar Contraseña</Form.Label>
                <Form.Control type="password" name="confirmpass" onChange={(e) => { setConfirm(e.target.value); }} required></Form.Control>
              </Form.Group>
              <br></br>
              {msgError !== "" && <Alert variant="danger">{msgError}</Alert>}
              <Button disabled={checkPassLength()} className="w-100" type="submit">
                Registrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <ModalSuccess modalSuccess={modalSuccess} hideModalSuccess={hideModalSuccess} />
      </div>
    </div>

  );

}

export default RegisterPage
