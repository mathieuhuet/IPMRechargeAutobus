import './chargeurComponent.css';
import './chargeurComponentMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BsLightningFill } from "react-icons/bs";




const ChargeurComponent = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });



  return (
    <div className='ChargeurComponent'>
      <div className='NameChargeur'>
        {props.name}
      </div>
      {props.autobus === '0' ? 
        <div className='StateChargeur' style={{backgroundColor: '#3382ba', display: 'flex', flexDirection: 'column'}}>
          <div>Pas</div><div>Utilisé</div>
        </div>
        :
        props.autobus ?
        <div className='StateChargeur' style={{backgroundColor: '#5ea453'}}>
          <BsLightningFill />
        </div>
        :
        <div className='StateChargeur' style={{backgroundColor: 'grey'}}>
          ??
        </div>
      }
    </div>
  );
}

export default ChargeurComponent;