import './about.css';
import './aboutMobile.css';
import { useMediaQuery } from 'react-responsive';



/*
Login Page, where you login when you navigate to the site.
The Registration form is also on that page.
*/





const About = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });

  return (
    <div>
      {isMobile &&
        <div className='AboutPage'>
        </div>
      }
      {!isMobile &&
        <div className='AboutPage'>

        </div>
      }
    </div>
  );
};

export default About;
