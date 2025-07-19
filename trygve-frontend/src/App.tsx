import { BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUp1';
import LoginSlides from './pages/LoginSlides';
import OtpVerification from './pages/OtpVerification';
import UserData from './pages/UserData';
import SignUpSuccess from './pages/SignUpSuccess';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LoginSlides />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/user-data" element={<UserData />} />
        <Route path="/signup-success" element={<SignUpSuccess />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
