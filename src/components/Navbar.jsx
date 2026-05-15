import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import logoImg from '../assets/logo.png';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`} id="main-navbar">
      <div className="navbar__container container">
        <Link to="/" className="navbar__logo" id="nav-logo">
          <img src={logoImg} alt="High on Healing" className="navbar__logo-img" />
          <span className="navbar__logo-text">
            High on <span className="accent-text">Healing</span>
          </span>
        </Link>

        <ul className={`navbar__links ${isMobileOpen ? 'navbar__links--open' : ''}`} id="nav-links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={`navbar__link ${location.pathname === link.path ? 'navbar__link--active' : ''}`}
              >
                {link.name}
                <span className="navbar__link-indicator" />
              </Link>
            </li>
          ))}
        </ul>

        <div className="navbar__actions">
          <Link to="/login" className="btn btn-secondary navbar__login-btn" id="nav-login-btn">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-primary navbar__signup-btn" id="nav-signup-btn">
            Get Started
          </Link>
        </div>

        <button
          className="navbar__hamburger"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          id="nav-hamburger"
          aria-label="Toggle menu"
        >
          {isMobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div className="navbar__mobile-overlay" onClick={() => setIsMobileOpen(false)} />
      )}
    </nav>
  );
};

export default Navbar;
