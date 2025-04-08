const LogInRegister = () => {
  return (
    <div>
      <h1>Login/Register</h1>
      <form>
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
      <form>
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
          <input type="email " id="newEmail" name="newEmail" required />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default LogInRegister;