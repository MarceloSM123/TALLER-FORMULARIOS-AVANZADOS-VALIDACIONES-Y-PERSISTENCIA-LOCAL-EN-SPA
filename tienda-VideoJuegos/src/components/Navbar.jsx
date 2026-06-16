import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        🎮 Videojuegos Store
      </div>
      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/nuevo">➕ Nuevo Juego</Link>
      </div>
    </nav>
  );
}

export default Navbar;