import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './home';
import AboutMe from './aboutme';
import HvacInfo from './hvacinfo';
import TheDemo from './thedemo';
import LogInRegister from './loginregister';
import ContactMe from './contactme';

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
