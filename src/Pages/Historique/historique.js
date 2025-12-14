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
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [logs, setLogs] = useState([{}]);

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
        <div className='HistoriquePage' style={{color: 'black'}}>
          <div className='TableauHistorique'>
            <div className='LigneHistoriqueTop'>
              <div style={{borderRight: 'solid 2px #395b94', width: '30%', borderTop:'solid 2px #395b94'}}>
                Utilisateur
              </div>
              <div style={{borderRight: 'solid 2px #395b94', width: '40%', borderTop:'solid 2px #395b94'}}>
                Action performée
              </div>
              <div style={{width: '30%', borderTop:'solid 2px #395b94'}}>
                Heure de l'évènement
              </div>
            </div>
            {logs ? logs.map((logss) => 
              <div key={logss.id} className='LigneHistorique'>
                <div style={{borderRight: 'solid 2px #395b94', width: '30%'}}>
                  {logss.user}
                </div>
                <div style={{borderRight: 'solid 2px #395b94', width: '40%'}}>
                  {logss.actionPerformed}
                </div>
                <div style={{width: '30%'}}>
                  {logss.time}
                </div>
              </div>
            ) : <></>}
          </div>
        </div>
      }
      {!isMobile &&
        <div className='HistoriquePage' style={{color: 'black'}}>
          <div className='TableauHistorique'>
            <div className='LigneHistoriqueTop'>
              <div style={{borderRight: 'solid 2px #395b94', width: 341, borderTop:'solid 2px #395b94'}}>
                Utilisateur
              </div>
              <div style={{borderRight: 'solid 2px #395b94', width: 342, borderTop:'solid 2px #395b94'}}>
                Action performée
              </div>
              <div style={{width: 341, borderTop:'solid 2px #395b94'}}>
                Heure de l'évènement
              </div>
            </div>
            {logs ? logs.map((logss) => 
              <div key={logss.id} className='LigneHistorique'>
                <div style={{borderRight: 'solid 2px #395b94', width: 341}}>
                  {logss.user}
                </div>
                <div style={{borderRight: 'solid 2px #395b94', width: 342}}>
                  {logss.actionPerformed}
                </div>
                <div style={{width: 341}}>
                  {new Date(logss.time).toLocaleString()}
                </div>
              </div>
            ) : <></>}
          </div>
        </div>
      }
    </div>
  );
};

export default Historique;
