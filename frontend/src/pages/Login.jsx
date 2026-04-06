import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data.success) {
        navigate('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred connecting to the backend API.');
    }
  };

  return (
    <div className="my-account-area pt-100 pb-70">
      <div className="container">
        <div className="login-form">
          <form onSubmit={handleLogin} className="my-account-content">
            <div className="section-title">
              <h2>Log In</h2>
              <span className="top-title">Keep Connected With Us (MERN)</span>
              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Email or Username (abc@gmail.com)"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12">
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password (12345678)"
                    required
                  />
                </div>
              </div>
              <div className="col-lg-12 mt-3">
                <button type="submit" className="default-btn btn-style-fore" style={{cursor: 'pointer'}}>
                  Login to ProFixers
                </button>
              </div>
            </div>
            <p className="mt-4">Don't Have an Account? <a href="/signup">Create One</a></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
