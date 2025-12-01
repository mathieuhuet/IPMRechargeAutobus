import './login.css';
import './loginMobile.css';
import {useState, useEffect, useMemo} from 'react';
import { Formik } from 'formik';
import { loginUser } from '../../Services/user/login';
import Spinner from '../../Spinner';
import { useCookies } from 'react-cookie';
import { useMediaQuery } from 'react-responsive';
import { useWindowDimensions } from '../../Utilities/windowDimension';





const Login = (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 1023px)' });
  const { height, width } = useWindowDimensions();
  const [cookies, setCookie] = useCookies(['accessToken']);
  const [message, setMessage] = useState('');
  


  const handleLogin = async (credentials, setSubmitting) => {
    setMessage('');
    // call backend and move to next page if successful
    try {
      const result = await loginUser(credentials);
      if (result.data) {
        setCookie('accessToken', result.data.accessToken);
        setMessage('Vous êtes connecté.');
      }
      setSubmitting(false);
    } catch (error) {
      if (error.message) {
        setMessage(error.message);
      }
      console.log(error);
      setSubmitting(false);
    }
  }

  return (
    <div>
      {isMobile &&
        <div className='LoginPage'>
          <div className='Login'>
            <div className='Formik'>
              <Formik
                initialValues={{ email: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin({email: values.email.toLowerCase(), password: values.password}, setSubmitting)
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
                  <form onSubmit={handleSubmit} className='EmailForm'>
                    <div className='EmailInput'>
                      <label
                        className='label'
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='Email'
                      />
                      <label
                        className='label'
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='Password'
                      />
                      <h6>
                        {message || ' '}
                      </h6>
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitEmail'>
                        Se Connecter
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      }
      {!isMobile &&
        <div className='LoginPage'>
          <div className='Login'>
            <div className='Formik'>
              Bonjour
              <Formik
                initialValues={{ email: '' }}
                validate={values => {
                  const errors = {};
                  if (!values.email) {
                    errors.email = 'Required';
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                  ) {
                    errors.email = 'Invalid email address';
                  }
                  return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                  handleLogin({email: values.email.toLowerCase(), password: values.password}, setSubmitting)
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
                  <form onSubmit={handleSubmit} className='EmailForm'>
                    <div className='EmailInput'>
                      <label
                        className='label'
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                        className='Email'
                      />
                      <label
                        className='label'
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        className='Password'
                      />
                      <h6>
                        {message || ' '}
                      </h6>
                    </div>
                    {isSubmitting && 
                      <div className='Loading'>
                        <Spinner/>
                      </div>
                    }
                    {!isSubmitting && 
                      <button type="submit" disabled={isSubmitting} className='SubmitEmail'>
                        Se Connecter
                      </button>
                    }
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Login;
