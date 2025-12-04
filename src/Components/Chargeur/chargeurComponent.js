import './chargeurComponent.css';
import './chargeurComponentMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';





const ChargeurComponent = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });



  return (
    <div className='ChargeurComponent'>
      <div className='NameChargeur'>
        {props.name}
      </div>
      <div className='StateChargeur'>
        ??
      </div>
    </div>
  );
}

export default ChargeurComponent;