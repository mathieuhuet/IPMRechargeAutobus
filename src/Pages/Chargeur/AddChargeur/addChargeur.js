import './addChargeur.css';
import './addChargeurMobile.css';
import { useMediaQuery } from 'react-responsive';
//import { AddChargeur } from '../../../Services/chargeur/addChargeur';


/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const AddChargeur = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  

  return (
    <div>
      {isMobile &&
        <div className='AddChargeurPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='AddChargeurPage'>

        </div>
      }
    </div>
  );
};

export default AddChargeur;