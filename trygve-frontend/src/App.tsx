import { BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WelcomePage from './pages/WelcomePage';
import SignUpPage from './pages/SignUpPage';
import SignUpOTP from './pages/SignUpOTP';
import CreateAccountPage from './pages/CreateAccountPage';
import AccountCreatedPage from './pages/AccountCreated';
import LoginPage from './pages/LoginPage';
import LoginOTP from './pages/LoginOTP';
import Dashboard from './pages/Dashboard';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<WelcomePage />} />
         <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verify-otp" element={<SignUpOTP />} />
        <Route path="/create-account" element={<CreateAccountPage />} />
        <Route path="/account-created" element={<AccountCreatedPage />} />
        <Route path="/loginOTP" element={<LoginOTP />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        

      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
