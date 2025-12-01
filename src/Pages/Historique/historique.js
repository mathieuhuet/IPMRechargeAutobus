import './historique.css';
import './historiqueMobile.css';
import { useMediaQuery } from 'react-responsive';





const Historique = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='HistoriquePage'>
        </div>
      }
      {!isMobile &&
        <div className='HistoriquePage'>

        </div>
      }
    </div>
  );
};

export default Historique;
