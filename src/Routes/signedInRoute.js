// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import Autobus from '../Pages/Autobus/autobus';
import Chargeur from '../Pages/Chargeur/chargeur';
import Historique from '../Pages/Historique/historique';
import About from '../Pages/About/about';


const SignedInRoute = (props) => {
  return (
    <Routes>
        <Route 
          path="/about" 
          element={<About />} 
        />
        <Route
          path="/autobus"
          element={<Autobus />}
        />
        <Route
          path="/chargeur"
          element={<Chargeur />}
        />
        <Route
          path="/historique"
          element={<Historique />}
        />
        <Route
          path="/"
          element={<Navigate to="/autobus" replace={true} />}
        />
        <Route
          path="*"
          element={<Navigate to="/autobus" replace={true} />}
        />
    </Routes>
  )
}

export default SignedInRoute;