import { color } from 'framer-motion';
import './automatic.css';
import './automaticMobile.css';



function AutomaticState({ automaticMode, lowerThreshold, upperThreshold }) {


  return (
    <div className="AutomaticState">
      <div className='AutomaticLeft'>
        <div>
          Automatic Mode
        </div>
        <div className='UpperBorder'>
          Stop A/C @
        </div>
        <div className='UpperBorder'>
          Start A/C @
        </div>
      </div>
      <div className='AutomaticRight'>
        <div>
          {automaticMode ? 'ON' : 'OFF'}
        </div>
        <div className='UpperBorder' style={{color: '#d32f2f'}}>
          {lowerThreshold}°C
        </div>
        <div className='UpperBorder' style={{color: '#307fff'}}>
          {upperThreshold}°C
        </div>
      </div>
    </div>
  );
}

export default AutomaticState;