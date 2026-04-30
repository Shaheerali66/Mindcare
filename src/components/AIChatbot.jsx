import { useState, useRef, useEffect } from 'react';
import { FaRobot, FaUser, FaPaperPlane } from 'react-icons/fa';
import './AIChatbot.css';

const botResponses = {
  greetings: [
    "Hello! 😊 I'm glad you reached out. How are you feeling today?",
    "Hi there! Welcome to MindCare. I'm here to listen. What's on your mind?",
    "Hey! 👋 It takes courage to seek help. How can I support you today?",
  ],
  stress: [
    "I understand that stress can be overwhelming. 💙 Here are some things that might help:\n\n1. **Deep Breathing**: Try the 4-7-8 technique — breathe in for 4 seconds, hold for 7, exhale for 8.\n2. **Take a Break**: Step away from what's stressing you for 10 minutes.\n3. **Talk to Someone**: Consider booking a session with one of our counselors.\n\nWould you like me to help you book a session?",
    "Stress is your body's way of responding to challenges. It's completely normal. 🌸\n\nSome quick tips:\n• Practice mindfulness or meditation for 5 minutes\n• Write down 3 things you're grateful for\n• Go for a short walk\n\nIf stress is persistent, I'd recommend talking to a counselor. Want me to show you available counselors?",
  ],
  anxiety: [
    "I hear you, and anxiety can feel really difficult. 💛 You're not alone in this.\n\nHere's a grounding exercise — the **5-4-3-2-1 technique**:\n• **5** things you can see\n• **4** things you can touch\n• **3** things you can hear\n• **2** things you can smell\n• **1** thing you can taste\n\nThis can help bring you back to the present moment. Would you like to connect with a counselor for more support?",
    "Anxiety can be overwhelming, but remember — you are stronger than your anxiety. 💪\n\nTry this:\n1. Take slow, deep breaths\n2. Remind yourself: \"This feeling is temporary\"\n3. Focus on what you CAN control\n\nOur counselors specialize in anxiety support. Shall I help you find one?",
  ],
  depression: [
    "Thank you for sharing that with me. 💙 It takes real courage to talk about how you're feeling.\n\nPlease remember:\n• You are NOT alone\n• Your feelings are valid\n• Things can and do get better\n• Asking for help is a sign of strength\n\nI strongly recommend connecting with one of our professional counselors who can provide personalized support. Would you like me to help with that?",
    "I'm really glad you opened up. 🌸 Depression can make everything feel heavy, but small steps matter.\n\nSome gentle suggestions:\n• Be kind to yourself today\n• Try to do one small thing that usually brings you joy\n• Reach out to someone you trust\n\nOur counselors are here for you. Want me to book a session?",
  ],
  booking: [
    "I'd be happy to help you book a session! 📅\n\nHere's how:\n1. Go to the **Consultants** tab in your sidebar\n2. Browse through our verified counselors\n3. Click **Contact** on the counselor you'd like\n4. Choose a time that works for you\n\nAll sessions are 100% confidential. Would you like me to recommend a counselor based on your needs?",
  ],
  sleep: [
    "Sleep issues are very common among students. 🌙 Here are some tips for better sleep:\n\n1. **Set a Schedule**: Go to bed and wake up at the same time daily\n2. **Screen-Free Zone**: Put away devices 30 minutes before bed\n3. **Relaxation**: Try progressive muscle relaxation\n4. **Environment**: Keep your room cool, dark, and quiet\n5. **Avoid Caffeine**: No coffee or tea after 4 PM\n\nIf sleep problems persist, a counselor can help explore underlying causes. Would you like to book a session?",
  ],
  exams: [
    "Exam pressure is real, and you're not alone in feeling it! 📚\n\nHere are some strategies:\n1. **Break it Down**: Divide study material into small, manageable chunks\n2. **Pomodoro Technique**: Study for 25 min, break for 5 min\n3. **Practice Papers**: Test yourself regularly\n4. **Take Care of Basics**: Sleep, eat well, and stay hydrated\n5. **It's OK**: One exam doesn't define your worth\n\nWant to talk to a counselor about exam anxiety?",
  ],
  default: [
    "Thank you for sharing. 😊 I'm here to support you.\n\nHere are some things I can help with:\n• **Mood Check-in** — Tell me how you're feeling\n• **Coping Tips** — Ask about stress, anxiety, sleep, or exams\n• **Book a Session** — I can guide you to book a counselor session\n• **Self-Care** — I can suggest self-care activities\n\nWhat would you like to explore?",
    "I appreciate you reaching out! Here's what I can assist with:\n\n🧠 **Mental Health Tips** — stress, anxiety, depression\n📚 **Academic Support** — exam stress, time management\n😴 **Sleep & Wellness** — sleep hygiene, self-care\n📅 **Book a Session** — connect with a counselor\n\nJust type what you need help with!",
  ],
};

