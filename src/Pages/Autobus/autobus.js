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
        setAutobus()
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
            <AutobusComponent />
            {autobus.map((device) => 
              <div key={device.id}>
              <Link to={'/device/devices/' + device.id}>
                <div className='EMCDevice' >
                  <div className='DeviceTitle'>{device.name}</div>
                </div>
              </Link>
              </div>
            )}
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
