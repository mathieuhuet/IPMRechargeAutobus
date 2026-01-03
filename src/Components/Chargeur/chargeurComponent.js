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
      <div className='ChargeurComponentBottom'>
        {props.autobus === '0' ? 
          <div className='StateChargeur' style={{backgroundColor: '#395b94', display: 'flex', flexDirection: 'column'}}>
            <div>Pas Utilisé</div>
          </div>
          :
          props.autobus ?
          <div>
            <div className='StateChargeur' style={{backgroundColor: '#5ea453'}}>
              <BsLightningFill /> Charging <BsLightningFill />
            </div>
            <div className='ChargeurComponentAutobusName'>{props.autobusName}</div>
          </div>
          :
          <div className='StateChargeur' style={{backgroundColor: 'grey'}}>
            ??
          </div>
        }
      </div>
    </div>
  );
}

export default ChargeurComponent;