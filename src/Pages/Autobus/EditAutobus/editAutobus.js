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






const EditAutobus = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
    const [cookies, setCookie] = useCookies(['accessToken']);
    const { prev, id } = useParams();
    const [ autobus, setAutobus ] = useState({name: '', level: '', chargeur: '', rfid: ''});
    let navigate = useNavigate();
  
  useEffect(() => {
    async function fetchData(accessToken) {
      const allData = await getSingleAutobus(id, accessToken);
      if (allData.data) {
        setAutobus({name: allData.data.name, level: allData.data.batteryLevel, chargeur: allData.data.charger, rfid: allData.data.rfid, createdAt: allData.data.createdAt, createdBy: allData.data.createdBy, id: allData.data.id, lastCharge: allData.data.lastCharge, updatedAt: allData.data.updatedAt});
      } else {
        console.log('problem fetching data');
      }
    }
    fetchData(cookies.accessToken);
  }, [id]);

  const handleDeleteAutobus = async () => {
    // call backend and move to next page if successful
    try {
      const result = await deleteAutobus(id, cookies.accessToken);
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

  const handleUpdateAutobus = async () => {
    // call backend and move to next page if successful
    try {
      const result = await deleteAutobus(id, cookies.accessToken);
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
            <div className='DeleteAutobus' onClick={handleDeleteAutobus}>
              <FaTrashAlt />
            </div>
          </div>
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
        </div>
      }
    </div>
  );
};

export default EditAutobus;