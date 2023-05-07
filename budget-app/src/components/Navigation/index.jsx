import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";

import "bootstrap/dist/css/bootstrap.min.css";
import UserService from "../../services/user.service";

export default function Navigation() {
  const navigate = useNavigate();
  

  const logOut = () => {
    UserService.logout();
    navigate("/login");
  };
  const loggedNavBar = () => {
    if (!localStorage.getItem('tipoUsuario')) {
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
    else if(localStorage.getItem('tipoUsuario') === "Profesor"){
      return <Nav className="me-auto">
         <Nav.Link className="MenuItem" href="/">
          Inicio
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/newgroup">
          Crear Grupo
        </Nav.Link>
        <NavDropdown title="Cuenta" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={logOut} className="link">
            Cerrar Sesion
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    }
    else{
      return <Nav className="me-auto">
        <Nav.Link className="MenuItem" href="/">
          Inicio
        </Nav.Link>
        <Nav.Link className="MenuItem" href="/misgrupos">
          Mis Grupos
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
          {"Edunect"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {loggedNavBar()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}