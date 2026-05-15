import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUsers, FaUserMd, FaCalendarAlt, FaChartBar,
  FaSignOutAlt, FaCheckCircle, FaTimesCircle, FaClock,
  FaEnvelope, FaUserGraduate, FaCheck, FaTimes, FaTrash,
  FaBan, FaReply
} from 'react-icons/fa';
import { FiUsers, FiUserCheck, FiBarChart2, FiInbox, FiSettings, FiCpu } from 'react-icons/fi';
import AIChatbot from '../../components/AIChatbot';
import logoImg from '../../assets/logo.png';
import './Dashboards.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [toastMsg, setToastMsg] = useState('');

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const [users, setUsers] = useState([
    { id: 1, name: 'Ahmed R.', role: 'Student', email: 'ahmed@email.com', status: 'Active', joined: 'Jan 2026' },
    { id: 2, name: 'Dr. Amna Shah', role: 'Counselor', email: 'amna@email.com', status: 'Active', joined: 'Dec 2025' },
    { id: 3, name: 'Fatima K.', role: 'Student', email: 'fatima@email.com', status: 'Active', joined: 'Feb 2026' },
    { id: 4, name: 'Hira Malik', role: 'Counselor', email: 'hira@email.com', status: 'Active', joined: 'Mar 2026' },
    { id: 5, name: 'Usman Ali', role: 'Counselor', email: 'usman@email.com', status: 'Inactive', joined: 'Nov 2025' },
  ]);

  const [approvals, setApprovals] = useState([
    { id: 1, name: 'Bilal Ahmed', qualification: 'BSc Psychology (Honors)', university: 'Punjab University', applied: '2 days ago' },
    { id: 2, name: 'Nida Farooq', qualification: 'MSc Applied Psychology', university: 'GCU Lahore', applied: '1 day ago' },
    { id: 3, name: 'Tariq Hassan', qualification: 'BSc Psychology', university: 'FAST Islamabad', applied: '3 hours ago' },
  ]);

  const [queries, setQueries] = useState([
    { id: 1, from: 'Ahmed R.', role: 'Student', subject: 'Cannot join video session', message: 'I keep getting a connection error when I try to join my scheduled video session. Please help.', time: '1 hour ago', status: 'open' },
    { id: 2, from: 'Hira Malik', role: 'Counselor', subject: 'Payment not received', message: 'My earnings for last month have not been transferred yet. Can you please check?', time: '3 hours ago', status: 'open' },
    { id: 3, from: 'Sana M.', role: 'Student', subject: 'Change counselor request', message: 'I would like to switch to a different counselor. How can I do this?', time: '1 day ago', status: 'open' },
  ]);
  const [replyModal, setReplyModal] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleApprove = (id) => {
    const person = approvals.find(a => a.id === id);
    setApprovals(prev => prev.filter(a => a.id !== id));
    if (person) {
      setUsers(prev => [...prev, { id: Date.now(), name: person.name, role: 'Counselor', email: `${person.name.split(' ')[0].toLowerCase()}@email.com`, status: 'Active', joined: 'Apr 2026' }]);
      showToast(`${person.name} approved as Counselor!`);
    }
  };

  const handleReject = (id) => {
    const person = approvals.find(a => a.id === id);
    setApprovals(prev => prev.filter(a => a.id !== id));
    showToast(`${person?.name}'s application rejected.`);
  };

  const handleToggleUserStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
  };

  const handleDeleteUser = (id) => {
    const user = users.find(u => u.id === id);
    setUsers(prev => prev.filter(u => u.id !== id));
    showToast(`${user?.name} removed from platform.`);
  };

  const handleReplyQuery = (id) => {
    setQueries(prev => prev.map(q => q.id === id ? { ...q, status: 'resolved' } : q));
    setReplyModal(null);
    setReplyText('');
    showToast('Reply sent successfully!');
  };

  const handleCloseQuery = (id) => {
    setQueries(prev => prev.filter(q => q.id !== id));
    showToast('Query closed.');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <FiBarChart2 /> },
    { id: 'users', label: 'Users', icon: <FiUsers /> },
    { id: 'approvals', label: 'Approvals', icon: <FiUserCheck /> },
    { id: 'queries', label: 'Queries', icon: <FiInbox /> },
    { id: 'chatbot', label: 'AI Chat', icon: <FiCpu /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings /> },
  ];

  return (
    <div className="dashboard dashboard--admin" id="admin-dashboard">
      <aside className="dashboard__sidebar dashboard__sidebar--admin">
        <Link to="/" className="dashboard__logo">
          <img src={logoImg} alt="High on Healing" className="dashboard__logo-img" />
          <span className="dashboard__logo-text">High on <span className="accent-text">Healing</span></span>
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
            <h1 className="dashboard__welcome">Admin <span className="accent-text">Dashboard</span> 🛡️</h1>
            <p className="dashboard__date">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="dashboard__header-actions">
            <div className="dashboard__avatar dashboard__avatar--admin">A</div>
          </div>
        </header>

        {/* Toast */}
        <AnimatePresence>
          {toastMsg && (
            <motion.div className="dashboard__toast" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <FaCheck /> {toastMsg}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="dashboard__stats">
          {[
            { label: 'Total Students', value: String(users.filter(u => u.role === 'Student').length + ',140'), icon: <FaUserGraduate />, color: 'var(--pink-500)' },
            { label: 'Counselors', value: String(users.filter(u => u.role === 'Counselor').length + 153), icon: <FaUserMd />, color: 'var(--purple-500)' },
            { label: 'Sessions Today', value: '48', icon: <FaCalendarAlt />, color: 'var(--blue-400)' },
            { label: 'Pending Reviews', value: String(approvals.length), icon: <FaClock />, color: 'var(--pink-600)' },
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

        {activeTab === 'overview' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Platform Overview</h2>
            <div className="admin-overview-grid">
              <div className="admin-chart-card glass-card">
                <h3>Weekly Sessions</h3>
                <div className="admin-chart-placeholder">
                  <div className="admin-bar-chart">
                    {[65, 80, 55, 90, 75, 95, 85].map((h, i) => (
                      <motion.div key={i} className="admin-bar" initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: i * 0.1, duration: 0.6 }} />
                    ))}
                  </div>
                  <div className="admin-bar-labels">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                      <span key={i}>{d}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="admin-chart-card glass-card">
                <h3>Recent Activity</h3>
                <div className="admin-activity-list">
                  {[
                    { text: 'New student registration: Ayesha K.', time: '2 min ago', type: 'new' },
                    { text: 'Session completed: Dr. Amna ↔ Ahmed R.', time: '15 min ago', type: 'complete' },
                    { text: 'New counselor application: Bilal A.', time: '1 hour ago', type: 'pending' },
                    { text: 'Payment received: Rs. 1,500', time: '2 hours ago', type: 'payment' },
                    { text: 'Support query: Connectivity issue', time: '3 hours ago', type: 'query' },
                  ].map((a, i) => (
                    <div key={i} className="admin-activity-item">
                      <div className={`admin-activity-dot admin-activity-dot--${a.type}`} />
                      <div>
                        <p className="admin-activity-text">{a.text}</p>
                        <p className="admin-activity-time">{a.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {activeTab === 'users' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">User Management</h2>
            <div className="admin-users-table glass-card">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Role</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td className="admin-users-table__name">{u.name}</td>
                      <td><span className={`admin-role-badge admin-role-badge--${u.role.toLowerCase()}`}>{u.role}</span></td>
                      <td>{u.email}</td>
                      <td>
                        <span
                          className={`admin-status admin-status--${u.status.toLowerCase()} admin-status--clickable`}
                          onClick={() => handleToggleUserStatus(u.id)}
                          title="Click to toggle status"
                        >
                          {u.status}
                        </span>
                      </td>
                      <td>{u.joined}</td>
                      <td>
                        <button className="btn-icon btn-icon--danger" onClick={() => handleDeleteUser(u.id)} title="Remove user">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'approvals' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Pending Approvals</h2>
            {approvals.length > 0 ? (
              <div className="admin-approvals-list">
                {approvals.map((a, i) => (
                  <motion.div key={a.id} className="approval-card glass-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                    <div className="approval-card__avatar">{a.name[0]}</div>
                    <div className="approval-card__info">
                      <h4>{a.name}</h4>
                      <p>{a.qualification} — {a.university}</p>
                      <p className="approval-card__time">Applied {a.applied}</p>
                    </div>
                    <div className="approval-card__actions">
                      <button className="btn btn-primary approval-card__approve" onClick={() => handleApprove(a.id)}><FaCheckCircle /> Approve</button>
                      <button className="btn btn-secondary approval-card__reject" onClick={() => handleReject(a.id)}><FaTimesCircle /> Reject</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="dashboard__empty-state">
                <FaCheckCircle className="dashboard__empty-icon" style={{ color: '#22c55e' }} />
                <p>All caught up! No pending approvals.</p>
              </div>
            )}
          </section>
        )}

        {activeTab === 'queries' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Support Queries</h2>
            {queries.length > 0 ? (
              <div className="admin-queries-list">
                {queries.map((q, i) => (
                  <motion.div key={q.id} className="query-card glass-card" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                    <div className="query-card__header">
                      <div className="query-card__from">
                        <div className="query-card__avatar">{q.from[0]}</div>
                        <div>
                          <h4>{q.from}</h4>
                          <span className={`admin-role-badge admin-role-badge--${q.role.toLowerCase()}`}>{q.role}</span>
                        </div>
                      </div>
                      <span className={`query-card__status query-card__status--${q.status}`}>{q.status === 'open' ? '🟡 Open' : '✅ Resolved'}</span>
                    </div>
                    <h4 className="query-card__subject">{q.subject}</h4>
                    <p className="query-card__message">{q.message}</p>
                    <div className="query-card__footer">
                      <span className="query-card__time">{q.time}</span>
                      <div className="query-card__actions">
                        {q.status === 'open' && (
                          <button className="btn btn-primary btn-sm" onClick={() => { setReplyModal(q); setReplyText(''); }}>
                            <FaReply /> Reply
                          </button>
                        )}
                        <button className="btn btn-secondary btn-sm" onClick={() => handleCloseQuery(q.id)}>
                          <FaTimes /> Close
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="dashboard__empty-state">
                <FaEnvelope className="dashboard__empty-icon" />
                <p>No support queries at the moment.</p>
              </div>
            )}

            {/* Reply Modal */}
            <AnimatePresence>
              {replyModal && (
                <motion.div className="modal-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setReplyModal(null)}>
                  <motion.div className="modal glass-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} onClick={(e) => e.stopPropagation()}>
                    <button className="modal__close" onClick={() => setReplyModal(null)}><FaTimes /></button>
                    <h3 className="modal__name">Reply to: {replyModal.from}</h3>
                    <p className="modal__designation">Re: {replyModal.subject}</p>
                    <div className="modal__original-msg">
                      <p>"{replyModal.message}"</p>
                    </div>
                    <textarea className="modal__textarea" rows="5" value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Type your reply..." />
                    <div className="modal__actions">
                      <button className="btn btn-primary" onClick={() => handleReplyQuery(replyModal.id)} disabled={!replyText.trim()}>
                        <FaReply /> Send Reply
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {activeTab === 'chatbot' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">AI Assistant</h2>
            <AIChatbot />
          </section>
        )}

        {activeTab === 'settings' && (
          <section className="dashboard__section">
            <h2 className="dashboard__section-title">Platform Settings</h2>
            <div className="dashboard__settings-grid">
              <div className="settings-card glass-card">
                <h3>General</h3>
                <div className="settings-card__item">
                  <label>Platform Name</label>
                  <input type="text" defaultValue="High on Healing" />
                </div>
                <div className="settings-card__item">
                  <label>Support Email</label>
                  <input type="email" defaultValue="support@highonhealing.pk" />
                </div>
                <button className="btn btn-primary" onClick={() => showToast('Settings saved!')}>Save Settings</button>
              </div>
              <div className="settings-card glass-card">
                <h3>Pricing (PKR)</h3>
                <div className="settings-card__item">
                  <label>Starter Plan</label>
                  <input type="number" defaultValue="500" />
                </div>
                <div className="settings-card__item">
                  <label>Growth Plan</label>
                  <input type="number" defaultValue="1500" />
                </div>
                <div className="settings-card__item">
                  <label>Premium Plan</label>
                  <input type="number" defaultValue="3000" />
                </div>
                <button className="btn btn-primary" onClick={() => showToast('Pricing updated!')}>Update Pricing</button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
