import React, {useEffect, useState} from 'react'
import {Button, Container} from "react-bootstrap";

import BudgetTable from '../../components/BudgetTable'
import CreateBudget from "../../components/CreateBudget";
import AddMovement from "../../components/AddMovement";

import budgetService from "../../services/budget.service";


const HomePage = () => {
    const [addMovement, setAddMovement] = useState(false)
    //TODO: Mover el fetch de informacion al homepage
    const [budget, setBudget] = useState([]);
    const [actualPage, setActualPage] = useState("");
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        budgetService.getBudget(localStorage.getItem("id"))
            .then(res => {
                setBudget(res)
                setLoaded(true);
                setActualPage(Object.keys(res)[0])
            })
            .catch(err => console.error(err));
    }, []);

    const getMovementsByType = type => {
        return budget[actualPage].filter((movement) => movement.movement_name === type)
    }
    const content = () => {
        if (localStorage.getItem("name")) {
            if (Object.keys(budget).length > 0) {
                return <Container>
                    <Button onClick={() => setAddMovement(true)}>Agregar Movimiento</Button>
                    {loaded && <Container>
                        <BudgetTable movements={getMovementsByType("Ingreso")} title="Ingreso"/>
                        <BudgetTable movements={getMovementsByType("Gastos Fijos")} title="Gastos Fijos"/>
                        <BudgetTable movements={getMovementsByType("Gastos Dinamicos")} title="Gastos Dinamicos"/>
                        <BudgetTable movements={getMovementsByType("Gastos Lujos")} title="Gastos Lujos"/>
                    </Container>}
                    <AddMovement showModal={addMovement} setModal={setAddMovement}/>
                </Container>
            } else {
                return <div>
                    <h1>{"Bienvenido, " + localStorage.getItem("name")}</h1>
                    <CreateBudget/>
                </div>
            }
        }
        return <h1>Bienvenido a Budget App!</h1>
    }

    return (
        <div>
            <br></br>
            {content()}
        </div>
    )
}
export default HomePage;
