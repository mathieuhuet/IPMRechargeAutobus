import './addAutobus.css';
import './addAutobusMobile.css';
import {useState, useEffect, useMemo} from 'react';
import { useCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import Spinner from '../../../Spinner';
import { createAutobus } from '../../../Services/autobus/createAutobus';







const AddAutobus = (props) => {
  let navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [message, setMessage] = useState('');
  
  const handleCreateAutobus = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await createAutobus(credentials, cookies.accessToken);
      if (result.data) {
        setMessage('Autobus a été créer.');
        navigate('/autobus');
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

  return (
    <div>
      {isMobile &&
        <div className='AddAutobusPage'>
          Créer un nouvel Autobus
          <Formik
            initialValues={{ rfid: '', name: '' }}
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
              handleCreateAutobus({rfid: values.rfid.toUpperCase(), name: values.name}, setSubmitting)
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
              <form onSubmit={handleSubmit} className='AutobusForm'>
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
                    value={values.email}
                    className='rfidInput'
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
                    value={values.password}
                    className='nameInput'
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
                  <button type="submit" disabled={isSubmitting} className='SubmitAutobus'>
                    Ajouter Autobus
                  </button>
                }
              </form>
            )}
          </Formik>
        </div>
      }
      {!isMobile &&
        <div className='AddAutobusPage'>
          Créer un nouvel Autobus
          <Formik
            initialValues={{ rfid: '', name: '' }}
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
              handleCreateAutobus({rfid: values.rfid.toUpperCase(), name: values.name}, setSubmitting)
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
              <form onSubmit={handleSubmit} className='AutobusForm'>
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
                    value={values.email}
                    className='rfidInput'
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
                    value={values.password}
                    className='nameInput'
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
                  <button type="submit" disabled={isSubmitting} className='SubmitAutobus'>
                    Ajouter Autobus
                  </button>
                }
              </form>
            )}
          </Formik>
        </div>
      }
    </div>
  );
};

export default AddAutobus;