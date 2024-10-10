import React, { useState } from 'react';
import './Faq.css';

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-box">
        <div
          className={`faq-item ${openIndex === 0 ? 'open' : ''}`}
          onClick={() => toggleFaq(0)}
        >
          <h3>How can I register for an account?</h3>
          <p>To register, click on the "Register" link in the navbar and fill in your details.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 1 ? 'open' : ''}`}
          onClick={() => toggleFaq(1)}
        >
          <h3>How do I reset my password?</h3>
          <p>You can reset your password by clicking on the "Forgot Password" link on the login page.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 2 ? 'open' : ''}`}
          onClick={() => toggleFaq(2)}
        >
          <h3>How do I search for books?</h3>
          <p>You can search for books by going to the "Books" section and using the search bar.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 3 ? 'open' : ''}`}
          onClick={() => toggleFaq(3)}
        >
          <h3>How do I contact customer support?</h3>
          <p>You can reach customer support via the "Contact" page in the footer.</p>
        </div>

        {/* Fler frågor */}
        <div
          className={`faq-item ${openIndex === 4 ? 'open' : ''}`}
          onClick={() => toggleFaq(4)}
        >
          <h3>How can I review and rate books?</h3>
          <p>Once you log in, you can review and rate books by visiting their respective pages.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 5 ? 'open' : ''}`}
          onClick={() => toggleFaq(5)}
        >
          <h3>Can I create my own reading lists?</h3>
          <p>Yes, you can create personalized reading lists after registering and logging in.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 6 ? 'open' : ''}`}
          onClick={() => toggleFaq(6)}
        >
          <h3>How do I update my account information?</h3>
          <p>You can update your account information by going to the "Profile" section in your account settings.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 7 ? 'open' : ''}`}
          onClick={() => toggleFaq(7)}
        >
          <h3>Is my personal information secure?</h3>
          <p>We take privacy seriously and use encryption to protect your personal information.</p>
        </div>

        <div
          className={`faq-item ${openIndex === 8 ? 'open' : ''}`}
          onClick={() => toggleFaq(8)}
        >
          <h3>Can I delete my account?</h3>
          <p>Yes, you can request account deletion by contacting customer support.</p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
