import './editChargeur.css';
import './editChargeurMobile.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleChargeur } from '../../../Services/chargeur/getSingleChargeur';
import { useCookies } from "react-cookie";
import { FaTrashAlt } from "react-icons/fa";





const EditChargeur = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const { prev, id } = useParams();
  const [ chargeur, setChargeur ] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getSingleChargeur(accessToken, id);
      if (allData.data) {
        setChargeur(allData.data);
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [id]);


  return (
    <div>
      {isMobile &&
        <div className='EditChargeurPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='EditChargeurPage'>
          TEST EDIT CHARGEUR
          <div className='DeleteChargeur'>
            <FaTrashAlt />
          </div>
        </div>
      }
    </div>
  );
};

export default EditChargeur;
