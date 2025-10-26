import './historique.css';
import './historiqueMobile.css';
import { useMediaQuery } from 'react-responsive';



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





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
