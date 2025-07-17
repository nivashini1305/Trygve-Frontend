import { BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUp1';
import LoginSlides from './pages/LoginSlides';
import OtpVerification from './pages/OtpVerification';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LoginSlides />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
