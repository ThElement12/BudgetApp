import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";

import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import Navigation from './components/Navigation';


function NavigationOutlet() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='' element={<NavigationOutlet/>}>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/register' element={localStorage.getItem('id') ? <Navigate to='/' /> : <RegisterPage />} />
            <Route exact path='/login' element={localStorage.getItem('id') ? <Navigate to='/' /> : <LoginPage />} />
            <Route path="*" element={<Navigate to='/' />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

