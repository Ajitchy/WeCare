import React from 'react';
//import coachicon from '../assets/coachicon.png';

export default function CoachSignup() {
  return (
    <div className='bg-light mt-auto'>
        <div className="card my-2 bg-dark text-light d-flex flex-col col-md-6 container">
         
        
        <h1>Life Coach Profile</h1>
        

        <form className="row g-6 text-start needs-validation" novalidate>
            <div className="col-md-6">
                <label htmlFor="validationCustom01" className="form-label">Email</label>
                <input type="email" className="form-control" id="validationCustom01" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="validationCustom02" className="form-label">Password</label>
                <input type="password" className="form-control" id="validationCustom02" required/>
            </div>
            <div className="col-md-6">
                <label htmlFor="validationCustom03" className="form-label">Date of Birth</label>
                <input type="date" className="form-control" id="validationCustom03" placeholder='mm/dd/yyy' required/>
            </div>

            <fieldset className="col md-6">
                <legend className="col-form-label ">Gender</legend>
                
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" defaultChecked/>
                        <label className="form-check-label" htmlFor="gridRadios1">
                        Male
                        </label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                        <label className="form-check-label" htmlFor="gridRadios2">
                        Female
                        </label>
                    </div>
                
            </fieldset>

            <div className="col-md-6">
                <label htmlFor="validationCustom04" className="form-label">Mobile Number</label>
                <input type="tel" className="form-control" id="validationCustom04" required pattern='[0-9]{10}'/>
                <div className="invalid-feedback">
                Please provide a valid 10 digit Mobile Number.
                </div>
            </div>
            <div className="col-md-6 text-left">
                <label htmlFor="validationCustom05" className="form-label">Speciality</label>
                <input type="text" className="form-control" id="validationCustom05"/>
            </div>

            <div className="d-grid">
                <button type="submit" className="btn btn-success my-3 mx-1 ">Register</button>
            </div>
        </form>
        </div>



    </div>
  )
}
