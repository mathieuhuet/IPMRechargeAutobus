import './header.css';
import './headerMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { FaBus } from "react-icons/fa";
import { MdElectricalServices } from "react-icons/md";
import { FaClock } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";


import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Logo from '../../Assets/logo-grimard.png';




const Header = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [showNavbar, setShowNavbar] = useState(true);
  const [drawerState, setDrawerState] = useState(false);


  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerState(!drawerState);
  };


  // Drawer
  const list = () => (
    <Box
      sx={{ width: '85vmin' }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/autobus')}
          >
            <div className='menu-button'>
              <FaBus />
              {" Autobus"}
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/chargeur')}
          >
            <div className='menu-button'>
              <MdElectricalServices />
              {` Chargeurs`}
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/historique')}
          >
            <div className='menu-button'>
              <FaClock />
              {" Historique"}
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/about')}
          >
            <div className='menu-button'>
              <FaInfoCircle />
              {" À propos "}
            </div>
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <div
        style={{display: 'flex', justifyContent: 'center'}}
      >
        <div
          style={{width: '80%'}}
        >
          <img
            src={Logo}
            alt='Logo'
            onClick={() => navigate('/')}
          />
        </div>
      </div>
    </Box>
  );

  // Mobile hide-header scroll logic
  const [scrollTop, setScrollTop] = useState(0);
  const [prevScrollTop, setPrevScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = (event) => {
      setScrollTop(window.scrollY);
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    if (!props.allowMobileMenu) {
      setShowNavbar(false);
    } else {
      if (scrollTop > prevScrollTop + 5 && showNavbar && scrollTop > 40) {
        setShowNavbar(false);
      } else if ((scrollTop < prevScrollTop - 1 && !showNavbar) || scrollTop < 40) {
        setShowNavbar(true);
      }
      setPrevScrollTop(scrollTop);
    }
  }, [scrollTop, props.allowMobileMenu]);


  return (
    <div>
      {isMobile ? <Mobile /> : <Desktop />}
    </div>
  );


  function Mobile () {
    return (
        <div 
          className={"header" + (!showNavbar ? ' sticky-hidden' : '')} 
          role='banner'
        >
          <div>
            <img
              src={Logo} 
              alt='Logo'
              width={194}
              height={39}
              style={{cursor: 'pointer', marginLeft: 16}}
              onClick={() => navigate('/login')}
            />
          </div>
          <React.Fragment>
            <div
              className="toggle-menu"
              onClick={toggleDrawer()}
            >
              Menu
            </div>
            <Drawer
              anchor={'right'}
              open={drawerState}
              onClose={toggleDrawer()}
            >
              {list()}
            </Drawer>
          </React.Fragment>
        </div>
    )
  }

  function Desktop () {
    return (
      <div className='header'>
        <img
          src={Logo} 
          alt='Logo'
          width={194}
          height={39}
          style={{cursor: 'pointer'}}
          onClick={() => navigate('/')}
        />
        <div className='header-selection'
          onClick={() => navigate('/autobus')}
        >
          <FaBus />
          {" Autobus"}
        </div>
        <div className='header-selection'
          onClick={() => navigate('/chargeur')}
        >
          <MdElectricalServices />
          {`Chargeurs`}
        </div>
        <div className='header-selection'
          onClick={() => navigate('/historique')}
        >
          <FaClock />
          {"Historique"}
        </div>
        <div className='header-selection'
          onClick={() => navigate('/about')}
        >
          <FaInfoCircle />
          {"À propos"}
        </div>
      </div>
    )
  }
}

export default Header;