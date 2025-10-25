import './user.css';
import './userMobile.css';
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useCookies } from "react-cookie";
import { getUserInfo } from '../../Services/user/getUserInfo';
import { adjustAutomaticMode } from '../../Services/control/adjustAutomaticMode';
import { turnOffAutomatic} from '../../Services/control/turnOffAutomatic';
import { turnOnAutomatic } from '../../Services/control/turnOnAutomatic';
import { getAutomaticModeData } from '../../Services/read/getAutomaticModeData';
import AutomaticState from '../../Components/State/automatic';

const initialState = {
  firstName: '',
  lastName: '',
};


const User = () => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [state, setState] = useState(initialState);
  const [refresh, setRefresh] = useState(0);
  const [valueMin, setValueMin] = useState(24);
  const [valueMax, setValueMax] = useState(26);
  const [actualMin, setactualMin] = useState(0);
  const [actualMax, setactualMax] = useState(0);
  const [isAutoOn, setIsAutoOn] = useState(false);

  useEffect(() => {
    async function fetchData(accessToken) {
      const userInfo = await getUserInfo(accessToken);
      if (userInfo) {
        setState({firstName: userInfo.data.firstName, lastName: userInfo.data.lastName})
      } else {
        console.log('No user info found 😞');
      }
      const autoInfo = await getAutomaticModeData();
      if (autoInfo) {
        setIsAutoOn(autoInfo.data.automaticMode)
        setactualMin(autoInfo.data.lowerThreshold)
        setactualMax(autoInfo.data.upperThreshold)
        setValueMax(autoInfo.data.upperThreshold)
        setValueMin(autoInfo.data.lowerThreshold)
      } else {
        console.log('No info about Automatic Mode found 😞');
      }
    }
    fetchData(cookies.accessToken);
  }, [cookies.accessToken, refresh]);

  const marks = [
    {
      value: 22,
      label: '22°C',
    },
    {
      value: 23,
      label: '23°C',
    },
    {
      value: 24,
      label: '24°C',
    },
    {
      value: 25,
      label: '25°C',
    },
      {
      value: 26,
      label: '26°C',
    },
      {
      value: 27,
      label: '27°C',
    },
      {
      value: 28,
      label: '28°C',
    },
  ];

  function valuetext(value) {
    return `${value}°C`;
  }

  const handleChangeMin = (event, newValue) => {
    setValueMin(newValue);
  };

  const handleChangeMax = (event, newValue) => {
    setValueMax(newValue);
  };

  const turnOff = async () => {
    const off = await turnOffAutomatic(cookies.accessToken);
    setRefresh(refresh + 1);
  }

  const turnOn = async () => {
    const on = await turnOnAutomatic(cookies.accessToken);
    setRefresh(refresh + 1);
  }

  const sendAutomaticSettings = async () => {
    const send = await adjustAutomaticMode({min: valueMin, max: valueMax}, cookies.accessToken);
    setRefresh(refresh + 1);
  }

  const disconnect = () => {
    setCookie('accessToken', '');
  }

  return (
    <div className='UserPage'>
      <div className='AutomaticSettings'>
        <div className='Sliders'>
          <Box sx={{ width: 300, marginBottom: 2 }}>
            Stop A/C when inside temperature reach :
            <Slider
              aria-label="Custom marks"
              value={valueMin}
              onChange={handleChangeMin}
              getAriaValueText={valuetext}
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              min={22}
              max={28}
            />
          </Box>
          <Box sx={{ width: 300 }}>
            Start A/C when inside temperature reach :
            <Slider
              aria-label="Custom marks"
              value={valueMax}
              onChange={handleChangeMax}
              getAriaValueText={valuetext}
              step={0.1}
              valueLabelDisplay="auto"
              marks={marks}
              min={22}
              max={28}
              color='error'
            />
          </Box>
        </div>
        <div className='SendSettings'>
          <button
            className='SendSettingsButton'
            onClick={sendAutomaticSettings}
          >
            Send Automatic Settings
          </button>
          <button
            className='TurnOnAuto'
            onClick={turnOn}
          >
            Turn ON Auto
          </button>
          <button
            className='TurnOffAuto'
            onClick={turnOff}
          >
            Turn OFF Auto
          </button>
        </div>
      </div>
      <div style={{marginTop: '2%', marginBottom: '-2%'}}>
        <AutomaticState
          automaticMode={isAutoOn}
          lowerThreshold={actualMin}
          upperThreshold={actualMax}
        />
      </div>
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

export default User;
