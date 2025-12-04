import './autobusComponent.css';
import './autobusComponentMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';





const AutobusComponent = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });



  return (
    <div className='AutobusComponent'>
      <div className='NameAutobus'>
        {props.name}
      </div>
      <div className='StateAutobus'>
        ??
      </div>
    </div>
  );
}

export default AutobusComponent;