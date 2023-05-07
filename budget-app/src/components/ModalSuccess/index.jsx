import React from 'react'
import { Button, Modal } from "react-bootstrap";

const ModalSuccess = (props) => {
    return <Modal
        show={props.modalSuccess}
        onHide={props.hideModalSuccess}
        keyboard={false}
        centered
    >
        <Modal.Header>
            <Modal.Title>Informacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Operacion realizada con exito
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={() => props.hideModalSuccess()}>
                Ok
            </Button>
        </Modal.Footer>
    </Modal>
}

export default ModalSuccess;