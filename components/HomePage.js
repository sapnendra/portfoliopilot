'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Smartphone, BarChart3 } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="home-page">
      <header className="home-header">
        <div className="home-header-content">
          <div className="logo-section">
            <Logo size={40} />
            <span className="logo-text">PortfolioPilot</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Track Your Investments
            <span className="hero-gradient"> Smartly</span>
          </h1>
          <p className="hero-description">
            A modern, clean investment tracking system to monitor your stocks and IPOs. 
            Calculate profit/loss, view portfolio performance, and manage your investments effortlessly.
          </p>
          <div className="hero-buttons">
            <Link href="/track" className="btn-primary btn-large">
              Get Started
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="visual-card card-1">
            <TrendingUp size={32} className="visual-icon" />
            <div className="visual-text">
              <div className="visual-value">+24.5%</div>
              <div className="visual-label">Portfolio Growth</div>
            </div>
          </div>
          <div className="visual-card card-2">
            <BarChart3 size={32} className="visual-icon" />
            <div className="visual-text">
              <div className="visual-value">₹2.5L</div>
              <div className="visual-label">Total Value</div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-heading">Why PortfolioPilot?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <TrendingUp size={28} />
            </div>
            <h3>Real-time Tracking</h3>
            <p>Monitor your investments with instant profit/loss calculations and portfolio metrics.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <BarChart3 size={28} />
            </div>
            <h3>Portfolio Analytics</h3>
            <p>Get comprehensive insights into your investment performance and returns.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Smartphone size={28} />
            </div>
            <h3>Mobile Friendly</h3>
            <p>Access your portfolio anywhere with our responsive mobile-first design.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <Shield size={28} />
            </div>
            <h3>Secure & Private</h3>
            <p>Your investment data is stored securely with MongoDB Atlas cloud storage.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to take control of your investments?</h2>
          <p>Start tracking your portfolio today and make informed investment decisions.</p>
          <Link href="/track" className="btn-primary btn-large">
            Start Tracking Now
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <Logo size={32} />
            <span>PortfolioPilot</span>
          </div>
          <p className="footer-text">
            © {new Date().getFullYear()} PortfolioPilot. Built for personal investment tracking.
          </p>
        </div>
      </footer>
    </div>
  );
}
