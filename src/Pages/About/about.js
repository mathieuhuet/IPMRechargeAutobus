import './about.css';
import './aboutMobile.css';
import { useEffect, useState } from 'react';
import { useCookies } from "react-cookie";
import { getUserInfo } from '../../Services/user/getUserInfo';


const initialState = {
  firstName: '',
  lastName: '',
};


const About = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [state, setState] = useState(initialState);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    async function fetchData(accessToken) {
      const userInfo = await getUserInfo(accessToken);
      if (userInfo) {
        setState({firstName: userInfo.data.firstName, lastName: userInfo.data.lastName})
      } else {
        console.log('No user info found 😞');
      }
    }
    fetchData(cookies.accessToken);
  }, [cookies.accessToken, refresh]);




  const disconnect = () => {
    setCookie('accessToken', '');
  }

  return (
    <div className='AboutPage'>
      <div className='namefield'>
        <h1>
          {state.firstName} {state.lastName}
        </h1>
      </div>
      <button
        className='DisconnectButton'
        onClick={disconnect}
      >
        Se Déconnecter
      </button>
    </div>
  );
};

export default About;
