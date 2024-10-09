import React from 'react';
import './HomePage.css';
import homepage1 from '../../images/homepage1.jpg';
import homepage2 from '../../images/homepage2.jpg';
import homepage3 from '../../images/homepage3.jpg';
import backgroundImage from '../../images/homepage-background.jpg';

const HomePage = () => {
  return (
    <div className="home-container"
    style={{ 
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
    }}>
      {/* Hero section */}
      <section className="hero-section">
        <h1>Welcome to the Book World</h1>
        <p>Explore our tremendous collection of books and find your next read!</p>
        <button className="cta-button">Explore Books</button>
      </section>

      {/* Features section */}
      <section className="features-section">
        <h2>What We Offer</h2>
        <div className="features-grid">
          <div className="feature-item">
            <i className="fas fa-book"></i>
            <h3>Discover Books</h3>
            <p>Find books from various genres and authors to enjoy reading.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-star"></i>
            <h3>Rate and Review</h3>
            <p>Share your thoughts on books by leaving reviews and ratings.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-user"></i>
            <h3>Create Your Own Library</h3>
            <p>Save your favorite books and create your own digital library.</p>
          </div>
        </div>
      </section>

      {/* Popular Books section */}
      <section className="popular-books-section">
        <h2>Popular Books</h2>
        <div className="book-grid">
          {/* Example book items */}
          <div className="book-item">
          <img src={homepage1} alt="Book 1" />
            <h3>The Great Gatsby</h3>
          </div>
          <div className="book-item">
          <img src={homepage2} alt="Book 1" />
            <h3>1984</h3>
          </div>
          <div className="book-item">
          <img src={homepage3} alt="Book 1" />
            <h3>To Kill a Mockingbird</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
