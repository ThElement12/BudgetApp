import axios from "axios";

class OptionsService{
    async getMovementType(){
        return await axios.get(process.env.REACT_APP_API_URL + '/movement_type')
            .then(res => res.data)
            .catch(err => console.error(err));
    }
    async getPaymentType(){
        return await axios.get(process.env.REACT_APP_API_URL + '/payment_type')
            .then(res => res.data)
            .catch(err => console.error(err));
    }
    async getCurrencies(){
        return await axios.get(process.env.REACT_APP_API_URL + '/currency')
            .then(res => res.data)
            .catch(err => console.error(err));
    }
}

const optionsService = new OptionsService();
export default optionsService;
