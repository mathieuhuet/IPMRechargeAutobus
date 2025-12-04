import './addChargeur.css';
import './addChargeurMobile.css';
import {useState, useEffect, useMemo} from 'react';
import { useCookies } from "react-cookie";
import { useMediaQuery } from 'react-responsive';
import { Formik } from 'formik';
import Spinner from '../../../Spinner';
import { createChargeur } from '../../../Services/chargeur/createChargeur';







const AddChargeur = (props) => {
  const [cookies, setCookie] = useCookies(['accessToken']);
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const [message, setMessage] = useState('');
  
  const handleCreateChargeur = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await createChargeur(credentials, cookies.accessToken);
      if (result.data) {

        setMessage('Chargeur a été créer');
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
        <div className='AddChargeurPage'>
          <div className='Formik'>
            <Formik
              initialValues={{ rfid: '', name: '' }}
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
                handleCreateChargeur({rfid: values.rfid.toLowerCase(), name: values.name}, setSubmitting)
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
                <form onSubmit={handleSubmit} className='ChargeurForm'>
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
                      value={values.email}
                      className='rfidInput'
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
                    <button type="submit" disabled={isSubmitting} className='SubmitChargeur'>
                      Ajouter Chargeur
                    </button>
                  }
                </form>
              )}
            </Formik>
          </div>
        </div>
      }
      {!isMobile &&
        <div className='AddChargeurPage'>
          <div className='Formik'>
            <Formik
              initialValues={{ rfid: '', name: '' }}
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
                handleCreateChargeur({rfid: values.rfid.toLowerCase(), name: values.name}, setSubmitting)
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
                <form onSubmit={handleSubmit} className='ChargeurForm'>
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
                      value={values.email}
                      className='rfidInput'
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
                    <button type="submit" disabled={isSubmitting} className='SubmitChargeur'>
                      Ajouter Chargeur
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

export default AddChargeur;