import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import logoImg from '../assets/logo.png';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" id="main-footer">
      <div className="footer__glow" />
      <div className="container">
        <div className="footer__grid">
          {/* Brand */}
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <img src={logoImg} alt="High on Healing" className="footer__logo-img" />
              <span className="footer__logo-text">High on Healing</span>
            </Link>
            <p className="footer__tagline">
              Your safe space to talk, heal, and grow. Affordable mental health support for students.
            </p>
            <div className="footer__socials">
              <a href="#" className="footer__social-link" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" className="footer__social-link" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" className="footer__social-link" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" className="footer__social-link" aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__heading">Quick Links</h4>
            <ul className="footer__list">
              <li><Link to="/" className="footer__link">Home</Link></li>
              <li><Link to="/about" className="footer__link">About Us</Link></li>
              <li><Link to="/pricing" className="footer__link">Pricing</Link></li>
              <li><Link to="/contact" className="footer__link">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="footer__col">
            <h4 className="footer__heading">Legal</h4>
            <ul className="footer__list">
              <li><Link to="/privacy" className="footer__link">Privacy Policy</Link></li>
              <li><Link to="/privacy" className="footer__link">Terms of Service</Link></li>
              <li><Link to="/privacy" className="footer__link">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__heading">Contact Us</h4>
            <ul className="footer__list">
              <li className="footer__contact-item">
                <FiMail className="footer__contact-icon" />
                <span>support@highonhealing.pk</span>
              </li>
              <li className="footer__contact-item">
                <FiPhone className="footer__contact-icon" />
                <span>+92 300 1234567</span>
              </li>
              <li className="footer__contact-item">
                <FiMapPin className="footer__contact-icon" />
                <span>Islamabad, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} High on Healing. All rights reserved.</p>
          <p className="footer__made-with">Made with <FaHeart className="footer__heart" /> for mental wellness</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
