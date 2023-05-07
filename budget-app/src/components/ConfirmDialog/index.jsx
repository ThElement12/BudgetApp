import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap';

import ModalSuccess from '../ModalSuccess';

import GrupoService from '../../services/grupo.service';

const ConfirmDialog = (props) => {

    const [success, setSuccess] = useState(false);
    const [onDelete, setDelete] = useState(false)

    useEffect(() => {
        if (onDelete) {
            GrupoService.eliminarAlumno(props.id_grupo, props.id_estudiante)
                .then(res => setSuccess(true))
                .catch(err => console.error(err))
        }
        //eslint-disable-next-line
    }, [onDelete])

    const handleClose = () => {
        setDelete(false)
        props.onHide();

    }
    const hideModalSuccess = () => {
        setDelete(false)
        setSuccess(false);
        props.onHide();

    }

    return (
        <>
            <Modal show={true} onHide={handleClose} centered>
                <Modal.Header>
                    <Modal.Title>Información</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Desea realizar la operación?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => setDelete(true)}>Confirmar</Button>
                    <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                </Modal.Footer>
            </Modal>
            <ModalSuccess modalSuccess={success} hideModalSuccess={hideModalSuccess} />
        </>

    )
}

export default ConfirmDialog;
