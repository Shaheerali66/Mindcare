import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaStar, FaCrown, FaRocket } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import './PricingPage.css';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

const plans = [
  {
    name: 'Starter',
    icon: <FaStar />,
    price: '500',
    period: '/month',
    desc: 'Perfect for students who want to explore mental wellness resources at a minimal cost.',
    features: [
      'AI Chatbot Access (24/7)',
      '1 Monthly Session (30 min)',
      'Basic Chat Support',
      'Mood Tracking Journal',
      'Self-Help Resources Library',
    ],
    cta: 'Get Started',
    popular: false,
    color: 'var(--pink-400)',
  },
  {
    name: 'Growth',
    icon: <FaRocket />,
    price: '1,500',
    period: '/month',
    desc: 'Our most popular plan for students who need regular, consistent support.',
    features: [
      'Everything in Starter',
      '4 Monthly Sessions (45 min)',
      'Priority Chat Support',
      'Progress Reports',
      'Personalized Wellness Plan',
      'Group Support Sessions',
    ],
    cta: 'Choose Growth',
    popular: true,
    color: 'var(--pink-600)',
  },
  {
    name: 'Premium Care',
    icon: <FaCrown />,
    price: '3,000',
    period: '/month',
    desc: 'Comprehensive care with senior graduates for students who need dedicated, intensive support.',
    features: [
      'Everything in Growth',
      '4 Video Sessions (60 min)',
      'Unlimited Messaging',
      'Senior Graduate Counselor',
      'Custom Progress Tracking',
      'Emergency Chat Support',
      'Family Session (1/month)',
    ],
    cta: 'Go Premium',
    popular: false,
    color: 'var(--pink-800)',
  },
];

const PricingPage = () => {
  return (
    <main className="pricing-page" id="pricing-page">
      <section className="pricing-hero">
        <div className="pricing-hero__bg" />
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="pricing-hero__content">
            <motion.h1 variants={fadeUp} className="pricing-hero__title">
              Simple, <span className="accent-text">Affordable</span> Pricing
            </motion.h1>
            <motion.p variants={fadeUp} className="pricing-hero__subtitle">
              Mental health care should never be a luxury. Choose the plan that fits your needs and budget.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="pricing-cards section-padding">
        <div className="container">
          <motion.div
            className="pricing-cards__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {plans.map((plan, i) => (
              <motion.div
                className={`pricing-card glass-card ${plan.popular ? 'pricing-card--popular' : ''}`}
                key={i}
                variants={fadeUp}
                custom={i}
              >
                {plan.popular && <div className="pricing-card__badge">Most Popular</div>}
                <div className="pricing-card__icon" style={{ color: plan.color, background: `${plan.color}14` }}>
                  {plan.icon}
                </div>
                <h3 className="pricing-card__name">{plan.name}</h3>
                <p className="pricing-card__desc">{plan.desc}</p>
                <div className="pricing-card__price">
                  <span className="pricing-card__currency">Rs.</span>
                  <span className="pricing-card__amount">{plan.price}</span>
                  <span className="pricing-card__period">{plan.period}</span>
                </div>
                <ul className="pricing-card__features">
                  {plan.features.map((f, j) => (
                    <li key={j} className="pricing-card__feature">
                      <FaCheck className="pricing-card__check" style={{ color: plan.color }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`btn ${plan.popular ? 'btn-primary' : 'btn-secondary'} pricing-card__cta`}
                >
                  {plan.cta} <FiArrowRight />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pricing-faq section-padding">
        <div className="container">
          <motion.h2 className="section-title" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            Frequently Asked <span className="accent-text">Questions</span>
          </motion.h2>
          <motion.div className="pricing-faq__list" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {[
              { q: 'Can I switch plans anytime?', a: 'Yes! You can upgrade or downgrade your plan at any time. Changes will be applied to your next billing cycle.' },
              { q: 'Are sessions really confidential?', a: 'Absolutely. All sessions are end-to-end encrypted. Your data is never shared with anyone, including family members.' },
              { q: 'What qualifications do counselors have?', a: 'All counselors are enrolled in or have graduated from accredited psychology programs. Each counselor is verified by our admin team.' },
              { q: 'Is there a free trial?', a: 'We offer a free introductory AI chatbot session so you can experience the platform before committing to a plan.' },
            ].map((item, i) => (
              <motion.div className="pricing-faq__item glass-card" key={i} variants={fadeUp} custom={i}>
                <h4 className="pricing-faq__question">{item.q}</h4>
                <p className="pricing-faq__answer">{item.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default PricingPage;
