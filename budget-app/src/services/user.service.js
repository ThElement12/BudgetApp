import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

class UserService {
  registerUser(name, email, password) {
    createUserWithEmailAndPassword(getAuth(),email, password)
    .then(
      axios.post(process.env.REACT_APP_API_URL + '/user', {name, email})
      .then(res => res.json())
      .then(res => console.log(res))
      .catch(err => err)
    )
    .catch(err => err);
  }

  login(mail, pass) {
    return signInWithEmailAndPassword(getAuth(),mail, pass)
    .then(
      axios.get(process.env.REACT_APP_API_URL + '/user' + mail)
      .then(res => res.json())
      .catch(err => err)
    )
    .catch(err => err);
  }
  
  logout() {
    localStorage.clear();
  }
}

const userService = new UserService();

export default userService;