import './autobus.css';
import './autobusMobile.css';
import { useEffect, useState, useMemo } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getUserInfo } from '../../Services/user/getUserInfo';
import { getAutobus } from '../../Services/autobus/getAutobus';
import AutobusComponent from '../../Components/Autobus/autobusComponent';
import { TiPlus } from "react-icons/ti";




const Autobus = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [autobus, setAutobus] = useState([]);

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getAutobus(accessToken);
      if (allData.data) {
        let autobusArray = [];
        for (let i = 0; i < allData.data.length; i++) {
          autobusArray.push(allData.data[i]);
        }
        setAutobus(autobusArray);
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [refresh]);


  return (
    <div>
      {isMobile &&
        <div className='AutobusPage'>
          <div className='ListeAutobus'>
            {autobus.length > 0 ? autobus.map((bus) => 
              <div key={bus.id}>
              <Link to={'/status/autobus/' + bus.id} style={{textDecoration: 'none'}}>
                <AutobusComponent
                  name={bus.name}
                  level={bus.batteryLevel}
                  chargeur={bus.charger}
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
