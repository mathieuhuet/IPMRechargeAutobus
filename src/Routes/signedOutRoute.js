// Cannot access any other page than : Login/Register
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Pages/Login/login';



const SignedOutRoute = (props) => {
  return (
    <Routes>
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