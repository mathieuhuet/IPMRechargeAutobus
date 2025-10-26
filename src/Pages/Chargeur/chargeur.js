import './chargeur.css';
import './chargeurMobile.css';
import { useMediaQuery } from 'react-responsive';



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const Chargeur = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='ChargeurPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='ChargeurPage'>

        </div>
      }
    </div>
  );
};

export default Chargeur;
