import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LogInRegister = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value,
    }

    console.log('Logging in with:', formData);

    try {
      const response = await fetch('/loginRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/home');
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Something went wrong!');
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: e.target.newUsername.value,
      password: e.target.newPassword.value,
      email: e.target.newEmail.value,
    }

    console.log('Registering with:', formData);

    try {
      const response = await fetch('http://localhost:5000/api/users/loginRegister', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        navigate('/home');
      } else {
        const result = await response.json();
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      setError('Something went wrong!');
    }
  }

  return (
    <div>
      <h1>Login/Register</h1>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />
        </div>
        <button type="submit">Login</button>
      </form>

      <h2>Register</h2>

      <form onSubmit={handleRegisterSubmit}>
        <div>
          <label htmlFor="newUsername">New Username:</label>
          <input type="text" id="newUsername" name="newUsername" required />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" required />
        </div>
        <div>
          <label htmlFor="newEmail">New Email:</label>
          <input type="email" id="newEmail" name="newEmail" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default LogInRegister;
