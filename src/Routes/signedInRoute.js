// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import User from '../Pages/User/user';
import Control from '../Pages/Control/control';
import About from '../Pages/About/about';



const SignedInRoute = (props) => {
  return (
    <Routes>
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route
          path="/user"
          element={<User />}
        />
        <Route
          path="/control"
          element={<Control />}
        />
        <Route
          path="/"
          element={<Navigate to="/control" replace={true} />}
        />
        <Route
          path="*"
          element={<Navigate to="/" replace={true} />}
        />
    </Routes>
  )
}

export default SignedInRoute;