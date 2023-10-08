import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import maleicon from '../assets/Male image icon.png';
import femaleicon from '../assets/Female image icon.png';

export default function UserHome() {
  const [coaches, setCoaches] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8080/coaches`)
    .then((res) => res.json())
    .then((resp) => {
      if (Object.keys(resp).length === 0){
        toast.error('Failed to fetch');
      }else {
        setCoaches(resp);
      }
    }).catch((err) => {
      toast.error('Failed:' + err.message);
    });
  }, []); // Empty depedency array ensures the effect runs once after the initial render

  const filteredCoaches = coaches.filter((coach) => {
    return coach.speciality.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className='bg-light mt-auto'>
      <div className='container my-3'>
        <div className='row'>
          <div className='col-md-9 order-2 order-md-1'>
            <input
              type='text'
              className='form-control mb-3'
              placeholder='Search by Speciality'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className='row row-cols-1 row-cols-md-3 mx-4 my-3 g-4'>
        {filteredCoaches.map((coache, index) =>(
          <div key={index} className='col mb-4'>
            <div className='container'>
              <div className='card w-60'>
                <div className='row no-gutters'>
                  <div className='col-auto'>
                    {coache.gender === 'Male' ? (<img src={maleicon} className='img-fluid' style={{maxWidth: '150px', maxHeight: '150px'}} alt="maleicon"/>):
                    (<img src={femaleicon} className='img-fluid' style={{maxWidth: '150px', maxHeight: '150px'}} alt='femaleicon'/>)}
                  </div>
                  <div className='col mx-2 my-2 text-start'>
                    <div className='card-block px-2'>
                      <h5 className='card-title'>{coache.name}</h5>
                      <h6 className='card-text'>Coach Id: {coache.id}</h6>
                      <p>
                        Mobile No.: {coache.mobileNumber}<br/>
                        Speciality: {coache.speciality}
                      </p>
                      <button type='button' className='btn btn-primary btn-sm'>Book an Appointment</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
