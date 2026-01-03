import './autobus.css';
import './autobusMobile.css';
import { useEffect, useState, useMemo } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getChargeur } from '../../Services/chargeur/getChargeur';
import { getAutobus } from '../../Services/autobus/getAutobus';
import AutobusComponent from '../../Components/Autobus/autobusComponent';
import { TiPlus } from "react-icons/ti";
import { sortByName } from '../../Utilities/sortAlphabetically';



const Autobus = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [autobus, setAutobus] = useState([]);
  const [allChargeur, setAllChargeur] = useState([]);

  useEffect(() => {
    async function fetchData(accessToken) {
      const chargeurs = await getChargeur(accessToken);
      if (chargeurs.data) {
        setAllChargeur(sortByName(chargeurs.data));
      } else {
        console.log('problem fetching all chargeurs')
      }
      const allData = await getAutobus(accessToken);
      if (allData.data) {
        let autobusArray = [];
        for (let i = 0; i < allData.data.length; i++) {
          autobusArray.push(allData.data[i]);
        }
        setAutobus(sortByName(autobusArray));
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [refresh]);

  function provideChargeurNameToComponent (chargeurID) {
    let chargeurName = "";
    for (let i = 0; i < allChargeur.length; i++) {
      if (allChargeur[i].id == chargeurID) {
        chargeurName = allChargeur[i].name;
        i = allChargeur.length;
      }
    }
    return chargeurName;
  }

  return (
    <div>
      {isMobile &&
        <div className='AutobusPage'>
          <div className='AddAutobus'
            onClick={() => navigate('/addautobus')}
          >
            <TiPlus />
          </div>
          <div className='ListeAutobus'>
            {autobus.length > 0 ? autobus.map((bus) => 
              <div key={bus.id}>
              <Link to={'/status/autobus/' + bus.id} style={{textDecoration: 'none'}}>
                <AutobusComponent
                  name={bus.name}
                  level={bus.batteryLevel}
                  chargeur={bus.charger}
                  chargeurName={provideChargeurNameToComponent(bus.charger)}
                />
              </Link>
              </div>
            ) : <>Aucun Autobus.</>}
          </div>
        </div>
      }
      {!isMobile &&
        <div className='AutobusPage'>
          <div className='ListeAutobus'>
            {autobus.length > 0 ? autobus.map((bus) => 
              <div key={bus.id}>
              <Link to={'/status/autobus/' + bus.id} style={{textDecoration: 'none'}}>
                <AutobusComponent
                  name={bus.name}
                  level={bus.batteryLevel}
                  chargeur={bus.charger}
                  chargeurName={provideChargeurNameToComponent(bus.charger)}
                />
              </Link>
              </div>
            ) : <>Aucun Autobus.</>}
          </div>
          <div className='AddAutobus'
            onClick={() => navigate('/addautobus')}
          >
            <TiPlus />
          </div>
        </div>
      }
    </div>
  );
};

export default Autobus;
