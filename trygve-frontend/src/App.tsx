import { BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUpPage from './pages/SignUp1';
import LoginSlides from './pages/LoginSlides';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LoginSlides />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
