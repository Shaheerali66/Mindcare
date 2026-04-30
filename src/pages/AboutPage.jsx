import { motion } from 'framer-motion';
import { FaHeart, FaHandHoldingHeart, FaBullseye, FaUsers, FaLightbulb } from 'react-icons/fa';
import './AboutPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };

const AboutPage = () => {
  return (
    <main className="about-page" id="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero__bg" />
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="about-hero__content">
            <motion.h1 variants={fadeUp} className="about-hero__title">
              About <span className="accent-text">MindCare</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="about-hero__subtitle">
              We believe every student deserves access to affordable, judgment-free mental health support. Our mission is to bridge the gap between those who need help and those who can provide it.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="about-story section-padding">
        <div className="container">
          <div className="about-story__grid">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="about-story__visual">
              <div className="about-story__circle">
                <FaHandHoldingHeart size={64} />
              </div>
              <div className="about-story__stat-card about-story__stat-card--1 float-animation">
                <span className="about-story__stat-num">2,000+</span>
                <span className="about-story__stat-label">Lives Touched</span>
              </div>
              <div className="about-story__stat-card about-story__stat-card--2 float-animation" style={{ animationDelay: '1.5s' }}>
                <span className="about-story__stat-num">150+</span>
                <span className="about-story__stat-label">Counselors</span>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
              <motion.h2 variants={fadeUp} className="section-title" style={{ textAlign: 'left' }}>Our Story</motion.h2>
              <motion.p variants={fadeUp} className="about-story__text">
                MindCare was born from a simple observation: students in Pakistan are facing unprecedented mental health challenges, yet stigma, cost, and accessibility prevent most from seeking help.
              </motion.p>
              <motion.p variants={fadeUp} className="about-story__text">
                We built a platform that connects students struggling with anxiety, stress, and depression to psychology graduates and senior students who can offer empathetic, affordable support from the comfort of home.
              </motion.p>
              <motion.p variants={fadeUp} className="about-story__text">
                By creating a bridge between mental health seekers and aspiring psychologists, we create a win-win: students get affordable care, and counselors gain practical experience.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="about-values section-padding">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Our Core <span className="accent-text">Values</span>
          </motion.h2>
          <motion.p className="section-subtitle" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Everything we build is guided by these principles.
          </motion.p>

          <motion.div className="about-values__grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { icon: <FaHeart />, title: 'Empathy First', desc: 'We lead with compassion. Every feature, every interaction is designed to make users feel safe and understood.' },
              { icon: <FaBullseye />, title: 'Accessibility', desc: 'Mental health care should be available to everyone, regardless of location, income, or social background.' },
              { icon: <FaUsers />, title: 'Community', desc: 'We are building a community of healers and seekers, united by the belief that no one should struggle alone.' },
              { icon: <FaLightbulb />, title: 'Innovation', desc: 'We leverage technology — from AI chatbots to secure messaging — to deliver a modern, seamless experience.' },
            ].map((v, i) => (
              <motion.div className="about-value-card glass-card" key={i} variants={fadeUp} custom={i}>
                <div className="about-value-card__icon">{v.icon}</div>
                <h3 className="about-value-card__title">{v.title}</h3>
                <p className="about-value-card__desc">{v.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="about-team section-padding">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Meet The <span className="accent-text">Team</span>
          </motion.h2>
          <motion.p className="section-subtitle" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Passionate individuals dedicated to changing the mental health landscape.
          </motion.p>

          <motion.div className="about-team__grid" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { name: 'Zainab', role: 'Founder & Lead', initial: 'Z' },
              { name: 'Sarah Ahmed', role: 'Clinical Advisor', initial: 'S' },
              { name: 'Ali Raza', role: 'Tech Lead', initial: 'A' },
            ].map((m, i) => (
              <motion.div className="about-team-card glass-card" key={i} variants={fadeUp} custom={i}>
                <div className="about-team-card__avatar">{m.initial}</div>
                <h3 className="about-team-card__name">{m.name}</h3>
                <p className="about-team-card__role">{m.role}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
