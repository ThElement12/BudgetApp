import React from 'react'
import BudgetTable from '../../components/BudgetTable'

const HomePage = () => {

  const content = () => {
    if(localStorage.getItem("name")){
      return <div>
        <h1>{"Bienvenido, " + localStorage.getItem("name")}</h1>
        <BudgetTable/>
        </div>
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
