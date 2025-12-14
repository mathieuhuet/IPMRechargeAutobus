import './chargeur.css';
import './chargeurMobile.css';
import { useEffect, useState, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, Link } from 'react-router-dom';
import { useCookies } from "react-cookie";
import ChargeurComponent from '../../Components/Chargeur/chargeurComponent';
import { TiPlus } from "react-icons/ti";
import { getChargeur } from '../../Services/chargeur/getChargeur';



const Chargeur = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [chargeur, setChargeur] = useState([]);

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getChargeur(accessToken);
      if (allData.data) {
        let chargeurArray = [];
        console.log(allData.data);
        for (let i = 0; i < allData.data.length; i++) {
          chargeurArray.push(allData.data[i]);
        }
        setChargeur(chargeurArray);
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [refresh]);

  return (
    <div>
      {isMobile &&
        <div className='ChargeurPage'>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            <TiPlus />
          </div>
          <div className='ListeChargeur'>
            {chargeur.length > 0 ? chargeur.map((charge) => 
              <div key={charge.id}>
              <Link to={'/status/chargeur/' + charge.id} style={{textDecoration: 'none'}}>
                <ChargeurComponent
                  name={charge.name}
                  autobus={charge.autobus}
                />
              </Link>
              </div>
            ) : <>Aucun Chargeur.</>}
          </div>
        </div>
      }
      {!isMobile &&
        <div className='ChargeurPage'>
          <div className='ListeChargeur'>
            {chargeur.length > 0 ? chargeur.map((charge) => 
              <div key={charge.id}>
              <Link to={'/status/chargeur/' + charge.id} style={{textDecoration: 'none'}}>
                <ChargeurComponent
                  name={charge.name}
                  autobus={charge.autobus}
                />
              </Link>
              </div>
            ) : <>Aucun Chargeur.</>}
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