const getKeywords = (message) => {
  const msg = message.toLowerCase();
  if (/\b(hi|hello|hey|salam|assalam|how are you)\b/.test(msg)) return 'greetings';
  if (/\b(stress|stressed|pressure|overwhelm|burnout|tension|tense)\b/.test(msg)) return 'stress';
  if (/\b(anxiety|anxious|panic|nervous|worry|worried|fear|scared)\b/.test(msg)) return 'anxiety';
  if (/\b(depress|sad|hopeless|lonely|alone|empty|crying|cry|unhappy|miserable)\b/.test(msg)) return 'depression';
  if (/\b(book|appointment|session|schedule|counselor|consultant)\b/.test(msg)) return 'booking';
  if (/\b(sleep|insomnia|tired|fatigue|rest|nightmare)\b/.test(msg)) return 'sleep';
  if (/\b(exam|test|study|assignment|deadline|grade|marks|cgpa|gpa)\b/.test(msg)) return 'exams';
  return 'default';
};

const getResponse = (category) => {
  const responses = botResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
};

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! 👋 I'm your MindCare AI assistant. I'm here to help you with mood check-ins, basic guidance, and booking appointments.\n\nYou can ask me about:\n• Stress & anxiety management\n• Sleep issues\n• Exam pressure\n• Booking a counselor session\n\nHow are you feeling today?",
      time: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      type: 'user',
      text: trimmed,
      time: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking delay
    const delay = 800 + Math.random() * 1200;
    setTimeout(() => {
      const category = getKeywords(trimmed);
      const response = getResponse(category);

      const botMsg = {
        id: Date.now() + 1,
        type: 'bot',
        text: response,
        time: new Date(),
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, delay);

    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const quickActions = [
    { label: '😟 I feel stressed', msg: 'I am feeling very stressed' },
    { label: '😰 Anxiety help', msg: 'I have anxiety' },
    { label: '📅 Book session', msg: 'I want to book a session' },
    { label: '😴 Sleep issues', msg: 'I am having trouble sleeping' },
    { label: '📚 Exam stress', msg: 'I am stressed about exams' },
  ];

  return (
    <div className="chatbot" id="ai-chatbot">
      <div className="chatbot__messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chatbot__msg chatbot__msg--${msg.type}`}>
            <div className="chatbot__msg-avatar">
              {msg.type === 'bot' ? <FaRobot /> : <FaUser />}
            </div>
            <div className="chatbot__msg-content">
              <div className="chatbot__msg-bubble">
                {msg.text.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.split(/(\*\*[^*]+\*\*)/).map((part, j) => {
                      if (part.startsWith('**') && part.endsWith('**')) {
                        return <strong key={j}>{part.slice(2, -2)}</strong>;
                      }
                      return part;
                    })}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </span>
                ))}
              </div>
              <span className="chatbot__msg-time">{formatTime(msg.time)}</span>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="chatbot__msg chatbot__msg--bot">
            <div className="chatbot__msg-avatar"><FaRobot /></div>
            <div className="chatbot__msg-content">
              <div className="chatbot__msg-bubble chatbot__typing">
                <span className="chatbot__typing-dot" />
                <span className="chatbot__typing-dot" />
                <span className="chatbot__typing-dot" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 2 && (
        <div className="chatbot__quick-actions">
          {quickActions.map((action, i) => (
            <button
              key={i}
              className="chatbot__quick-btn"
              onClick={() => {
                setInputText(action.msg);
                setTimeout(() => {
                  setInputText('');
                  const userMsg = { id: Date.now(), type: 'user', text: action.msg, time: new Date() };
                  setMessages((prev) => [...prev, userMsg]);
                  setIsTyping(true);
                  setTimeout(() => {
                    const category = getKeywords(action.msg);
                    const response = getResponse(category);
                    setIsTyping(false);
                    setMessages((prev) => [...prev, { id: Date.now() + 1, type: 'bot', text: response, time: new Date() }]);
                  }, 1000 + Math.random() * 800);
                }, 100);
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="chatbot__input-bar">
        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          className="chatbot__input"
          id="chatbot-input"
        />
        <button
          className="chatbot__send-btn"
          onClick={handleSend}
          disabled={!inputText.trim()}
          id="chatbot-send-btn"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
