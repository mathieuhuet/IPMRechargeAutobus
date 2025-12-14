import './autobusComponent.css';
import './autobusComponentMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BsLightningFill } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";



const AutobusComponent = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });



  return (
    <div className='AutobusComponent'>
      <div className='NameAutobus'>
          <div>
            {props.name}
          </div>
          {props.chargeur != '0' && props.chargeur ? 
            <div>
              {props.level}%
            </div>
            :
            <></>
          }
      </div>
      {props.chargeur != '0' && props.chargeur ? 
        <div>
          Connecté à : 
        </div>
        :
        <div>
          {props.level}%
        </div>
      }
      {props.chargeur === '0' ? 
        <div className='StateAutobus' style={{backgroundColor: '#cc3f3f'}}>
          <FaCarBattery />
        </div>
        :
        props.chargeur ?
        <div className='StateAutobus' style={{backgroundColor: '#5ea453'}}>
          <BsLightningFill />
        </div>
        :
        <div className='StateAutobus' style={{backgroundColor: 'grey'}}>
          ??
        </div>
      }
    </div>
  );
}

export default AutobusComponent;