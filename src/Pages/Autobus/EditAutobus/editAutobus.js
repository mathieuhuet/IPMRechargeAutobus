import './editAutobus.css';
import './editAutobusMobile.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleAutobus } from '../../../Services/autobus/getSingleAutobus';
import { useCookies } from "react-cookie";



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const EditAutobus = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
    const [cookies, setCookie] = useCookies(['accessToken']);
    const { prev, id } = useParams();
    const [ autobus, setAutobus ] = useState([]);
    let navigate = useNavigate();
  
    useEffect(() => {
      async function fetchData(accessToken) {
        const allData = await getSingleAutobus(accessToken, id);
        if (allData.data) {
          setAutobus(allData.data);
        } else {
          console.log('problem fetching data');
        }
      }
      fetchData(cookies.accessToken);
    }, [id]);

  return (
    <div>
      {isMobile &&
        <div className='EditAutobusPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='EditAutobusPage'>

        </div>
      }
    </div>
  );
};

export default EditAutobus;