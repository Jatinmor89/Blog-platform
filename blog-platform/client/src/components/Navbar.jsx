import { Link, useNavigate } from 'react-router-dom';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">✍️ BlogVerse</Link>
        <div className="nav-links">
          {user ? (
            <>
              <span className="nav-user">👋 {user.name}</span>
              <button className="nav-link primary" onClick={() => navigate('/create')}>+ Write</button>
              <button className="nav-link" onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link primary">Get Started</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
