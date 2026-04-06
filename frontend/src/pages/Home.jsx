import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', margin: '150px auto', fontFamily: 'sans-serif' }}>
      <img src="/assets/images/logo-two.png" alt="ProFixers Logo" />
      <h1 className="mt-4">Welcome to ProFixers MERN Stack</h1>
      <p>This Single Page Application (SPA) is fully decoupled from the backend Express server API.</p>
      <button 
        onClick={() => navigate('/login')}
        className="default-btn mt-4" 
        style={{ cursor: 'pointer' }}>
        Logout
      </button>
    </div>
  );
}

export default Home;
