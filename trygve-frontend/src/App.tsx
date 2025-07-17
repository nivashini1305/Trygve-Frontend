import { BrowserRouter , Routes , Route} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LandingSlides from './pages/LoginSlides';
import LoginSlides from './pages/LoginSlides';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<LoginSlides />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
