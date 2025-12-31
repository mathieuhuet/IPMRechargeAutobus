import './modifyAutobus.css';
import './modifyAutobusMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BsLightningFill } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";



const ModifyAutobusForm = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });



  return (
    <div className='ModifyAutobusForm'>
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
  );
}

export default ModifyAutobusForm;