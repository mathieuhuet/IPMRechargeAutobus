import './addAutobus.css';
import './addAutobusMobile.css';
import { useMediaQuery } from 'react-responsive';
//import { AddAutobus } from '../../../Services/autobus/addAutobus';



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const AddAutobus = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='AddAutobusPage'>
        
        </div>
      }
      {!isMobile &&
        <div className='AddAutobusPage'>

        </div>
      }
    </div>
  );
};

export default AddAutobus;