import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import './ContactPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <main className="contact-page" id="contact-page">
      <section className="contact-hero">
        <div className="container">
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="contact-hero__title">
            Get In <span className="accent-text">Touch</span>
          </motion.h1>
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="contact-hero__subtitle">
            Have questions? We are here to help. Reach out and we will get back to you within 24 hours.
          </motion.p>
        </div>
      </section>

      <section className="contact-body section-padding">
        <div className="container">
          <div className="contact-body__grid">
            {/* Info Cards */}
            <motion.div className="contact-info" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              {[
                { icon: <FiMail />, title: 'Email Us', detail: 'support@mindcare.pk', sub: 'We reply within 24 hours' },
                { icon: <FiPhone />, title: 'Call Us', detail: '+92 300 1234567', sub: 'Mon-Fri, 9 AM - 6 PM' },
                { icon: <FiMapPin />, title: 'Visit Us', detail: 'Islamabad, Pakistan', sub: 'By appointment only' },
              ].map((item, i) => (
                <motion.div className="contact-info-card glass-card" key={i} variants={fadeUp} custom={i}>
                  <div className="contact-info-card__icon">{item.icon}</div>
                  <div>
                    <h3 className="contact-info-card__title">{item.title}</h3>
                    <p className="contact-info-card__detail">{item.detail}</p>
                    <p className="contact-info-card__sub">{item.sub}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.form
              className="contact-form glass-card"
              onSubmit={handleSubmit}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              id="contact-form"
            >
              <h2 className="contact-form__title">Send us a Message</h2>
              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="contact-form__group">
                <label htmlFor="subject">Subject</label>
                <input type="text" id="subject" name="subject" placeholder="How can we help?" value={formData.subject} onChange={handleChange} required />
              </div>
              <div className="contact-form__group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell us more..." value={formData.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn btn-primary contact-form__submit" id="contact-submit-btn">
                {submitted ? 'Message Sent! ✓' : <>Send Message <FiSend /></>}
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
