import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userimage from '../assets/usericon.png';

export default function UserSignup() {


    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('Male');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        password: '',
        mobileNumber: '',
        email: '',
        dateOfBirth: '',
        gender: '',
        pincode: '',
        city: '',
        state: '',
        country: ''
    });
    const [registrationStatus, setRegistrationStatus] = useState('');
    const [userId, setUserId] = useState('');
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (name.trim().length < 3 || name.trim().length > 50) {
            errors.name = 'Name should have 3 to 50 characters';
        }
        if (password.length < 5 || password.length > 10) {
            errors.password = 'password should have 5 to 10 characters';
        }
        if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = 'Mobile Number should have 10 digits';
        }
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            errors.email = 'Valid Email required';
        }
        if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is required';
        } else {
            const birthDate = new Date(dateOfBirth);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            if (age <= 20 || age >= 100) {
                errors.dateOfBirth = 'Age must be between 20 and 100';
            }
        }
        if (pincode.length < 6 || pincode.length > 6) {
            errors.Pincode = 'Pincode should have 6 digits';
        }
        if (city.trim().length < 3 || city.trim().length > 20) {
            errors.City = 'City should have 3 to 20 characters';
        }
        if (country.trim().length < 3 || country.trim().length > 20) {
            errors.Country = 'Country should have 3 to 30 characters'
        }
        return errors;

    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setValidationErrors(errors);
        if (Object.keys(errors).length === 0) {
            let userobj = { name, password, mobileNumber, email, dateOfBirth, gender, pincode, city, state, country };

            fetch("http://localhost:8080/users", {
                method: "POST",
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(userobj)
            }).then((res) => {
                if (res.ok) {
                    return res.json(); //parse the response to get Id
                } else {
                    toast.error('Registration Failed');
                    setRegistrationStatus('failed');
                }
            }).then((data) => {
                if (data) {
                    const { id } = data; //Get the coach Id from response
                    setUserId(id); // set the coach Id in state
                    setRegistrationStatus('success');
                    toast.success('Registration successful');
                }
            }).catch((err) => {
                toast.error('Failed:' + err.message);
            });
        }
    }





    return (
        <div className='bg-light mt-auto'>
            {registrationStatus === 'success' ? (
                <>
                    <img src={userimage} className='card-img-top img-fluid' style={{ maxWidth: '250px', maxHeight: '250px' }} alt='user' />
                    <h2>Account Created Successfully</h2>
                    <h4>Your User ID is {userId}</h4>
                    <button className='btn btn-primary my-3 mx-1' onClick={() => navigate('/UserLogin')}>Login Now</button>
                </>
            ) : (
                <div className="card my-2 bg-dark text-light d-flex flex-col col-md-6 container">


                    <h1>User Profile</h1>


                    <form className="row g-6 gy-2 text-start needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom01" className="form-label">Name</label>
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" id="validationCustom01" />
                            <span className='text-danger'>{validationErrors.name}</span>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom02" className="form-label">Password</label>
                            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="validationCustom02" />
                            <span className='text-danger'>{validationErrors.password}</span>
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="validationCustom03" className="form-label">Mobile Number</label>
                            <input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} type="tel" className="form-control" id="validationCustom03" />
                            <span className='text-danger'>{validationErrors.mobileNumber}</span>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="validationCustom04" className="form-label">Email</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="validationCustom04" />
                            <span className='text-danger'>{validationErrors.email}</span>
                        </div>


                        <div className="col-md-6">
                            <label htmlFor="validationCustom05" className="form-label">Date of Birth</label>
                            <input value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} type="date" className="form-control" id="validationCustom05" placeholder='mm/dd/yyy' />
                            <span className='text-danger'>{validationErrors.dateOfBirth}</span>
                        </div>

                        <fieldset className="col md-6">
                            <legend className="col-form-label ">Gender</legend>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={gender === 'Male'} onChange={e => setGender(e.target.value)} type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" checked={gender === 'Female'} onChange={e => setGender(e.target.value)} type="radio" name="gridRadios" id="gridRadios2" value="option2" />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Female
                                </label>
                            </div>

                        </fieldset>

                        <div className="col-md-6">
                            <label htmlFor="validationCustom06" className="form-label">Pincode</label>
                            <input value={pincode} onChange={e => setPincode(e.target.value)} type="number" className="form-control" id="validationCustom06" />
                            <span className='text-danger'>{validationErrors.Pincode}</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <label htmlFor="validationCustom07" className="form-label">City</label>
                            <input value={city} onChange={e => setCity(e.target.value)} type="text" className="form-control" id="validationCustom07" />
                            <span className='text-danger'>{validationErrors.City}</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <label htmlFor="validationCustom08" className="form-label">State</label>
                            <input value={state} onChange={e => setState(e.target.value)} type="text" className="form-control" id="validationCustom08" />
                            <span className='text-danger'>{validationErrors.state}</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <label htmlFor="validationCustom09" className="form-label">Country</label>
                            <input value={country} onChange={e => setCountry(e.target.value)} type="text" className="form-control" id="validationCustom09" />
                            <span className='text-danger'>{validationErrors.Country}</span>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success my-3 mx-1 ">Register</button>
                        </div>
                    </form>
                </div>

            )}

        </div>
    )
}
