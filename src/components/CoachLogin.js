import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

export default function CoachLogin() {
  const [coachId, setCoachId] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState({ coachId: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [loginStatus, setLoginStatus] = useState(null); // null means no success no error
  const navigate = useNavigate();
  const dispatch = useDispatch(); // use of redux

  const validateForm = () => {
    const errors = {};
    if (coachId.trim() === '') {
      errors.coachId = 'ID Field is Required';
    }
    if (password.length < 5 || password.length > 10) {
      errors.password = 'Password should have 5 to 10 Characters';
    }
    return errors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);

    if (Object.keys(errors).length === 0) {
      await fetch(`http://localhost:8080/coaches?id=${coachId}&&password=${password}`)
        .then((res) => res.json())
        .then((resp) => {
          if (Object.keys(resp).length === 0) {
            toast.error('Enter valid credentials');
            setErrorMessage('Invalid Credentials');
          } else {
            if (resp[0].password === password) {
              toast.success('Login Successful');
              setLoginStatus('success');
              dispatch({ type: 'SET_USER_TYPE', payload: 'coach' }); // redux dispatch update
              console.log(dispatch);
              navigate('/CoachHome');
            } else {
              toast.error('Invalid Credentials');
            }
          }
        })
        .catch((err) => {
          toast.error('Error Occurred: ' + err.message);
          setErrorMessage('An error occurred');
        });
    }
  };

  return (
    <div className='bg-light mt-auto'>
      <div className="card my-2 bg-dark text-light d-flex flex-col col-md-3 container">
        <h3 className='my-4'>Login As Life Coach</h3>

        <form className="row g-6 needs-validation" noValidate onSubmit={handleLogin}>
          <div className="col-md-12 my-2">

            <input type="text" className="form-control" id="validationCustom01" placeholder="Coach Id" value={coachId} onChange={(e) => setCoachId(e.target.value)} />
            <span className='text-danger'>{validationErrors.coachId}</span>
          </div>

          <div className="col-md-12 my-2">
            <input type="password" className="form-control" id="validationCustom02" minLength="5" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className='text-danger'>{validationErrors.password}</span>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary my-3 mx-1 bg-green ">Login</button>
          </div>
        </form>

        {errorMessage && <p className='text-danger'>{errorMessage}</p>}
        {loginStatus && <p className='text-success'>{loginStatus} </p>}
      </div>
    </div>
  );
}
