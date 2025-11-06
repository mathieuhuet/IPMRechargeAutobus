// Cannot access Login or Register page when signed in
import { Route, Routes, Navigate } from 'react-router-dom';
import Autobus from '../Pages/Autobus/autobus';
import Chargeur from '../Pages/Chargeur/chargeur';
import Historique from '../Pages/Historique/historique';
import About from '../Pages/About/about';
import AddAutobus from '../Pages/Autobus/AddAutobus/addAutobus';
import AddChargeur from '../Pages/Chargeur/AddChargeur/addChargeur';
import EditAutobus from '../Pages/Autobus/EditAutobus/editAutobus';
import EditChargeur from '../Pages/Chargeur/EditChargeur/editChargeur';


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
          path="/addautobus"
          element={<AddAutobus />}
        />
        <Route
          path="/addchargeur"
          element={<AddChargeur />}
        />
        <Route 
          path="/editautobus/:prev/:id" 
          element={<EditAutobus />} 
        />
        <Route 
          path="/editchargeur/:prev/:id" 
          element={<EditChargeur />} 
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