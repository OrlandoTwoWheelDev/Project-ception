import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const LogInRegister = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      username: form.username.value,
      password: form.password.value,
    }

    console.log('Logging in with username:', formData.username);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        const result = await response.json();
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError('Something went wrong!');
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = {
      username: form.newUsername.value,
      password: form.newPassword.value,
      email: form.newEmail.value,
    }

    console.log('Registering with username:', formData.username);

    try {
      const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
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
    <div className='login-register'>
      <h1>Login</h1>

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
