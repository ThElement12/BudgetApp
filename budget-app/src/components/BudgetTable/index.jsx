import React from "react";
import {Table, Container} from "react-bootstrap";

const BudgetTable = (props) => {
    return (
        <Container>
            <h3>{props.title}</h3>
            <Table responsive striped bordered hover>
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Descripcion</th>
                    <th>Monto en DOP</th>
                    <th>Monto en USD</th>
                    <th>Fecha</th>
                </tr>
                </thead>
                <tbody>
                {props.movements.map((movement, i) => (
                    <tr key={i}>
                        <th>{movement.movement_id}</th>
                        <th>{movement.description}</th>
                        <th>{Number(movement.dop_amount).toFixed(2)}</th>
                        <th>{Number(movement.us_amount).toFixed(2)}</th>
                        <th>{new Date(movement.date).toISOString().slice(0, 10)}</th>
                    </tr>
                ))}
                </tbody>
                <tfoot>
                <tr>
                    <th></th>
                    <th>Total</th>
                    <th>{Number(props.movements.reduce((accumulator, obj) => {
                        return accumulator + obj.dop_amount;
                    }, 0)).toFixed(2)}</th>
                    <th>{Number(props.movements.reduce((accumulator, obj) => {
                        return accumulator + obj.us_amount;
                    }, 0)).toFixed(2)}</th>
                    <th></th>
                </tr>
                </tfoot>
            </Table>
        </Container>
    )
}
export default BudgetTable;