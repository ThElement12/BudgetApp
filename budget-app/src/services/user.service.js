import axios from "axios";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from "firebase/auth";
import app from "../services/firebaseConfig"

class UserService {
  
  auth = getAuth(app);

  registerUser(name, email, password, onSuccess) {
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        axios.post(process.env.REACT_APP_API_URL + '/user', { name, email })
        .then(() => onSuccess())
      })
    // .catch(err => err);
  }

  login(mail, pass) {
    return signInWithEmailAndPassword(this.auth, mail, pass)
      // .catch(err => err);
  }

  async logout() {
    return await signOut(this.auth)
  }
}

const userService = new UserService();

export default userService;