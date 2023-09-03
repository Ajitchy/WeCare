import React from 'react';
import usericon from '../assets/usericon.png';
import coachicon from '../assets/coachicon.png';
import {useNavigate} from 'react-router-dom';

export default function HomeCard() {

    const navigate = useNavigate();
  return (
    <div className="bg-light text-light mt-auto">
        <h1 className="text-dark py-3">We are at the heart of appropriate Care</h1>
        <div className="d-flex flex-row col-md-6 container gy-3">
        <div className="card mx-3 my-5 bg-dark" style={{width: "18rem"}}>
            <img src={coachicon} className="card-img-top" alt="icon for coach"/>
            <div className="card-body d-grid">
                <button className='btn btn-primary my-3 mx-1 btn-lg' onClick={()=> navigate('/CoachLogin')}>Login as Coach</button>
                <button className='btn btn-primary my-3 mx-1 btn-lg' onClick={()=> navigate('/CoachSignup')}>Join as Coach</button>
            </div>
        </div>

        <div className="card mx-3 my-5 bg-dark" style={{width: "18rem"}}>
            <img src={usericon} className="card-img-top" alt="icon for user"/>
            <div className="card-body d-grid">
                <button className='btn btn-primary my-3 mx-1 btn-lg' onClick={()=> navigate('/UserLogin')}>Login as User</button>
                <button className='btn btn-primary my-3 mx-1 btn-lg' onClick={()=> navigate('/UserSignup')}>Join as User</button>
            </div>
        </div>
        </div>

    </div>
  )
}
