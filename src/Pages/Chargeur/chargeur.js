import './chargeur.css';
import './chargeurMobile.css';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';
import ChargeurComponent from '../../Components/Chargeur/chargeurComponent';
import { TiPlus } from "react-icons/ti";



const Chargeur = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='ChargeurPage'>
          <div className='ListeChargeur'>
            <ChargeurComponent />
            <ChargeurComponent />
          </div>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            <TiPlus />
          </div>
        </div>
      }
      {!isMobile &&
        <div className='ChargeurPage'>
          <div className='ListeChargeur'>
            <ChargeurComponent />
            <ChargeurComponent />
          </div>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            <TiPlus />
          </div>
        </div>
      }
    </div>
  );
};

export default Chargeur;
