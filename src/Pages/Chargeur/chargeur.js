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
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [refresh, setRefresh] = useState(0);
  const [chargeur, setChargeur] = useState([]);

  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getChargeur(accessToken);
      if (allData.data) {
        let chargeurArray = [];
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
          <div className='ListeChargeur'>
            <ChargeurComponent 
              name='Chargeur test'
            />
            {chargeur ? chargeur.map((charge) => 
              <div key={charge.id}>
              <Link to={'/status/autobus/' + charge.id} style={{textDecoration: 'none'}}>
                <ChargeurComponent
                  name={charge.name}
                />
              </Link>
              </div>
            ) : <></>}
          </div>
          <div className='AddChargeur'
            onClick={() => navigate('/addchargeur')}
          >
            <TiPlus />
          </div>
        </div>
      }
      {!isMobile &&
        <div className='ChargeurPage'>
          <div className='ListeChargeur'>
            <ChargeurComponent 
              name='Chargeur test'
            />
            {chargeur ? chargeur.map((charge) => 
              <div key={charge.id}>
              <Link to={'/status/autobus/' + charge.id} style={{textDecoration: 'none'}}>
                <ChargeurComponent
                  name={charge.name}
                />
              </Link>
              </div>
            ) : <></>}
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
