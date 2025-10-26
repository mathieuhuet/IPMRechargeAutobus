import './autobus.css';
import './autobusMobile.css';
import { useEffect, useState, useMemo } from 'react';
import { useCookies } from "react-cookie";
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { getUserInfo } from '../../Services/user/getUserInfo';




const Autobus = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getUserInfo(accessToken);
      if (allData.data) {

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

        </div>
      }
      {!isMobile &&
        <div className='AutobusPage'>

        </div>
      }
    </div>
  );
};

export default Autobus;
