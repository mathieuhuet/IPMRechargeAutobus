import './editAutobus.css';
import './editAutobusMobile.css';
import { useMediaQuery } from 'react-responsive';
import { Formik } from 'formik';
import Spinner from '../../../Spinner';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleAutobus } from '../../../Services/autobus/getSingleAutobus';
import { useCookies } from "react-cookie";
import { FaTrashAlt } from "react-icons/fa";
import AutobusComponent from '../../../Components/Autobus/autobusComponent';
import { deleteAutobus } from '../../../Services/autobus/deleteAutobus';
import { updateAutobus } from '../../../Services/autobus/updateAutobus';
import { getBatteryHistory } from '../../../Services/autobus/getBatteryHistory';
import BatteryGraph from '../../../Components/Graphs/batteryGraph';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { getChargeur } from '../../../Services/chargeur/getChargeur';
import { associateAutobusChargeur } from '../../../Services/autobus/associateAutobusChargeur';



const EditAutobus = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const { prev, id } = useParams();
  const [autobus, setAutobus] = useState({name: '', level: '', chargeur: '', rfid: ''});
  const [batteryHistory, setBatteryHistory] = useState([]);
  const [chargeur, setChargeur] = useState(0);
  const [allChargeur, setAllChargeur] = useState([]);
  const [refresh, setRefresh] = useState(0);
  let navigate = useNavigate();


  const graphData = useMemo(() => {
    const timeLabels = [];
    const batteryLevel = [];

    for (let k = 0; k < batteryHistory.length; k++) {
      timeLabels.push(new Date(batteryHistory[k].createdAt).toLocaleTimeString("en-GB").slice(0, -3));
      !batteryHistory[k].battery ? batteryLevel.push(NaN) : batteryLevel.push(batteryHistory[k].battery);
    }

    const result = {
      timeLabels: timeLabels,
      batteryLevel: batteryLevel
    }

    return result;
  }, [batteryHistory])
  
  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getSingleAutobus(id, accessToken);
      const chargeurs = await getChargeur(accessToken);
      if (chargeurs.data) {
        setAllChargeur(chargeurs.data);
      } else {
        console.log('problem fetching all chargeurs')
      }
      if (allData.data) {
        setAutobus({name: allData.data.name, level: allData.data.batteryLevel, chargeur: allData.data.charger, rfid: allData.data.rfid, createdAt: allData.data.createdAt, createdBy: allData.data.createdBy, id: allData.data.id, lastCharge: allData.data.lastCharge, updatedAt: allData.data.updatedAt});
        setChargeur(allData.data.charger);
      } else {
        console.log('problem fetching autobus data');
      }
      const allDataHistory = await getBatteryHistory(id, accessToken);
      if (allDataHistory.data) {
        setBatteryHistory(allDataHistory.data);
      } else {
        console.log('problem fetching data batteryHistory');
      }
    }
    fetchData(cookies.accessToken);
  }, [id, refresh]);

  const handleDeleteAutobus = async () => {
    // call backend and move to next page if successful
    try {
      const result = await deleteAutobus(id, cookies.accessToken);
      console.log(result);
      if (result.data) {
        navigate('/autobus');
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      console.log(error);
    }
  }

  const handleUpdateAutobus = async (updatedValue, setSubmitting) => {
    try {
      const result = await updateAutobus({id: id, rfid: updatedValue.rfid, name: updatedValue.name}, cookies.accessToken);
      if (result.data) {
        setRefresh(refresh + 1);
      }
      setSubmitting(false);
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      console.log(error);
      setSubmitting(false);
    }
  }

  const handleChargeurChange = async (event) => {
    try {
      const result = await associateAutobusChargeur({autobusid: id, chargeurid: event.target.value}, cookies.accessToken);
      if (result.data) {
        setRefresh(refresh + 1);
        setChargeur(event.target.value);
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      console.log(error);
    }
  };

  return (
    <div>
      {isMobile &&
        <div className='EditAutobusPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='EditAutobusPage'>
          <div className='EditAutobusTop'>
            <AutobusComponent
              name={autobus.name}
              level={autobus.level}
              chargeur={autobus.chargeur}
            />
            <div className='ChargeurSelect'>
              <div>
                Changer le chargeur utilisé : 
              </div>
              <div>
                <FormControl variant='standard' sx={{ m: 1}}>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={chargeur}
                    onChange={handleChargeurChange}
                  >
                    <MenuItem value={0}>Déconnecter</MenuItem>
                    {allChargeur.map((chargeur) =>
                      chargeur.autobus == 0 || chargeur.autobus == id ?
                      <MenuItem value={chargeur.id}>{chargeur.name}</MenuItem>
                      : <></>
                    )}
                  </Select>
                </FormControl>
              </div>
            </div>
            <div className='DeleteAutobus' onClick={handleDeleteAutobus}>
              <FaTrashAlt />
            </div>
          </div>
          <div className='EditAutobusBottom'>
            <div className='Formik'>
              <Formik
                initialValues={{ rfid: autobus.rfid, name: autobus.name }}
                validate={values => {
                  const errors = {};
                  if (!values.rfid) {
                    errors.rfid = "RFID de l'autobus requis";
                  } else if (!values.name) {
                    errors.rfid = "Nom de l'autobus requis";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleUpdateAutobus({rfid: values.rfid.toUpperCase(), name: values.name}, setSubmitting)
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
                  <form onSubmit={handleSubmit} className='ModifyAutobusForm'>
                    <div className='AutobusInput'>
                      <label
                        className='label'
                      >
                        RFID
                      </label>
                      <input
                        name="rfid"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.rfid}
                        className='rfidInput'
                        placeholder={autobus.rfid}
                      />
                      <label
                        className='label'
                      >
                        Nom de l'autobus
                      </label>
                      <input
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className='nameInput'
                        placeholder={autobus.name}
                      />
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitAutobus'>
                        Modifier Autobus
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
            <div>
              <BatteryGraph
                timelabels={graphData.timeLabels}
                batteryLevel={graphData.batteryLevel}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default EditAutobus;