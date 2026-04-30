import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart, FaEnvelope, FaLock, FaUserGraduate, FaUserMd, FaUserShield } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './AuthPages.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '', role: 'student' });

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
    <main className="auth-page" id="login-page">
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
          <div className="auth-card__logo-icon"><FaHeart /></div>
          <span className="auth-card__logo-text">Mind<span className="accent-text">Care</span></span>
        </Link>

        <h1 className="auth-card__title">Welcome Back</h1>
        <p className="auth-card__subtitle">Log in to continue your healing journey</p>

        {/* Role Selector */}
        <div className="auth-card__roles" id="login-role-selector">
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

        <form onSubmit={handleSubmit} className="auth-card__form" id="login-form">
          <div className="auth-card__input-group">
            <FaEnvelope className="auth-card__input-icon" />
            <input type="email" name="email" placeholder="Email address" value={formData.email} onChange={handleChange} required id="login-email" />
          </div>
          <div className="auth-card__input-group">
            <FaLock className="auth-card__input-icon" />
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required id="login-password" />
          </div>

          <div className="auth-card__options">
            <label className="auth-card__checkbox">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="auth-card__forgot">Forgot Password?</a>
          </div>

          <button type="submit" className="btn btn-primary auth-card__submit" id="login-submit-btn">
            Log In
          </button>
        </form>

        <p className="auth-card__footer">
          Don't have an account? <Link to="/signup" className="auth-card__link">Sign Up</Link>
        </p>
      </motion.div>
    </main>
  );
};

export default LoginPage;
