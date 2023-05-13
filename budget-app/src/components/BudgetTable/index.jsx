import React, { useState, useEffect } from "react";
import {Table, Button, Card, Alert, Container} from "react-bootstrap";
import budgetService from "../../services/budget.service";
import CreateBudget from "../CreateBudget";

const BudgetTable = () => {

  // const [budget, setBudget] = useState([])
  // useEffect(() => {
  //     setBudget(budgetService.getBudget(localStorage.getItem("id")))
  // }, []);

  const movementInfo = () => {

  }

  return (
      <Container>
        <Table striped bordered hover>
        </Table>
          <CreateBudget/>
      </Container>
  )
}

export default BudgetTable;