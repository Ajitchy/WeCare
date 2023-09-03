import React,{useState} from 'react';

export default function UserLogin() {

    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loginStatus, setLoginStatus] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault(); //prevent the form from submitting and triggering a page reload

        try {
            const response = await fetch(`http://localhost:8080/users?id=${userId}&password=${password}`);

            if(response.ok){
                setLoginStatus('success');
            }else{
                const data = await response.json;
                setErrorMessage(data.message || 'Invalid credentials');
            }
        }catch(error){
            setErrorMessage('An error occured');
        }

    };

  return (
    <div className='bg-light mt-auto'>
      <div className="card my-2 bg-dark text-light d-flex flex-col col-md-3 container">
        <h3 className='my-4'>Login As User </h3>

        <form className="row g-6 needs-validation" noValidate onSubmit={handleLogin}>

            <div className="col-md-12 my-2">
                <input type="text" className="form-control" id="validationCustom01" placeholder="Coach Id" required value={userId} onChange={(e) => setUserId(e.target.value)}/>
            </div>

            <div className="col-md-12 my-2">
                <input type="password" className="form-control" id="validationCustom02" minLength="5" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
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
