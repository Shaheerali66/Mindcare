import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaUserGraduate, FaUserMd, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logoImg from '../assets/logo.png';
import './AuthPages.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/${formData.role}`);
  };

  const roles = [
    { value: 'student', label: 'Student', icon: <FaUserGraduate />, color: 'var(--pink-500)' },
    { value: 'consultant', label: 'Consultant', icon: <FaUserMd />, color: 'var(--purple-500)' },
    { value: 'admin', label: 'Admin', icon: <FaUserShield />, color: 'var(--pink-700)' },
  ];

  return (
    <main className="auth-page" id="signup-page">
      <div className="auth-page__bg">
        <div className="auth-page__shape auth-page__shape--1" />
        <div className="auth-page__shape auth-page__shape--2" />
      </div>

      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Link to="/" className="auth-card__logo">
          <img src={logoImg} alt="High on Healing" className="auth-card__logo-img" />
          <span className="auth-card__logo-text">High on <span className="accent-text">Healing</span></span>
        </Link>

        <h1 className="auth-card__title">Create Account</h1>
        <p className="auth-card__subtitle">Join High on Healing and start your wellness journey</p>

        {/* Role Selector */}
        <div className="auth-card__roles" id="signup-role-selector">
          {roles.map((r) => (
            <button
              key={r.value}
              type="button"
              className={`auth-card__role-btn ${formData.role === r.value ? 'auth-card__role-btn--active' : ''}`}
              onClick={() => setFormData({ ...formData, role: r.value })}
              style={formData.role === r.value ? { borderColor: r.color, color: r.color, background: `${r.color}0D` } : {}}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="auth-card__form" id="signup-form">
          <div className="auth-card__input-group">
            <FaUser className="auth-card__input-icon" />
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required id="signup-name" />
          </div>
          <div className="auth-card__input-group">
            <FaEnvelope className="auth-card__input-icon" />
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required id="signup-email" />
          </div>
          <div className="auth-card__input-group">
            <FaLock className="auth-card__input-icon" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required id="signup-password" />
          </div>
          <div className="auth-card__input-group">
            <FaLock className="auth-card__input-icon" />
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required id="signup-confirm-password" />
          </div>

          <button type="submit" className="btn btn-primary auth-card__submit" id="signup-submit-btn">
            Create Account
          </button>
        </form>

        <p className="auth-card__footer">
          Already have an account? <Link to="/login" className="auth-card__link">Log In</Link>
        </p>
      </motion.div>
    </main>
  );
};

export default SignupPage;
