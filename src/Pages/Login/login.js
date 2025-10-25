import './login.css';
import './loginMobile.css';
import {useState, useEffect, useMemo} from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Formik } from 'formik';
import { loginUser } from '../../Services/user/login';
import { getAllData } from '../../Services/read/getAllData';
import { getAllDataHistory } from '../../Services/read/getAllDataHistory';
import Spinner from '../../Spinner';
import HumiGraph from '../../Components/Graphs/humiGraph';
import TempGraph from '../../Components/Graphs/tempGraph';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../../Utilities/windowDimension';
import { MenuItem } from '@mui/material';
import AutomaticState from '../../Components/State/automatic';
import { getAutomaticModeData } from '../../Services/read/getAutomaticModeData';
import MessageInfo from '../../Components/MessageBroadcast/messageInfo';
import { getMessageBroadcast } from '../../Services/read/getMessageBroadcast';


/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const Login = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const { height, width } = useWindowDimensions();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [allData, setAllData] = useState([]);
  const [insideTemp, setInsideTemp] = useState('');
  const [insideHumi, setInsideHumi] = useState('');
  const [outsideTemp, setOutsideTemp] = useState('');
  const [outsideHumi, setOutsideHumi] = useState('');
  const [acState, setAcState] = useState('');
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

    // for (let k = 0; k < allData.length; k++) {
    //   timeLabels.push(new Date(allData[k].createdAt).toString().slice(4, -46) + new Date(allData[k].createdAt).toString().slice(16, -36));
    //   !allData[k].InsideTemp ? insideTemp.push(NaN) : insideTemp.push(allData[k].InsideTemp);
    //   !allData[k].InsideHumi ? insideHumi.push(NaN) : insideHumi.push(allData[k].InsideHumi);
    //   !allData[k].InsideTemp2 ? insideTemp2.push(NaN) : insideTemp2.push(allData[k].InsideTemp2);
    //   !allData[k].InsideHumi2 ? insideHumi2.push(NaN) : insideHumi2.push(allData[k].InsideHumi2);
    //   !allData[k].OutsideTemp ? outsideTemp.push(NaN) : outsideTemp.push(allData[k].OutsideTemp);
    //   !allData[k].OutsideHumi ? outsideHumi.push(NaN) : outsideHumi.push(allData[k].OutsideHumi);
    //   allData[k].acstate == 'ON' ? acstate.push('ON') : acstate.push('OFF');
    // }
    for (let k = 0; k < allData.length; k++) {
      timeLabels.push(new Date(allData[k].createdAt).toLocaleTimeString("en-GB").slice(0, -3));
      !allData[k].InsideTemp ? insideTemp.push(NaN) : insideTemp.push(allData[k].InsideTemp);
      !allData[k].InsideHumi ? insideHumi.push(NaN) : insideHumi.push(allData[k].InsideHumi);
      !allData[k].InsideTemp2 ? insideTemp2.push(NaN) : insideTemp2.push(allData[k].InsideTemp2);
      !allData[k].InsideHumi2 ? insideHumi2.push(NaN) : insideHumi2.push(allData[k].InsideHumi2);
      !allData[k].OutsideTemp ? outsideTemp.push(NaN) : outsideTemp.push(allData[k].OutsideTemp);
      !allData[k].OutsideHumi ? outsideHumi.push(NaN) : outsideHumi.push(allData[k].OutsideHumi);
      allData[k].acstate == 'ON' ? acstate.push(27) : acstate.push(NaN);
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

    return result;
  }, [allData])


  const handleLogin = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await loginUser(credentials);
      if (result.data) {
        setCookie('accessToken', result.data.accessToken);
        setMessage('Vous êtes connecté.');
      }
      setSubmitting(false);
    } catch (error) {
      if (error.message) {
        setMessage(error.message);
      }
      console.log(error);
      setSubmitting(false);
    }
  }

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
  }, [nbJours]);

  return (
    <div>
      {isMobile &&
          <div className='LoginPage'>
          <div className='Login'>
            <div className='TempBox'>
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
                <div className='LoginAcState'>
                  <h1>
                    A/C {acState === 'OFF' ? <p style={{backgroundColor: '#d32f2f'}}>OFF</p> : acState === 'ON' ? <p style={{backgroundColor: '#82bf00'}}>ON</p> : acState}
                  </h1>
                </div>
                <div style={{ width: 'fit-content', justifySelf: 'center'}}>
                <AutomaticState
                  automaticMode={isAutoOn}
                  lowerThreshold={actualMin}
                  upperThreshold={actualMax}
                />
              </div>
              </div>
            <div className='Formik'>
              <Formik
                initialValues={{ email: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin({email: values.email.toLowerCase(), password: values.password}, setSubmitting)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className='EmailForm'>
                    <div className='EmailInput'>
                      <label
                        className='label'
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='Email'
                      />
                      <label
                        className='label'
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='Password'
                      />
                      <h6>
                        {message || ' '}
                      </h6>
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitEmail'>
                        Se Connecter
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      }
      {!isMobile &&
          <div className='LoginPage'>
          <div className='Login'>
            <div className='TempBox'>
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
                  <FormControlLabel control={<Checkbox checked={insideCheck} onChange={handleInsideCheckChange} sx={{color: '#004638', '&.Mui-checked': {color: '#004638'}}} size='large'/>} />
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
            <div className='Formik'>
              Bonjour
              <Formik
                initialValues={{ email: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin({email: values.email.toLowerCase(), password: values.password}, setSubmitting)
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (
                  <form onSubmit={handleSubmit} className='EmailForm'>
                    <div className='EmailInput'>
                      <label
                        className='label'
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='Email'
                      />
                      <label
                        className='label'
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='Password'
                      />
                      <h6>
                        {message || ' '}
                      </h6>
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitEmail'>
                        Se Connecter
                      </button>
                    }
                  </form>
                )}
              </Formik>
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
                <div className='LoginAcState'>
                  <h1>
                    A/C {acState === 'OFF' ? <p style={{backgroundColor: '#d32f2f'}}>OFF</p> : acState === 'ON' ? <p style={{backgroundColor: '#82bf00'}}>ON</p> : acState}
                  </h1>
                </div>
              </div>
              <div style={{marginTop: 5, width: 'fit-content', justifySelf: 'center'}}>
                <AutomaticState
                  automaticMode={isAutoOn}
                  lowerThreshold={actualMin}
                  upperThreshold={actualMax}
                />
              </div>
              <div style={{marginTop: 5, width: 'fit-content', justifySelf: 'center'}}>
                <MessageInfo
                  broadcastEnable={broadcastEnable}
                  broadcastTime={broadcastTime}
                  message={broadcastMessage}
                />
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
