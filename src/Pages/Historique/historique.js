import './historique.css';
import './historiqueMobile.css';
import { useEffect, useState, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import { collectLogs } from '../../Services/logs/collectLogs';
import { color } from 'framer-motion';




const Historique = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await collectLogs(accessToken);
      if (allData.data) {
        setLogs(allData.data);
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [refresh]);

  return (
    <div>
      {isMobile &&
        <div className='HistoriquePage'>
        
        </div>
      }
      {!isMobile &&
        <div className='HistoriquePage' style={{color: 'black'}}>
          {console.log(logs)}
        </div>
      }
    </div>
  );
};

export default Historique;
