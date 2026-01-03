import './editChargeur.css';
import './editChargeurMobile.css';
import { useMediaQuery } from 'react-responsive';
import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleChargeur } from '../../../Services/chargeur/getSingleChargeur';
import { getAutobus } from '../../../Services/autobus/getAutobus';
import { useCookies } from "react-cookie";
import { FaTrashAlt } from "react-icons/fa";
import { deleteChargeur } from '../../../Services/chargeur/deleteChargeur';
import { updateChargeur } from '../../../Services/chargeur/updateChargeur';
import { associateAutobusChargeur } from '../../../Services/autobus/associateAutobusChargeur';
import ChargeurComponent from '../../../Components/Chargeur/chargeurComponent';
import { Formik } from 'formik';
import Spinner from '../../../Spinner';



const EditChargeur = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });
  const [cookies, setCookie] = useCookies(['accessToken']);
  const { prev, id } = useParams();
  const [ chargeur, setChargeur ] = useState({name: '', autobus: ''});
  const [allAutobus, setAllAutobus] = useState([]);
  const [message, setMessage] = useState('');
  const [refresh, setRefresh] = useState(0);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchData(accessToken) {
      const allAutobusData = await getAutobus(accessToken);
      if (allAutobusData.data) {
        let autobusArray = [];
        for (let i = 0; i < allAutobusData.data.length; i++) {
          autobusArray.push(allAutobusData.data[i]);
        }
        setAllAutobus(autobusArray);
      } else {
        console.log('problem fetching data');
      }
      const allData = await getSingleChargeur(id, accessToken);
      if (allData.data) {
        setChargeur(allData.data);
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [id, refresh]);


  const handleDeleteChargeur = async () => {
    // call backend and move to next page if successful
    try {
      if (chargeur.autobus != 0) {
        setMessage("Vous devez déconnecter l'autobus du chargeur avant de pouvoir le supprimer.")
      } else {
        const result = await deleteChargeur(id, cookies.accessToken);
        if (result.data) {
          navigate('/chargeur');
        }
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      console.log(error);
    }
  }

  const handleUpdateChargeur = async (updatedValue, setSubmitting) => {
    try {
      const result = await updateChargeur({id: id, rfid: updatedValue.rfid, name: updatedValue.name}, cookies.accessToken);
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

  const handleDisconnectChargeur = async () => {
    try {
      const result = await associateAutobusChargeur({autobusid: 0, chargeurid: chargeur.id}, cookies.accessToken);
      if (result.data) {
        setRefresh(refresh + 1);
      }
    } catch (error) {
      if (error.message) {
        console.log(error.message);
      }
      console.log(error);
    }
  };

  function provideAutobusNameToComponent (autobusID) {
    let autobusName = "";
    for (let i = 0; i < allAutobus.length; i++) {
      if (allAutobus[i].id == autobusID) {
        autobusName = allAutobus[i].name;
        i = allAutobus.length;
      }
    }
    return autobusName;
  }

  return (
    <div>
      {isMobile &&
        <div className='EditChargeurPage'>
          <div className='EditChargeurTop'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <ChargeurComponent
                name={chargeur.name}
                autobus={chargeur.autobus}
                autobusName={provideAutobusNameToComponent(chargeur.autobus)}
              />
              {chargeur.autobus != 0 ?
                <div className='DisconnectChargeur' onClick={handleDisconnectChargeur}>
                  <div>
                    Déconnecter l'autobus
                  </div>
                  <div>
                    connecté au chargeur
                  </div>
                </div>
              : <></>  }
            </div>
            <div className='Formik' style={{marginTop: '64px'}}>
              <Formik
                initialValues={{ rfid: chargeur.rfid, name: chargeur.name }}
                validate={values => {
                  const errors = {};
                  if (!values.rfid) {
                    errors.rfid = "RFID du chargeur requis";
                  } else if (!values.name) {
                    errors.rfid = "Nom du chargeur requis";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleUpdateChargeur({rfid: values.rfid.toUpperCase(), name: values.name}, setSubmitting)
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
                  <form onSubmit={handleSubmit} className='ModifyChargeurForm'>
                    <div className='ChargeurInput'>
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
                        className='EditRFIDInput'
                        placeholder={chargeur.rfid}
                      />
                      <label
                        className='label'
                      >
                        Nom du chargeur
                      </label>
                      <input
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className='EditNameInput'
                        placeholder={chargeur.name}
                        minLength="4"
                        maxLength="12"
                      />
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitEditChargeur'>
                        Modifier Chargeur
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
            <div className='DeleteChargeur' onClick={handleDeleteChargeur}>
              <FaTrashAlt />
            </div>
          </div>
          <div className='EditChargeurBottom'>
            <h6>
              {message || ' '}
            </h6>
          </div>
        </div>
      }
      {!isMobile &&
        <div className='EditChargeurPage'>
          <div className='EditChargeurTop'>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
              <ChargeurComponent
                name={chargeur.name}
                autobus={chargeur.autobus}
                autobusName={provideAutobusNameToComponent(chargeur.autobus)}
              />
              {chargeur.autobus != 0 ?
                <div className='DisconnectChargeur' onClick={handleDisconnectChargeur}>
                  <div>
                    Déconnecter l'autobus
                  </div>
                  <div>
                    connecté au chargeur
                  </div>
                </div>
              : <></>  }
            </div>
            <div className='Formik'>
              <Formik
                initialValues={{ rfid: chargeur.rfid, name: chargeur.name }}
                validate={values => {
                  const errors = {};
                  if (!values.rfid) {
                    errors.rfid = "RFID du chargeur requis";
                  } else if (!values.name) {
                    errors.rfid = "Nom du chargeur requis";
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleUpdateChargeur({rfid: values.rfid.toUpperCase(), name: values.name}, setSubmitting)
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
                  <form onSubmit={handleSubmit} className='ModifyChargeurForm'>
                    <div className='ChargeurInput'>
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
                        placeholder={chargeur.rfid}
                      />
                      <label
                        className='label'
                      >
                        Nom du chargeur
                      </label>
                      <input
                        name="name"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.name}
                        className='nameInput'
                        placeholder={chargeur.name}
                        minLength="4"
                        maxLength="12"
                      />
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitChargeur'>
                        Modifier Chargeur
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
            <div className='DeleteChargeur' onClick={handleDeleteChargeur}>
              <FaTrashAlt />
            </div>
          </div>
          <div className='EditChargeurBottom'>
            <h6>
              {message || ' '}
            </h6>
          </div>
        </div>
      }
    </div>
  );
};

export default EditChargeur;
