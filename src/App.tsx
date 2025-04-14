import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import AboutMe from './pages/aboutMe';
import HvacInfo from './pages/hvacInfo';
import TheDemo from './pages/theDemo';
import LogInRegister from './pages/loginRegister';
import ContactMe from './pages/contactMe';

const App = () => {
  return (
    <Router>
      <header>
        <nav>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li><Link to="/" className='button'>Home</Link></li>
            <li><Link to="/about" className='button'>About Me</Link></li>
            <li><Link to="/info" className='button'>HVAC Info</Link></li>
            <li><Link to="/demo" className='button'>The Demo</Link></li>
            <li><Link to="/loginRegister" className='button'>Login-Register</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/info" element={<HvacInfo />} />
          <Route path="/about" element={<AboutMe />} />
          <Route path="/demo" element={<TheDemo />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/loginRegister" element={<LogInRegister />} />
        </Routes>
      </main>

      <footer style={{ textAlign: 'center' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/contact" className='button'>Contact Me</Link></li>
        </ul>
      </footer>
    </Router>
  );
}

export default App;
