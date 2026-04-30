import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeart, FaUserMd, FaCalendarAlt, FaComments, FaChartLine,
  FaRobot, FaSignOutAlt, FaSearch, FaStar, FaEnvelope, FaCheck,
  FaPhone, FaVideo, FaTimes
} from 'react-icons/fa';
import { FiUsers, FiCalendar, FiMessageCircle, FiActivity, FiCpu } from 'react-icons/fi';
import AIChatbot from '../../components/AIChatbot';
import './Dashboards.css';

const consultants = [
  { id: 1, name: 'Dr. Amna Shah', designation: 'Clinical Psychology Intern', qualification: 'MSc Clinical Psychology', rating: 4.9, sessions: 120, initial: 'A' },
  { id: 2, name: 'Hira Malik', designation: 'Counseling Trainee', qualification: 'BSc Psychology (Final Year)', rating: 4.7, sessions: 85, initial: 'H' },
  { id: 3, name: 'Usman Ali', designation: 'Behavioral Therapist', qualification: 'MSc Applied Psychology', rating: 4.8, sessions: 95, initial: 'U' },
  { id: 4, name: 'Sara Qureshi', designation: 'Cognitive Therapist', qualification: 'BSc Psychology', rating: 4.6, sessions: 60, initial: 'S' },
  { id: 5, name: 'Zara Khan', designation: 'Wellness Counselor', qualification: 'MSc Psychology', rating: 4.9, sessions: 150, initial: 'Z' },
  { id: 6, name: 'Bilal Ahmed', designation: 'Youth Counselor', qualification: 'BSc Psychology (Honors)', rating: 4.5, sessions: 45, initial: 'B' },
];

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('directory');
  const [searchQuery, setSearchQuery] = useState('');
  const [contactModal, setContactModal] = useState(null);
  const [contactSuccess, setContactSuccess] = useState(null);
  const [bookedSessions, setBookedSessions] = useState([]);

  const filteredConsultants = consultants.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.designation.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.qualification.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContact = (consultant) => {
    setContactModal(consultant);
  };

  const handleBookSession = (consultant, type) => {
    const newSession = {
      id: Date.now(),
      counselor: consultant.name,
      type: type,
      date: new Date(Date.now() + 86400000).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      time: type === 'Video Call' ? '3:00 PM' : type === 'Chat' ? '5:00 PM' : '4:00 PM',
      status: 'upcoming',
    };
    setBookedSessions((prev) => [newSession, ...prev]);
    setContactModal(null);
    setContactSuccess(consultant.name);
    setTimeout(() => setContactSuccess(null), 3000);
  };

  const handleCancelSession = (sessionId) => {
    setBookedSessions((prev) => prev.filter((s) => s.id !== sessionId));
  };

  const tabs = [
    { id: 'directory', label: 'Consultants', icon: <FiUsers /> },
    { id: 'sessions', label: 'My Sessions', icon: <FiCalendar /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageCircle /> },
    { id: 'progress', label: 'Progress', icon: <FiActivity /> },
    { id: 'chatbot', label: 'AI Chat', icon: <FiCpu /> },
  ];

  return (
    <div className="dashboard" id="student-dashboard">
      {/* Sidebar */}
      <aside className="dashboard__sidebar">
        <Link to="/" className="dashboard__logo">
          <div className="dashboard__logo-icon"><FaHeart /></div>
          <span className="dashboard__logo-text">Mind<span className="accent-text">Care</span></span>
        </Link>

        <nav className="dashboard__nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`dashboard__nav-item ${activeTab === tab.id ? 'dashboard__nav-item--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <Link to="/" className="dashboard__logout">
          <FaSignOutAlt />
          <span>Logout</span>
        </Link>
      </aside>

      {/* Main Content */}
      <main className="dashboard__main">
        <header className="dashboard__header">
          <div>
            <h1 className="dashboard__welcome">Welcome back, <span className="accent-text">Student</span> 👋</h1>
            <p className="dashboard__date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="dashboard__header-actions">
            <div className="dashboard__avatar">S</div>
          </div>
        </header>

        {/* Success Toast */}
        <AnimatePresence>
          {contactSuccess && (
            <motion.div
              className="dashboard__toast"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <FaCheck /> Session booked with {contactSuccess}!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        <div className="dashboard__stats">
          {[
            { label: 'Total Sessions', value: String(12 + bookedSessions.length), icon: <FaCalendarAlt />, color: 'var(--pink-500)' },
            { label: 'Messages', value: '28', icon: <FaComments />, color: 'var(--purple-500)' },
            { label: 'Mood Score', value: '8.2', icon: <FaChartLine />, color: 'var(--blue-400)' },
            { label: 'AI Interactions', value: '45', icon: <FaRobot />, color: 'var(--pink-600)' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="dashboard__stat-card glass-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="dashboard__stat-icon" style={{ color: stat.color, background: `${stat.color}14` }}>
                {stat.icon}
              </div>
              <div>
                <p className="dashboard__stat-value">{stat.value}</p>
                <p className="dashboard__stat-label">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'directory' && (
          <section className="dashboard__section">
            <div className="dashboard__section-header">
              <h2 className="dashboard__section-title">Find a Counselor</h2>
              <div className="dashboard__search">
                <FaSearch className="dashboard__search-icon" />
                <input
                  type="text"
                  placeholder="Search by name, designation, or qualification..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="dashboard__search-input"
                  id="consultant-search"
                />
              </div>
            </div>

            <div className="dashboard__consultants-grid">
              {filteredConsultants.map((c, i) => (
                <motion.div
                  key={c.id}
                  className="consultant-card glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <div className="consultant-card__avatar">{c.initial}</div>
                  <h3 className="consultant-card__name">{c.name}</h3>
                  <p className="consultant-card__designation">{c.designation}</p>
                  <p className="consultant-card__qualification">{c.qualification}</p>
                  <div className="consultant-card__meta">
                    <span className="consultant-card__rating"><FaStar /> {c.rating}</span>
                    <span className="consultant-card__sessions">{c.sessions} sessions</span>
                  </div>
                  <button className="btn btn-primary consultant-card__contact-btn" onClick={() => handleContact(c)}>
                    <FaEnvelope /> Contact
                  </button>
                </motion.div>
              ))}
              {filteredConsultants.length === 0 && (
                <div className="dashboard__empty-state" style={{ gridColumn: '1 / -1' }}>
                  <FaSearch className="dashboard__empty-icon" />
                  <p>No counselors found matching "{searchQuery}"</p>
                </div>
              )}
            </div>
          </section>
        )}

        {activeTab === 'sessions' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">My Sessions</h2>
            {bookedSessions.length > 0 ? (
              <div className="dashboard__schedule-list">
                {bookedSessions.map((session, i) => (
                  <motion.div key={session.id} className="schedule-item glass-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                    <div className="schedule-item__avatar">{session.counselor[0]}</div>
                    <div className="schedule-item__info">
                      <h4 className="schedule-item__name">{session.counselor}</h4>
                      <p className="schedule-item__type">{session.type}</p>
                    </div>
                    <div className="schedule-item__time">
                      <span className="schedule-item__clock">{session.time}</span>
                      <span className="schedule-item__date">{session.date}</span>
                    </div>
                    <span className="schedule-item__status schedule-item__status--upcoming">Upcoming</span>
                    <button className="btn-icon btn-icon--danger" onClick={() => handleCancelSession(session.id)} title="Cancel session">
                      <FaTimes />
                    </button>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="dashboard__empty-state">
                <FaCalendarAlt className="dashboard__empty-icon" />
                <p>No sessions booked yet. Browse counselors and book your first session!</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('directory')}>Find a Counselor</button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'messages' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Messages</h2>
            {bookedSessions.length > 0 ? (
              <div className="dashboard__messages-list">
                {bookedSessions.map((session, i) => (
                  <motion.div key={session.id} className="message-preview glass-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <div className="message-preview__avatar">{session.counselor[0]}</div>
                    <div className="message-preview__info">
                      <h4>{session.counselor}</h4>
                      <p className="message-preview__preview">Session {session.type} scheduled for {session.date} at {session.time}</p>
                    </div>
                    <span className="message-preview__time">Just now</span>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="dashboard__empty-state">
                <FaComments className="dashboard__empty-icon" />
                <p>Your conversations with counselors will appear here after booking a session.</p>
                <button className="btn btn-primary" onClick={() => setActiveTab('directory')}>Find a Counselor</button>
              </div>
            )}
          </section>
        )}

        {activeTab === 'progress' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">My Progress</h2>
            <div className="dashboard__progress-grid">
              <div className="progress-card glass-card">
                <h3>Mood Tracker</h3>
                <div className="progress-card__mood-chart">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                    const moods = [7, 6, 8, 5, 7, 9, 8];
                    const emojis = ['😐', '😔', '😊', '😟', '😐', '😄', '😊'];
                    return (
                      <div key={i} className="progress-card__mood-day">
                        <span className="progress-card__mood-emoji">{emojis[i]}</span>
                        <motion.div
                          className="progress-card__mood-bar"
                          initial={{ height: 0 }}
                          animate={{ height: `${moods[i] * 10}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5 }}
                        />
                        <span className="progress-card__mood-label">{day}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="progress-card glass-card">
                <h3>Wellness Goals</h3>
                <div className="progress-card__goals">
                  {[
                    { goal: 'Meditate daily', progress: 70 },
                    { goal: 'Sleep 8 hours', progress: 85 },
                    { goal: 'Exercise 3x/week', progress: 50 },
                    { goal: 'Journal feelings', progress: 60 },
                  ].map((g, i) => (
                    <div key={i} className="progress-card__goal-item">
                      <div className="progress-card__goal-header">
                        <span>{g.goal}</span>
                        <span className="progress-card__goal-pct">{g.progress}%</span>
                      </div>
                      <div className="progress-card__goal-track">
                        <motion.div
                          className="progress-card__goal-fill"
                          initial={{ width: 0 }}
                          animate={{ width: `${g.progress}%` }}
                          transition={{ delay: i * 0.15, duration: 0.6 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'chatbot' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">AI Chatbot Assistant</h2>
            <AIChatbot />
          </section>
        )}
      </main>

      {/* Contact Modal */}
      <AnimatePresence>
        {contactModal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactModal(null)}
          >
            <motion.div
              className="modal glass-card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal__close" onClick={() => setContactModal(null)}><FaTimes /></button>
              <div className="modal__avatar">{contactModal.initial}</div>
              <h3 className="modal__name">{contactModal.name}</h3>
              <p className="modal__designation">{contactModal.designation}</p>
              <p className="modal__qualification">{contactModal.qualification}</p>
              <div className="modal__rating">
                <FaStar className="modal__star" /> {contactModal.rating} rating • {contactModal.sessions} sessions
              </div>
              <p className="modal__subtitle">Choose how you'd like to connect:</p>
              <div className="modal__actions">
                <button className="btn btn-primary modal__action-btn" onClick={() => handleBookSession(contactModal, 'Video Call')}>
                  <FaVideo /> Video Call
                </button>
                <button className="btn btn-secondary modal__action-btn" onClick={() => handleBookSession(contactModal, 'Phone Call')}>
                  <FaPhone /> Phone Call
                </button>
                <button className="btn btn-secondary modal__action-btn" onClick={() => handleBookSession(contactModal, 'Chat')}>
                  <FaComments /> Chat Session
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StudentDashboard;
