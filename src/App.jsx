import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/home';
import AboutMe from './pages/aboutme';
import HvacInfo from './pages/hvacinfo';
import TheDemo from './pages/thedemo';
import LogInRegister from './pages/loginregister';
import ContactMe from './pages/contactme';

const App = () => {
  return (
    <Router>
      <header>
  <nav>
    <ul style={{ listStyleType: 'none', padding: 0 }}>
      <li><button onClick={() => window.location.href = '/'}>Home</button></li>
      <li><button onClick={() => window.location.href = '/about'}>About Me</button></li>
      <li><button onClick={() => window.location.href = '/info'}>HVAC Info</button></li>
      <li><button onClick={() => window.location.href = '/demo'}>The Demo</button></li>
      <li><button onClick={() => window.location.href = '/loginRegister'}>Login-Register</button></li>
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

      <footer>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><button onClick={() => window.location.href = '/contact'}>Contact Me</button></li>
        </ul>
      </footer>
    </Router>
  );
}

export default App;
