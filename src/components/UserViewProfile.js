import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import maleicon from '../assets/Male image icon.png';
import femaleicon from '../assets/Female image icon.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UserViewProfile() {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const handleClick = () => navigate(-1);
  const userId = useSelector((state) => state.userId);

  useEffect(() => {
    fetch(`http://localhost:8080/users?id=${userId}`)
    .then((res) => res.json())
    .then((resp) => {
      if (Object.keys(resp).length === 0){
        toast.error('Failed to fetch');
      }else {
        setUsers(resp);
      }
    }).catch((err) => {
      toast.error('Failed:' + err.message);
    });
  }, [userId]); // Dependency array includes userId so that the effect runs whenever userId changes


  return (
    <div className='bg-light mt-auto'>
      <div className='row row-cols-1 row-cols-md-3 mx-4 my-3 g-4'>
        {users.map((user, index) =>(
          <div key={index} className='col mb-4'>
            <div className='container'>
              <div className='card w-60'>
                <div className='row no-gutters'>
                  <div className='col-auto'>
                    {users.gender === 'Male' ? (<img src={maleicon} className='img-fluid' style={{maxWidth: '150px', maxHeight: '150px'}} alt="maleicon"/>):
                    (<img src={femaleicon} className='img-fluid' style={{maxWidth: '150px', maxHeight: '150px'}} alt='femaleicon'/>)}
                  </div>
                  <div className='col mx-2 my-2 text-start'>
                    <div className='card-block px-2'>
                      <h5 className='card-title'>{user.name}</h5>
                      <p>
                        Date of Birth:{user.dateOfBirth}<br/>
                        Email Id: {user.email}<br/>
                        Mobile No.: {user.mobileNumber}<br/>
                        Address: {user.city}, {user.state}, {user.country}<br/>
                        Pincode: {user.pincode}
                      </p>
                      <button type='button' onClick={handleClick} className='btn btn-primary btn-sm'>  Go Back</button>
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
