import { motion } from 'framer-motion';
import './PrivacyPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
};

const PrivacyPage = () => {
  return (
    <main className="privacy-page" id="privacy-page">
      <section className="privacy-hero">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="privacy-hero__title">
            Privacy <span className="accent-text">Policy</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="privacy-hero__subtitle">
            Your privacy is our top priority. Here is how we protect your data.
          </motion.p>
        </div>
      </section>

      <section className="privacy-content section-padding">
        <div className="container">
          <motion.div className="privacy-content__body" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <div className="privacy-section">
              <h2>1. Information We Collect</h2>
              <p>We collect only the minimum information necessary to provide our services:</p>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, and role (student/counselor).</li>
                <li><strong>Session Data:</strong> Session timestamps and general topic categories (never conversation content stored permanently).</li>
                <li><strong>Usage Data:</strong> Anonymous platform usage analytics to improve our service.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>2. How We Use Your Information</h2>
              <p>Your data is used exclusively to:</p>
              <ul>
                <li>Provide and improve mental health counseling services.</li>
                <li>Match you with appropriate counselors.</li>
                <li>Enable the AI chatbot to offer basic guidance.</li>
                <li>Send important service-related notifications.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>3. Data Protection</h2>
              <p>We implement industry-standard security measures including:</p>
              <ul>
                <li>End-to-end encryption for all chat and video sessions.</li>
                <li>Encrypted data storage on secure servers.</li>
                <li>Regular security audits and vulnerability assessments.</li>
                <li>Strict access controls — only you and your counselor can access session content.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>4. Data Sharing</h2>
              <p>We <strong>never</strong> share your personal information with third parties, including:</p>
              <ul>
                <li>Parents, guardians, or family members.</li>
                <li>Educational institutions or employers.</li>
                <li>Advertisers or marketing companies.</li>
              </ul>
              <p>Exception: We may disclose information only if legally required or if there is an imminent risk of harm to you or others.</p>
            </div>

            <div className="privacy-section">
              <h2>5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access all personal data we hold about you.</li>
                <li>Request deletion of your account and all associated data.</li>
                <li>Export your data in a portable format.</li>
                <li>Opt-out of non-essential communications.</li>
              </ul>
            </div>

            <div className="privacy-section">
              <h2>6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@highonhealing.pk">privacy@highonhealing.pk</a>.</p>
            </div>

            <div className="privacy-section privacy-section--updated">
              <p><strong>Last Updated:</strong> April 2026</p>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PrivacyPage;
