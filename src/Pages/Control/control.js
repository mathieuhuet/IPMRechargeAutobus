import './control.css';
import './controlMobile.css';
import { useEffect, useState, useMemo } from 'react';
import User from '../User/user';
import { useCookies } from "react-cookie";
import { RiSettings4Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { turnOffAC } from '../../Services/control/turnOffAC';
import { turnOnAC } from '../../Services/control/turnOnAC';
import { triggerLight } from '../../Services/control/triggerLight';
import { getMessageBroadcast } from '../../Services/read/getMessageBroadcast';
import TempGraph from '../../Components/Graphs/tempGraph';
import HumiGraph from '../../Components/Graphs/humiGraph';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MessageInfo from '../../Components/MessageBroadcast/messageInfo';
import { getAllData } from '../../Services/read/getAllData';
import { getAllDataHistory } from '../../Services/read/getAllDataHistory';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../../Utilities/windowDimension';
import { MenuItem } from '@mui/material';
import AutomaticState from '../../Components/State/automatic';
import { getAutomaticModeData } from '../../Services/read/getAutomaticModeData';



const Control = () => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [acState, setAcState] = useState('unknown');
  const [refresh, setRefresh] = useState(0);
  const [allData, setAllData] = useState([]);
  const [insideTemp, setInsideTemp] = useState('');
  const [insideHumi, setInsideHumi] = useState('');
  const [outsideTemp, setOutsideTemp] = useState('');
  const [outsideHumi, setOutsideHumi] = useState('');
  const [insideCheck, setInsideCheck] = useState(true);
  const [outsideCheck, setOutsideCheck] = useState(true);
  const [nbJours, setNbJours] = useState(2);
  const [actualMin, setactualMin] = useState(0);
  const [actualMax, setactualMax] = useState(0);
  const [isAutoOn, setIsAutoOn] = useState(false);
  const [broadcastEnable, setBroadcastEnable] = useState(false);
  const [broadcastTime, setBroadcastTime] = useState(3);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  

  const graphData = useMemo(() => {
    const timeLabels = [];
    const insideTemp = [];
    const insideHumi = [];
    const outsideTemp = [];
    const outsideHumi = [];
    const insideTemp2 = [];
    const insideHumi2 = [];
    const acstate = [];

    for (let k = 0; k < allData.length; k++) {
      timeLabels.push(new Date(allData[k].createdAt).toLocaleTimeString("en-GB").slice(0, -3));
      !allData[k].InsideTemp ? insideTemp.push(NaN) : insideTemp.push(allData[k].InsideTemp);
      !allData[k].InsideHumi ? insideHumi.push(NaN) : insideHumi.push(allData[k].InsideHumi);
      !allData[k].InsideTemp2 ? insideTemp2.push(NaN) : insideTemp2.push(allData[k].InsideTemp2);
      !allData[k].InsideHumi2 ? insideHumi2.push(NaN) : insideHumi2.push(allData[k].InsideHumi2);
      !allData[k].OutsideTemp ? outsideTemp.push(NaN) : outsideTemp.push(allData[k].OutsideTemp);
      !allData[k].OutsideHumi ? outsideHumi.push(NaN) : outsideHumi.push(allData[k].OutsideHumi);
      allData[k].acstate === 'ON' ? acstate.push(27) : acstate.push(NaN);
    }

    const result = {
      timeLabels: timeLabels,
      insideTemp: insideTemp,
      insideHumi: insideHumi,
      insideTemp2: insideTemp2,
      insideHumi2: insideHumi2,
      outsideTemp: outsideTemp,
      outsideHumi: outsideHumi,
      acstate: acstate
    }
    console.log(result);

    return result;
  }, [allData])

  const handleInsideCheckChange = () => {
    setInsideCheck(!insideCheck);
  }

  const handleOutsideCheckChange = () => {
    setOutsideCheck(!outsideCheck);
  }

  const handleNbJoursChange = (event) => {
    setNbJours(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      setCookie('accessToken', cookies.accessToken);
      const allData = await getAllData();
      if (allData.data) {
        setInsideTemp(allData.data.insideTemp);
        setInsideHumi(allData.data.insideHumi);
        setOutsideTemp(allData.data.outsideTemp);
        setOutsideHumi(allData.data.outsideHumi);
        setAcState(allData.data.acstate);
      } else {
        console.log('problem fetching data');
      }
      const allDataHistory = await getAllDataHistory({numberOfDays: nbJours});
      if (allDataHistory.data) {
        setAllData(allDataHistory.data);
        console.log(allDataHistory.data[0].createdAt);
      } else {
        console.log('problem fetching data');
      }
      const autoInfo = await getAutomaticModeData();
      if (autoInfo) {
        setIsAutoOn(autoInfo.data.automaticMode)
        setactualMin(autoInfo.data.lowerThreshold)
        setactualMax(autoInfo.data.upperThreshold)
      } else {
        console.log('No info about Automatic Mode found 😞');
      }
      const broadcastInfo = await getMessageBroadcast();
      if (broadcastInfo) {
        setBroadcastEnable(broadcastInfo.data.broadcastEnable)
        setBroadcastTime(broadcastInfo.data.broadcastTime)
        setBroadcastMessage(broadcastInfo.data.message)
      } else {
        console.log('No info about Broadcast message found 😞');
      }
    }
    fetchData();
  }, [nbJours, refresh]);

  const turnOff = async () => {
    const off = await turnOffAC(cookies.accessToken);
    setRefresh(refresh + 1);
  }

  const turnOn = async () => {
    const on = await turnOnAC(cookies.accessToken);
    setRefresh(refresh + 1);
  }

  const triggerOutsideLight = async () => {
    const trigger = await triggerLight(cookies.accessToken);
    setRefresh(refresh + 1);
  }

  return (
    <div>
      {isMobile &&
        <div className='ControlPage'>
          <div className='LeftControl'>
            <button
              className='TriggerLightButton'
              onClick={triggerOutsideLight}
            >
              Trigger Light
            </button>
            <div style={{marginTop: 5, width: 'fit-content', justifySelf: 'center'}}>
              <MessageInfo
                broadcastEnable={broadcastEnable}
                broadcastTime={broadcastTime}
                message={broadcastMessage}
              />
            </div>
            <div className='Ac'>
              <div className='MobileControl'>
                <div className='AcState'>
                  <h1>
                    A/C {acState === 'OFF' ? <p style={{backgroundColor: '#d32f2f'}}>OFF</p> : acState === 'ON' ? <p style={{backgroundColor: '#82bf00'}}>ON</p> : acState}
                  </h1>
                </div>
              </div>
              <div className='AcButtons'>
                <button
                  className='TurnOnButton'
                  onClick={turnOn}
                >
                  Turn ON A/C
                </button>
                <button
                  className='TurnOffButton'
                  onClick={turnOff}
                >
                  Turn OFF A/C
                </button>
              </div>
              <div className='WeatherBoxTemp'>
                <div className='TopWeatherBox'>
                  Température Actuelle
                </div>
                <div className='BottomWeatherBox'>
                  <div className='LeftWeatherBox'>
                    <div>
                      Intérieur
                    </div>
                    <div>
                      {insideTemp}°C
                    </div>
                  </div>
                  <div className='RightWeatherBox'>
                    <div>
                      Extérieur
                    </div>
                    <div>
                      {outsideTemp}°C
                    </div>
                  </div>
                </div>
              </div>
              <div className='WeatherBoxHumi'>
                <div className='TopWeatherBox'>
                  Humidité Actuelle
                </div>
                <div className='BottomWeatherBox'>
                  <div className='LeftWeatherBox'>
                    <div>
                      Intérieur
                    </div>
                    <div>
                      {insideHumi}%
                    </div>
                  </div>
                  <div className='RightWeatherBox'>
                    <div>
                      Extérieur
                    </div>
                    <div>
                      {outsideHumi}%
                    </div>
                  </div>
                </div>
                <User/>
              </div>
            </div>
          </div>
          <div className='RightControl'>
            <div className='LoggedInTempHumi'>
              <div className='OptionSelect'>
                <div className='DateSelect'>
                  Données des 
                    <FormControl variant='standard' sx={{ m: 1, maxWidth: 50}}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={nbJours}
                        onChange={handleNbJoursChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                      </Select>
                    </FormControl>
                  derniers jour(s)
                </div>
                <div className='ButtonSelect'>
                  Intérieur
                  <FormControlLabel control={<Checkbox checked={insideCheck} onChange={handleInsideCheckChange} sx={{color: '#004638', '&.Mui-checked': {color: '#004638'}}} size='large' />} />
                  Extérieur
                  <FormControlLabel control={<Checkbox checked={outsideCheck} onChange={handleOutsideCheckChange} sx={{color: '#82bf00', '&.Mui-checked': {color: '#82bf00'}}} size='large'/>} />
                </div>
              </div>
              <TempGraph 
                insideTemp={insideCheck ? graphData.insideTemp : []}
                acstate={insideCheck ? graphData.acstate : []}
                outsideTemp={outsideCheck ? graphData.outsideTemp : []}
                timelabels={graphData.timeLabels}
              />
              <HumiGraph 
                insideHumi={insideCheck ? graphData.insideHumi : []}
                acstate={insideCheck ? graphData.acstate : []}
                outsideHumi={outsideCheck ? graphData.outsideHumi : []}
                timelabels={graphData.timeLabels}
              />
            </div>
          </div>
        </div>
      }
      {!isMobile &&
        <div className='ControlPage'>
          <div className='LeftControl'>
            <div className='LoggedInTempHumi'>
              <div className='OptionSelect'>
                <div className='DateSelect'>
                  Données des 
                    <FormControl variant='standard' sx={{ m: 1, maxWidth: 50}}>
                      <Select
                        labelId="demo-simple-select-standard-label"
                        id="demo-simple-select-standard"
                        value={nbJours}
                        onChange={handleNbJoursChange}
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                        <MenuItem value={6}>6</MenuItem>
                        <MenuItem value={7}>7</MenuItem>
                      </Select>
                    </FormControl>
                  derniers jour(s)
                </div>
                <div className='ButtonSelect'>
                  Intérieur
                  <FormControlLabel control={<Checkbox checked={insideCheck} onChange={handleInsideCheckChange} sx={{color: '#004638', '&.Mui-checked': {color: '#004638'}}} size='large' />} />
                  Extérieur
                  <FormControlLabel control={<Checkbox checked={outsideCheck} onChange={handleOutsideCheckChange} sx={{color: '#82bf00', '&.Mui-checked': {color: '#82bf00'}}} size='large'/>} />
                </div>
              </div>
              <TempGraph 
                insideTemp={insideCheck ? graphData.insideTemp : []}
                acstate={insideCheck ? graphData.acstate : []}
                outsideTemp={outsideCheck ? graphData.outsideTemp : []}
                timelabels={graphData.timeLabels}
              />
              <HumiGraph 
                insideHumi={insideCheck ? graphData.insideHumi : []}
                outsideHumi={outsideCheck ? graphData.outsideHumi : []}
                acstate={insideCheck ? graphData.acstate : []}
                timelabels={graphData.timeLabels}
              />
            </div>
          </div>
          <div className='RightControl'>
            <div className='Ac'>
              <div className='LightAndUser'>
                <button
                  className='TriggerLightButton'
                  onClick={triggerOutsideLight}
                >
                  Trigger Light
                </button>
                <button
                  className='UserPageButton'
                  onClick={() => navigate('/user')}
                >
                  <RiSettings4Line />
                </button>
              </div>
              <div style={{marginBottom: 32, marginTop: -8, width: 'fit-content', justifySelf: 'center'}}>
                <MessageInfo
                  broadcastEnable={broadcastEnable}
                  broadcastTime={broadcastTime}
                  message={broadcastMessage}
                />
              </div>
              <div className='AcState'>
                <h1>
                  A/C {acState === 'OFF' ? <p style={{backgroundColor: '#d32f2f'}}>OFF</p> : acState === 'ON' ? <p style={{backgroundColor: '#82bf00'}}>ON</p> : acState}
                </h1>
              </div>
              <div className='AcButtons'>
                <button
                  className='TurnOnButton'
                  onClick={turnOn}
                >
                  Turn ON A/C
                </button>
                <button
                  className='TurnOffButton'
                  onClick={turnOff}
                >
                  Turn OFF A/C
                </button>
              </div>
              <div className='WeatherBoxTemp'>
                <div className='TopWeatherBox'>
                  Température Actuelle
                </div>
                <div className='BottomWeatherBox'>
                  <div className='LeftWeatherBox'>
                    <div>
                      Intérieur
                    </div>
                    <div>
                      {insideTemp}°C
                    </div>
                  </div>
                  <div className='RightWeatherBox'>
                    <div>
                      Extérieur
                    </div>
                    <div>
                      {outsideTemp}°C
                    </div>
                  </div>
                </div>
              </div>
              <div className='WeatherBoxHumi'>
                <div className='TopWeatherBox'>
                  Humidité Actuelle
                </div>
                <div className='BottomWeatherBox'>
                  <div className='LeftWeatherBox'>
                    <div>
                      Intérieur
                    </div>
                    <div>
                      {insideHumi}%
                    </div>
                  </div>
                  <div className='RightWeatherBox'>
                    <div>
                      Extérieur
                    </div>
                    <div>
                      {outsideHumi}%
                    </div>
                  </div>
                </div>
              </div>
              <div style={{marginTop: 5}}>
                <AutomaticState
                  automaticMode={isAutoOn}
                  lowerThreshold={actualMin}
                  upperThreshold={actualMax}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Control;
