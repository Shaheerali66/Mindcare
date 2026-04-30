import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHeart, FaCalendarAlt, FaUsers, FaComments, FaMoneyBillWave,
  FaSignOutAlt, FaClock, FaCheckCircle, FaCheck, FaTimes,
  FaVideo, FaPhone
} from 'react-icons/fa';
import { FiCalendar, FiUsers, FiMessageCircle, FiDollarSign, FiEdit, FiCpu } from 'react-icons/fi';
import AIChatbot from '../../components/AIChatbot';
import './Dashboards.css';

const ConsultantDashboard = () => {
  const [activeTab, setActiveTab] = useState('schedule');
  const [profileSaved, setProfileSaved] = useState(false);
  const [schedule, setSchedule] = useState([
    { id: 1, student: 'Ahmed R.', time: '10:00 AM', date: 'Today', status: 'upcoming', type: 'Video Call' },
    { id: 2, student: 'Fatima K.', time: '2:00 PM', date: 'Today', status: 'upcoming', type: 'Chat Session' },
    { id: 3, student: 'Ali H.', time: '11:00 AM', date: 'Tomorrow', status: 'scheduled', type: 'Video Call' },
    { id: 4, student: 'Sana M.', time: '3:30 PM', date: 'Tomorrow', status: 'scheduled', type: 'Chat Session' },
  ]);
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmed R.', sessions: 8, lastSession: '2 days ago', mood: 'Improving', notes: '' },
    { id: 2, name: 'Fatima K.', sessions: 5, lastSession: 'Yesterday', mood: 'Stable', notes: '' },
    { id: 3, name: 'Ali H.', sessions: 3, lastSession: '1 week ago', mood: 'Needs Attention', notes: '' },
  ]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [profileData, setProfileData] = useState({
    name: 'Dr. Amna Shah',
    designation: 'Clinical Psychology Intern',
    qualification: 'MSc Clinical Psychology',
    bio: 'Passionate about helping students navigate academic and personal challenges through evidence-based counseling approaches.',
  });

  const handleCompleteSession = (sessionId) => {
    setSchedule(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleCancelSession = (sessionId) => {
    setSchedule(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleSaveNote = (studentId) => {
    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, notes: noteText } : s));
    setSelectedStudent(null);
    setNoteText('');
  };

  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const tabs = [
    { id: 'schedule', label: 'Schedule', icon: <FiCalendar /> },
    { id: 'students', label: 'Students', icon: <FiUsers /> },
    { id: 'messages', label: 'Messages', icon: <FiMessageCircle /> },
    { id: 'earnings', label: 'Earnings', icon: <FiDollarSign /> },
    { id: 'profile', label: 'Profile', icon: <FiEdit /> },
    { id: 'chatbot', label: 'AI Chat', icon: <FiCpu /> },
  ];

  return (
    <div className="dashboard dashboard--consultant" id="consultant-dashboard">
      <aside className="dashboard__sidebar dashboard__sidebar--consultant">
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

      <main className="dashboard__main">
        <header className="dashboard__header">
          <div>
            <h1 className="dashboard__welcome">Welcome, <span className="accent-text">Counselor</span> 💜</h1>
            <p className="dashboard__date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="dashboard__header-actions">
            <div className="dashboard__avatar dashboard__avatar--consultant">C</div>
          </div>
        </header>

        {/* Toasts */}
        <AnimatePresence>
          {profileSaved && (
            <motion.div className="dashboard__toast" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <FaCheck /> Profile updated successfully!
            </motion.div>
          )}
        </AnimatePresence>

        <div className="dashboard__stats">
          {[
            { label: 'Total Students', value: String(students.length), icon: <FaUsers />, color: 'var(--purple-500)' },
            { label: 'This Week', value: String(schedule.length), icon: <FaCalendarAlt />, color: 'var(--pink-500)' },
            { label: 'Unread', value: '5', icon: <FaComments />, color: 'var(--blue-400)' },
            { label: 'Earnings', value: 'Rs. 18K', icon: <FaMoneyBillWave />, color: 'var(--pink-600)' },
          ].map((stat, i) => (
            <motion.div key={i} className="dashboard__stat-card glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <div className="dashboard__stat-icon" style={{ color: stat.color, background: `${stat.color}14` }}>{stat.icon}</div>
              <div>
                <p className="dashboard__stat-value">{stat.value}</p>
                <p className="dashboard__stat-label">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {activeTab === 'schedule' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">My Schedule</h2>
            {schedule.length > 0 ? (
              <div className="dashboard__schedule-list">
                {schedule.map((s, i) => (
                  <motion.div key={s.id} className="schedule-item glass-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
                    <div className="schedule-item__avatar">{s.student[0]}</div>
                    <div className="schedule-item__info">
                      <h4 className="schedule-item__name">{s.student}</h4>
                      <p className="schedule-item__type">{s.type}</p>
                    </div>
                    <div className="schedule-item__time">
                      <span className="schedule-item__clock"><FaClock /> {s.time}</span>
                      <span className="schedule-item__date">{s.date}</span>
                    </div>
                    <span className={`schedule-item__status schedule-item__status--${s.status}`}>
                      {s.status === 'upcoming' ? 'Upcoming' : 'Scheduled'}
                    </span>
                    <div className="schedule-item__actions">
                      <button className="btn-icon btn-icon--success" onClick={() => handleCompleteSession(s.id)} title="Mark complete">
                        <FaCheckCircle />
                      </button>
                      <button className="btn-icon btn-icon--danger" onClick={() => handleCancelSession(s.id)} title="Cancel">
                        <FaTimes />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="dashboard__empty-state">
                <FaCalendarAlt className="dashboard__empty-icon" />
                <p>No sessions scheduled. Your upcoming sessions will appear here.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'students' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">My Students</h2>
            <div className="dashboard__students-list">
              {students.map((s, i) => (
                <motion.div key={s.id} className="student-row glass-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <div className="student-row__avatar">{s.name[0]}</div>
                  <div className="student-row__info">
                    <h4>{s.name}</h4>
                    <p>{s.sessions} sessions • Last: {s.lastSession}</p>
                  </div>
                  <span className={`student-row__mood student-row__mood--${s.mood.toLowerCase().replace(' ', '-')}`}>{s.mood}</span>
                  <button className="btn btn-secondary btn-sm" onClick={() => { setSelectedStudent(s); setNoteText(s.notes || ''); }}>
                    Add Note
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Note Modal */}
            <AnimatePresence>
              {selectedStudent && (
                <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedStudent(null)}>
                  <motion.div className="modal glass-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
                    <button className="modal__close" onClick={() => setSelectedStudent(null)}><FaTimes /></button>
                    <h3 className="modal__name">Session Notes: {selectedStudent.name}</h3>
                    <p className="modal__designation">Add confidential notes about this student's progress.</p>
                    <textarea
                      className="modal__textarea"
                      rows="6"
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Write session notes here..."
                    />
                    <div className="modal__actions">
                      <button className="btn btn-primary" onClick={() => handleSaveNote(selectedStudent.id)}>Save Note</button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {activeTab === 'messages' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Messages</h2>
            <div className="dashboard__messages-list">
              {students.map((s, i) => (
                <motion.div key={s.id} className="message-preview glass-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                  <div className="message-preview__avatar">{s.name[0]}</div>
                  <div className="message-preview__info">
                    <h4>{s.name}</h4>
                    <p className="message-preview__preview">Last session: {s.lastSession} • Mood: {s.mood}</p>
                  </div>
                  <span className="message-preview__time">{s.lastSession}</span>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {activeTab === 'earnings' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Earnings Overview</h2>
            <div className="dashboard__earnings-summary">
              <div className="earnings-card glass-card">
                <h3>This Month</h3>
                <p className="earnings-card__amount">Rs. 18,000</p>
                <p className="earnings-card__detail">24 sessions completed</p>
              </div>
              <div className="earnings-card glass-card">
                <h3>Last Month</h3>
                <p className="earnings-card__amount">Rs. 15,500</p>
                <p className="earnings-card__detail">20 sessions completed</p>
              </div>
              <div className="earnings-card glass-card">
                <h3>Total Earned</h3>
                <p className="earnings-card__amount">Rs. 82,000</p>
                <p className="earnings-card__detail">Since joining MindCare</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'profile' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Edit Profile</h2>
            <form className="dashboard__profile-form glass-card" onSubmit={handleSaveProfile}>
              <div className="profile-form__avatar-section">
                <div className="profile-form__avatar">C</div>
                <button type="button" className="btn btn-secondary">Change Photo</button>
              </div>
              <div className="profile-form__fields">
                <div className="profile-form__group">
                  <label>Display Name</label>
                  <input type="text" value={profileData.name} onChange={(e) => handleProfileChange('name', e.target.value)} />
                </div>
                <div className="profile-form__group">
                  <label>Designation</label>
                  <input type="text" value={profileData.designation} onChange={(e) => handleProfileChange('designation', e.target.value)} />
                </div>
                <div className="profile-form__group">
                  <label>Qualification</label>
                  <input type="text" value={profileData.qualification} onChange={(e) => handleProfileChange('qualification', e.target.value)} />
                </div>
                <div className="profile-form__group">
                  <label>Bio</label>
                  <textarea rows="4" value={profileData.bio} onChange={(e) => handleProfileChange('bio', e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
              </div>
            </form>
          </section>
        )}

        {activeTab === 'chatbot' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">AI Assistant</h2>
            <AIChatbot />
          </section>
        )}
      </main>
    </div>
  );
};

export default ConsultantDashboard;
