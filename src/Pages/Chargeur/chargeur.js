import './chargeur.css';
import './chargeurMobile.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';




const Chargeur = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='ChargeurPage'>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            Ajouter un chargeur
          </div>
        </div>
      }
      {!isMobile &&
        <div className='ChargeurPage'>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            Ajouter un chargeur
          </div>
        </div>
      }
    </div>
  );
};

export default Chargeur;
