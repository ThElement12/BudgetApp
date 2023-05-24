import React, {useEffect, useState} from 'react';
import {Button, Card, Container, Form} from "react-bootstrap";

import OptionsService from "../../services/options.service";
import budgetService from "../../services/budget.service";
import ModalSuccess from "../ModalSuccess";

const CreateBudget = () => {

    const [paymentTypes, setPaymentTypes] = useState([]);

    const [budgetName, setBudgetName] = useState("");
    const [paymentType, setPaymentType] = useState("");
    const [saturdayPayment, setSaturdayPayment] = useState(false);
    const [modalSuccess, setModalSuccess] = useState(false);
    // const [startDate, setStarDate] = useState(new Date());
    // const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        OptionsService.getPaymentType()
            .then(res => setPaymentTypes(res))
            .catch(err => console.error(err));
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        budgetService.createBudget(paymentType, budgetName, saturdayPayment, Number(localStorage.getItem("id")))
            .then(onSuccess)

    }
    const onSuccess = () => {
        setModalSuccess(true);
        setBudgetName("");
        setPaymentType(0);
        setSaturdayPayment(false);

    }
    const hideModalSuccess = () => {
        setModalSuccess(false);
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit={onSubmit}>
                        <Form.Group>
                            <Form.Label>Nombre del presupuesto: </Form.Label>
                            <Form.Control type="name" name="budget_name" placeholder="Se creativo..." value={budgetName} onChange={(e) => setBudgetName(e.target.value)} required></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Frecuencia de Pago</Form.Label>
                            <Form.Control as="select" name="payment_type" onChange={(e) => setPaymentType(Number(e.target.value))} required>
                                <option value="">Elige...</option>
                                {paymentTypes.map((paymentType, i)=> (
                                    <option value={paymentType.id} key={i}>{paymentType.payment_name}</option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <br/>
                            <Form.Switch label={"¿Te pagan los sabados en caso de que el día de pago sea ese día?"} checked={saturdayPayment} onChange={(e) => setSaturdayPayment(e.target.checked)}/>
                        </Form.Group>
                        <Button type="submit">Crear</Button>
                    </Form>
                </Card.Body>
            </Card>
            <ModalSuccess modalSuccess={modalSuccess} hideModalSuccess={hideModalSuccess} />
        </Container>
    );
};

export default CreateBudget;