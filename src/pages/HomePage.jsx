import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHeart, FaShieldAlt, FaUserMd, FaRobot, FaQuoteLeft, FaStar,
  FaCheckCircle, FaArrowRight, FaUsers, FaLock, FaHandHoldingHeart
} from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './HomePage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const HomePage = () => {
  return (
    <main className="home" id="homepage">
      {/* ============ HERO ============ */}
      <section className="hero" id="hero-section">
        <div className="hero__bg-shapes">
          <div className="hero__shape hero__shape--1" />
          <div className="hero__shape hero__shape--2" />
          <div className="hero__shape hero__shape--3" />
          <div className="hero__shape hero__shape--4" />
        </div>

        <div className="container hero__container">
          <motion.div
            className="hero__content"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="hero__badge" variants={fadeUp}>
              <FaHeart className="hero__badge-icon" />
              <span>Trusted by 2,000+ Students</span>
            </motion.div>

            <motion.h1 className="hero__title" variants={fadeUp}>
              Your Safe Space to{' '}
              <span className="hero__title-highlight">Talk, Heal</span>
              <br />& <span className="hero__title-highlight">Grow</span>
            </motion.h1>

            <motion.p className="hero__subtitle" variants={fadeUp}>
              Affordable, confidential mental health support from psychology students and graduates.
              No judgment. No stigma. Just a compassionate ear when you need it most.
            </motion.p>

            <motion.div className="hero__ctas" variants={fadeUp}>
              <Link to="/signup" className="btn btn-primary btn-lg" id="hero-cta-primary">
                Start Your Journey <FiArrowRight />
              </Link>
              <Link to="/about" className="btn btn-secondary btn-lg" id="hero-cta-secondary">
                Learn More
              </Link>
            </motion.div>

            <motion.div className="hero__stats" variants={fadeUp}>
              <div className="hero__stat">
                <span className="hero__stat-number">2K+</span>
                <span className="hero__stat-label">Happy Students</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">150+</span>
                <span className="hero__stat-label">Counselors</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-number">98%</span>
                <span className="hero__stat-label">Satisfaction</span>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero__visual"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="hero__illustration">
              <div className="hero__card hero__card--1 float-animation">
                <FaShieldAlt className="hero__card-icon" />
                <span>100% Private</span>
              </div>
              <div className="hero__card hero__card--2 float-animation" style={{ animationDelay: '1s' }}>
                <FaUserMd className="hero__card-icon" />
                <span>Expert Counselors</span>
              </div>
              <div className="hero__card hero__card--3 float-animation" style={{ animationDelay: '2s' }}>
                <FaRobot className="hero__card-icon" />
                <span>AI Assistant</span>
              </div>
              <div className="hero__illustration-circle">
                <FaHandHoldingHeart size={72} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES ============ */}
      <section className="features section-padding" id="features-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            Why Choose <span className="accent-text">High on Healing</span>?
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            We combine technology with empathy to create a mental health experience that is affordable, accessible, and judgment-free.
          </motion.p>

          <motion.div
            className="features__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              {
                icon: <FaLock />,
                title: 'Complete Privacy',
                desc: 'End-to-end encrypted sessions. Your data stays yours. No one else can access your conversations.',
                color: '#f04080',
              },
              {
                icon: <FaUsers />,
                title: 'Peer Counselors',
                desc: 'Psychology students and graduates who truly understand your struggles and speak your language.',
                color: '#a855f7',
              },
              {
                icon: <FaHeart />,
                title: 'Affordable Care',
                desc: 'Plans starting from just Rs. 500/month. Mental health support should never be a luxury.',
                color: '#f04080',
              },
              {
                icon: <FaRobot />,
                title: 'AI Chatbot',
                desc: '24/7 AI assistant for instant mood check-ins, basic guidance, and easy appointment booking.',
                color: '#60a5fa',
              },
              {
                icon: <FaShieldAlt />,
                title: 'No Judgment',
                desc: 'A safe, stigma-free environment where you can express yourself openly without fear.',
                color: '#a855f7',
              },
              {
                icon: <FaUserMd />,
                title: 'Track Progress',
                desc: 'Monitor your well-being journey with mood logs, session summaries, and personalized insights.',
                color: '#f04080',
              },
            ].map((feature, i) => (
              <motion.div className="feature-card glass-card" key={i} variants={fadeUp} custom={i}>
                <div className="feature-card__icon" style={{ color: feature.color, background: `${feature.color}14` }}>
                  {feature.icon}
                </div>
                <h3 className="feature-card__title">{feature.title}</h3>
                <p className="feature-card__desc">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section className="how-it-works section-padding" id="how-it-works-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            How It <span className="accent-text">Works</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            Getting support is just three simple steps away.
          </motion.p>

          <motion.div
            className="steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              { step: '01', title: 'Create Your Account', desc: 'Sign up in under 60 seconds. Choose your role and set up your secure profile.', color: 'var(--pink-500)' },
              { step: '02', title: 'Find a Counselor', desc: 'Browse our directory of verified psychology students and graduates. Choose the right fit for you.', color: 'var(--purple-500)' },
              { step: '03', title: 'Start Healing', desc: 'Book your first session, chat with the AI bot, or message your counselor directly. You are not alone.', color: 'var(--pink-600)' },
            ].map((item, i) => (
              <motion.div className="step-card" key={i} variants={fadeUp} custom={i}>
                <div className="step-card__number" style={{ background: item.color }}>{item.step}</div>
                <div className="step-card__connector" />
                <h3 className="step-card__title">{item.title}</h3>
                <p className="step-card__desc">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials section-padding" id="testimonials-section">
        <div className="container">
          <motion.h2
            className="section-title"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            Stories of <span className="accent-text">Hope</span>
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUp}
          >
            Real experiences from students who found their light.
          </motion.p>

          <motion.div
            className="testimonials__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={staggerContainer}
          >
            {[
              {
                text: "I was drowning in exam stress and couldn't talk to anyone. High on Healing matched me with an amazing counselor who understood exactly what I was going through.",
                name: 'Ayesha K.',
                role: 'LUMS Student',
                rating: 5,
              },
              {
                text: "The AI chatbot helped me during a panic attack at 2 AM. It calmed me down and booked a session for the next day. This platform literally saved me.",
                name: 'Ahmed R.',
                role: 'NUST Student',
                rating: 5,
              },
              {
                text: "As a psychology graduate, this platform gave me real-world experience and helped me earn while doing what I love — helping others.",
                name: 'Fatima S.',
                role: 'Counselor on High on Healing',
                rating: 5,
              },
            ].map((t, i) => (
              <motion.div className="testimonial-card glass-card" key={i} variants={fadeUp} custom={i}>
                <FaQuoteLeft className="testimonial-card__quote" />
                <p className="testimonial-card__text">{t.text}</p>
                <div className="testimonial-card__stars">
                  {[...Array(t.rating)].map((_, j) => (
                    <FaStar key={j} className="testimonial-card__star" />
                  ))}
                </div>
                <div className="testimonial-card__author">
                  <div className="testimonial-card__avatar">{t.name[0]}</div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__role">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============ CTA BANNER ============ */}
      <section className="cta-banner" id="cta-banner-section">
        <div className="container">
          <motion.div
            className="cta-banner__content"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.h2 className="cta-banner__title" variants={fadeUp}>
              Your Healing Journey<br />
              Starts <span className="cta-banner__highlight">Today</span>
            </motion.h2>
            <motion.p className="cta-banner__subtitle" variants={fadeUp}>
              Join thousands of students who chose to prioritize their mental health. Take the first step.
            </motion.p>
            <motion.div className="cta-banner__btns" variants={fadeUp}>
              <Link to="/signup" className="btn btn-primary btn-lg cta-banner__btn" id="cta-signup">
                Get Started Free <FiArrowRight />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
