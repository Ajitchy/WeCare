import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function UserLogin() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [validationErrors, setValidationErrors] = useState({ userId: '', password: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (userId.trim() === '') {
            errors.userId = 'Id Field is Required';
        }
        if (password.length < 5 || password.length > 10) {
            errors.password = 'Password should have 5 to 10 characters';
        }
        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault(); //prevent the form from submitting and triggering a page reload
        const errors = validateForm();
        setValidationErrors(errors);
        if (Object.keys(errors).length === 0) {
            await fetch(`http://localhost:8080/users?id=${userId}&password=${password}`)
                .then((res) => {
                    return res.json();
                }).then((resp) => {
                    console.log(resp);
                    if (Object.keys(resp).length === 0) {
                        toast.error('Invalid Credentials');
                        setErrorMessage('Invalid Credentials');
                    } else {
                        if (resp[0].password === password) {
                            toast.success('Login Successful');
                            localStorage.setItem('userId', userId);
                            setLoginStatus('success');
                            navigate('/UserHome');
                        } else {
                            toast.error('Invalid Password');
                        }
                    }
                }).catch((err) => {
                    toast.error('Error Occoured:' + err.message);
                    setErrorMessage('An error occoured');
                });
        }

    };

    return (
        <div className='bg-light mt-auto'>
            <div className="card my-2 bg-dark text-light d-flex flex-col col-md-3 container">
                <h3 className='my-4'>Login As User </h3>

                <form className="row g-6 needs-validation" noValidate onSubmit={handleLogin}>

                    <div className="col-md-12 my-2">
                        <input type="text" className="form-control" id="validationCustom01" placeholder="Coach Id" value={userId} onChange={(e) => setUserId(e.target.value)} />
                        <span className='text-danger'>{validationErrors.userId}</span>
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
    )
}
