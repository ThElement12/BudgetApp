import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import app from "../services/firebaseConfig"

class UserService {
  registerUser(name, email, password, onSuccess) {
    const auth = getAuth(app);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        axios.post(process.env.REACT_APP_API_URL + '/user', { name, email })
        .then(() => onSuccess())
      })
    // .catch(err => err);
  }

  login(mail, pass) {
    const auth = getAuth(app);
    return signInWithEmailAndPassword(auth, mail, pass)
      // .catch(err => err);
  }

  logout() {
    localStorage.clear();
  }
}

const userService = new UserService();

export default userService;