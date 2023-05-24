import axios from "axios";

class MovementService {
    getMovement(user_id) {
        return axios.get(process.env.REACT_APP_API_URL + '/movement/' + user_id)
            .then(res => res.data)
            .catch(err => console.error(err));
    }

    async createMovement(budget_id, movement_type, currency_id, description, amount, date) {
        return axios.post(process.env.REACT_APP_API_URL + '/movement/', {
            budget_id,
            movement_type,
            currency_id,
            description,
            amount,
            date
        })
            .then(res => res.data)
            .then(res => {
                return res["msg"] === "Movement Registered";
            })
            .catch(err => {
                console.error(err);
                return false
            });

    }

}

const movementService = new MovementService();

export default movementService;
