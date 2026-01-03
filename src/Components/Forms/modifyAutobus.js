import './modifyAutobus.css';
import './modifyAutobusMobile.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BsLightningFill } from "react-icons/bs";
import { FaCarBattery } from "react-icons/fa";

//Not used, should eventually implement it instead of writing the whole forms on each pages files...

const ModifyAutobusForm = (props) => {
  let navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 1200px)' });



  return (
    <div className='ModifyAutobusForm'>

    </div>
  );
}

export default ModifyAutobusForm;