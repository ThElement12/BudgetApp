import React, { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import UserService from '../../services/user.service'

import "./LoginPage.css";
import "bootstrap/dist/css/bootstrap.min.css";
const LoginPage = () => {
  const [mail, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [msgError, setmsgError] = useState("");

  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    authentication();
  };
  const authentication = () => {

    UserService.login(mail, pass)
      .then(() => {
        axios.get(process.env.REACT_APP_API_URL + '/user/' + mail)
          .then(res => res.data[0])
          .then(res => {
            for (var key in res) {
              localStorage.setItem(key, res[key])
            }
            navigate("/", { replace: true });
          })
        }
      ).catch(() => {
        setmsgError('Correo o Contraseña incorrectos')
      });
  }
  return (
    <div>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <Card className="card-login">
          <Card.Body>
            <h2 className="text-center mb-4">Ingresar</h2>
            <Form onSubmit={onSubmit}>
              <Form.Group id="correo">
                <Form.Label>Usuario</Form.Label>
                <Form.Control
                  type="username"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group id="pass">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  autoComplete="on"
                  onChange={(e) => {
                    setPass(e.target.value);
                  }}
                />
              </Form.Group>
              <br></br>
              {msgError !== "" && <Alert variant="danger">{msgError}</Alert>}
              <Button className="w-100" type="submit">
                Ingresar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;