import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import OptionsService from "../../services/options.service";
import movementService from "../../services/movement.service";
import ModalSuccess from "../ModalSuccess";

const AddMovement = (props) => {
// movement_type_id, currency_id, description, amount, date
    const [description, setDescription] = useState("");
    const [currency, setCurrency] = useState(0);
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState(0);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    const [currencies, setCurrencies] = useState([]);
    const [movementTypes, setMovementTypes] = useState([])

    const [modalSuccess, setModalSuccess] = useState(false);

    useEffect(() => {
        OptionsService.getCurrencies()
            .then(res => setCurrencies(res))
            .catch(err => console.error(err));

        OptionsService.getMovementType()
            .then(res => setMovementTypes(res))
            .catch(err => console.error(err));
    }, []);

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(type);
        movementService.createMovement(props.budgetId, type, currency, description, amount, date)
            .then(onSuccess)
            .catch(err => console.error(err));
    }
    const onSuccess = () => {
        setDescription("");
        setCurrency(0);
        setAmount(0);
        setType(0);
        setDate(new Date().toISOString().slice(0, 10));
        setModalSuccess(true);

    }
    const hideModalSuccess = () => {
        setModalSuccess(false);
        props.setModal(false);
    }

    return (
        <Modal show={props.showModal}
               onHide={() => props.setModal(false)}
               keyboard={false}
               size="lg"
               centered>
            <Modal.Header>
                <Modal.Title>Agregar nuevo movimiento</Modal.Title>
            </Modal.Header>
            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <Form.Label>Description</Form.Label>
                    <Form.Control  onChange={e => {setDescription(e.target.value)}} required></Form.Control>
                    <Form.Label>Divisa</Form.Label>
                    <Form.Control as="select" name="currency_type" onChange={(e) => setCurrency(Number(e.target.value))} required>
                        <option value="">Elige...</option>
                        {currencies.map((currencyType, i)=> (
                            <option value={currencyType.id} key={i}>{currencyType.currency_name}</option>
                        ))}
                    </Form.Control>
                    <Form.Label>Tipo</Form.Label>
                    <Form.Control as="select" name="movement_type" onChange={(e) => setType(Number(e.target.value))} required>
                        <option value="">Elige...</option>
                        {movementTypes.map((movementType, i)=> (
                            <option value={movementType.id} key={i}>{movementType.movement_name}</option>
                        ))}
                    </Form.Control>

                    <Form.Label>Cantidad:</Form.Label>
                    <Form.Control type="number" value={amount} onChange={e => setAmount(e.target.value)} required></Form.Control>

                    <Form.Label>Fecha: </Form.Label>
                    <Form.Control max={new Date().toISOString().slice(0, 10)} value={date} type="date" onChange={e => setDate(e.target.value)} required></Form.Control>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">Agregar</Button>
                </Modal.Footer>
            </Form>
            <ModalSuccess modalSuccess={modalSuccess} hideModalSuccess={hideModalSuccess} />
        </Modal>
    );
};

export default AddMovement;