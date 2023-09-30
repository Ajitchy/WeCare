import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import coachicon from '../assets/coachicon.png';

export default function CoachSignup() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('male');
    const [mobileNumber, setMobileNumber] = useState('');
    const [speciality, setSpeciality] = useState('');
    const [validationErrors, setValidationErrors] = useState({
        name: '',
        password: '',
        dateOfBirth: '',
        gender: '',
        mobileNumber: '',
        speciality: '',
    });
    const [signUpStatus, setSignUpStatus] = useState(null); // null means no success no error
    const [coachId, setCoachId] = useState(null); // Store the coach ID after successful registration
    const navigate = useNavigate();

    const validateForm = () => {
        const errors = {};
        if (name.trim().length < 3 || name.trim().length > 50) {
            errors.name = 'Name should have 3 to 50 characters';
        }
        if (password.length < 5 || password.length > 10) {
            errors.password = 'Password should have 5 to 10 Characters';
        }
        if (!dateOfBirth) {
            errors.dateOfBirth = 'Date of Birth is Required';
        } else {
            const birthDate = new Date(dateOfBirth);
            const currentDate = new Date();
            const age = currentDate.getFullYear() - birthDate.getFullYear();
            if (age <= 20 || age >= 100) {
                errors.dateOfBirth = 'Age must be between 20 and 100';
            }
        }
        if (!/^\d{10}$/.test(mobileNumber)) {
            errors.mobileNumber = 'Mobile number must be 10 digits';
        }
        if (speciality.trim().length < 10 || speciality.trim().length > 50) {
            errors.speciality = 'Speciality should have 10 to 50 characters';
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        setValidationErrors(errors);

        if (Object.keys(errors).length === 0) {
            const regObj = { name, password, dateOfBirth, gender, mobileNumber, speciality };

            fetch('http://localhost:8080/coaches', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(regObj),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json(); // Parse the response to get the coach ID
                    } else {
                        toast.error('Registration Failed');
                        setSignUpStatus('failed');
                    }
                })
                .then((data) => {
                    if (data) {
                        const { id } = data; // Get the coach ID from the response
                        setCoachId(id); // Set the coach ID in state
                        setSignUpStatus('success');
                        toast.success('Registration Successful');
                    }
                })
                .catch((err) => {
                    toast.error('Failed: ' + err.message);
                });
        }
    };

    return (
        <div className="bg-light mt-auto">


            {signUpStatus === 'success' ? (
                <>
                    
                        <img src={coachicon} className="card-img-top img-fluid" alt="icon for coach" style={{ maxWidth: '250px', maxHeight: '250px' }} />
                        <h2 className='text-dark mt-3'>You are a Coach now!</h2>
                        <h3 className='text-dark'> Your Coach Id is {coachId}</h3>
                        <button className="btn btn-primary mt-3" onClick={() => navigate('/CoachLogin')}>
                            Login Now
                        </button>
                    
                </>
            ) : (
                <div className="card my-2 bg-dark text-light d-flex flex-col col-md-6 container">
                    <h1>Life Coach Profile</h1>
                    <form className="row g-6 text-start needs-validation" onSubmit={handleSubmit}>
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
                            <label htmlFor="validationCustom03" className="form-label">Date of Birth</label>
                            <input value={dateOfBirth} onChange={e => setDateOfBirth(e.target.value)} type="date" className="form-control" id="validationCustom03" placeholder='mm/dd/yyy' />
                            <span className='text-danger'>{validationErrors.dateOfBirth}</span>
                        </div>

                        <fieldset className="col md-6">
                            <legend className="col-form-label ">Gender</legend>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={gender === 'male'} onChange={e => setGender(e.target.value)} name="gridRadios" id="gridRadios1" value="option1" />
                                <label className="form-check-label" htmlFor="gridRadios1">
                                    Male
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" checked={gender === 'female'} onChange={e => setGender(e.target.value)} name="gridRadios" id="gridRadios2" value="option2" />
                                <label className="form-check-label" htmlFor="gridRadios2">
                                    Female
                                </label>
                            </div>

                        </fieldset>

                        <div className="col-md-6">
                            <label htmlFor="validationCustom04" className="form-label">Mobile Number</label>
                            <input value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} type="tel" className="form-control" id="validationCustom04" />
                            <span className='text-danger'>{validationErrors.mobileNumber}</span>
                        </div>
                        <div className="col-md-6 text-left">
                            <label htmlFor="validationCustom05" className="form-label">Speciality</label>
                            <input value={speciality} onChange={e => setSpeciality(e.target.value)} type="text" className="form-control" id="validationCustom05" />
                            <span className='text-danger'>{validationErrors.speciality}</span>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="btn btn-success my-3 mx-1 ">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            )}

        </div>
    );
}
