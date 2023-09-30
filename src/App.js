import './App.css';
import HomeCard from './components/HomeCard';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CoachLogin from './components/CoachLogin';
import CoachSignup from './components/CoachSignup';
import Footer from './components/Footer';
import UserSignup from './components/UserSignup'
import UserLogin from './components/UserLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CoachHome from './components/CoachHome';

function App() {
  return (
    <div className="App d-flex flex-column min-vh-100">
      <ToastContainer theme='colored'></ToastContainer>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeCard/>} />
          <Route path="/CoachSignup" element={<CoachSignup />} />
          <Route exact path="/CoachLogin" element={<CoachLogin />} />
          <Route exact path="/UserSignup" element={<UserSignup/>}/>
          <Route exact path='/UserLogin' element={<UserLogin/>}/>
          <Route exact path='/CoachHome' element={<CoachHome/>}/>
          <Route path="*" element={<p>Path not resolved</p>} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
