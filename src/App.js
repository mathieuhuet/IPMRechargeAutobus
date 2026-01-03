import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from "./Components/Header/header";
import Bottom from "./Components/Bottom/bottom";
import ScrollToTop from "./Utilities/scrollToTop";
// Auth
import { useCookies } from 'react-cookie';
import { getUserInfo } from './Services/user/getUserInfo';
import SignedInRoute from './Routes/signedInRoute';
import SignedOutRoute from './Routes/signedOutRoute';


function App() {
  // ONLY USED WHEN RENDERING MOBILE MODE This is to disable the mobile menu to pop at the top (it is use when looking through screenshots for example)
  const [allowMobileMenu, setAllowMobileMenu] = useState(true);
  const [cookies, setCookie] = useCookies(['accessToken']);

  useEffect(() => {
    if (cookies.accessToken) {
      getUserInfo(cookies.accessToken).then((result) => {
        localStorage.setItem('user', JSON.stringify(result.data));
      }).catch((err) => {
        setCookie('accessToken', '');
        console.log(err, 'APP 2');
      })
    }
  }, [cookies.accessToken, setCookie])

  return (
    <div className="app">
      <Router>
        <ScrollToTop />
        <Header
          allowMobileMenu={allowMobileMenu}
        />
        <div className="app-main">
          {cookies.accessToken ?           
            <SignedInRoute
              setAllowMobileMenu={setAllowMobileMenu}
            /> :
            <SignedOutRoute
              setAllowMobileMenu={setAllowMobileMenu}
            />
          }
        </div>
        <Bottom />
      </Router>
    </div>
  );
}

export default App;
