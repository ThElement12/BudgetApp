import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../services/user.service";

export default function Navigation() {
  const navigate = useNavigate();
  
  const logOut = () => {
    UserService.logout()
    .then(() => {
      localStorage.clear();
      navigate("/login",  { replace: true });
    }).catch(err => console.error(err));
  };
  const loggedNavBar = () => {
    if (!localStorage.getItem('id')) {
      return <Nav className="me-auto">
        <Nav.Link className="MenuItem" href="/">
          Inicio
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/login">
          Ingresa
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/register">
          Registrate
        </Nav.Link>
      </Nav>
    }
    else{
      return <Nav className="me-auto">
         <Nav.Link className="MenuItem" href="/">
          Inicio
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/newbudget">
          Crear Presupuesto
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/budgets">
          Ver presupuestos anteriores
        </Nav.Link>
        <NavDropdown title="Cuenta" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={logOut} className="link">
            Cerrar Sesion
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    }
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          {"My Budget"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedNavBar()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}