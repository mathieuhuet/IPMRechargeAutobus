// Cannot access any other page than : Login/Register
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/login';
import About from '../Pages/About/about';


const SignedOutRoute = (props) => {
  return (
    <Routes>
      <Route
        path="/control"
        element={<Navigate to="/" replace={true} />}
      />
      <Route
        path="/user"
        element={<Navigate to="/" replace={true} />}
      />
      <Route 
        path="/about" 
        element={<About/>} 
      />
      <Route 
        path="/" 
        element={<Login/>}
      />
      <Route
        path="*"
        element={<Navigate to="/" replace={true} />}
      />
    </Routes>
  )
}

export default SignedOutRoute;