import './header.css';
import './headerMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { RiRadarFill } from "react-icons/ri";
import { RiUserHeartFill } from "react-icons/ri";
import { MdCable } from "react-icons/md";
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MHRem from '../Icons/MHRem';
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
            onClick={() => navigate('/me')}
          >
            <div className='menu-button'>
              {" Autobus "}
              <RiUserHeartFill />
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/dev')}
          >
            <div className='menu-button'>
              - {` Chargeurs `}
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/telecom')}
          >
            <div className='menu-button'>
              {" Historique "}
              <MdCable />
            </div>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            onClick={() => navigate('/sti')}
          >
            <div className='menu-button'>
              {" À propos "}
              <RiRadarFill />
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
          <img
            src={Logo} 
            width={387}
            height={77}
            style={{cursor: 'pointer', marginLeft: 16}}
            onClick={() => navigate('/login')}
          />
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
          width={194}
          height={39}
          style={{cursor: 'pointer', marginLeft: 16}}
          onClick={() => navigate('/')}
        />
        <div className='header-selection'
          onClick={() => navigate('/me')}
        >
          {"Autobus"}
          <RiUserHeartFill />
        </div>
        <div className='header-selection'
          onClick={() => navigate('/dev')}
        >
          {`Chargeurs`}
        </div>
        <div className='header-selection'
          onClick={() => navigate('/telecom')}
        >
          {"Historique"}
          <MdCable />
        </div>
        <div className='header-selection'
          onClick={() => navigate('/sti')}
        >
          {"À propos"}
          <RiRadarFill />
        </div>
      </div>
    )
  }
}

export default Header;