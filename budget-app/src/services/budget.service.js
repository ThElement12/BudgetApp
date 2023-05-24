import axios from "axios";

class BudgetService {
    async getBudget(user_id) {
        return await axios.get(process.env.REACT_APP_API_URL + '/budget/' + user_id)
            .then(res => res.data)
            .catch(err => console.error(err));
    }

    async createBudget(payment_type, budget_name, saturday_payment, user_id) {
        return axios.post(process.env.REACT_APP_API_URL + '/budget/', {
            payment_type,
            budget_name,
            saturday_payment,
            user_id
        })
            .then(res => res.data)
            .then(res => {
                return res["msg"] === "Budgets Registered";
            })
            .catch(err => {
                console.error(err);
                return false
            });

    }
}

const budgetService = new BudgetService();
export default budgetService;
