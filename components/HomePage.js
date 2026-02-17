'use client';

import Link from 'next/link';
import { ArrowRight, TrendingUp, Shield, Smartphone, BarChart3, LineChart, PieChart, Wallet, Zap, Lock, Globe } from 'lucide-react';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-nav">
        <div className="container nav-container">
          <Link href="/" className="nav-brand">
            <Logo size={36} />
            <span className="brand-name">PortfolioPilot</span>
          </Link>
          <div className="nav-actions">
            <ThemeToggle />
            <Link href="/track" className="btn-nav">
              Launch App <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="container hero-container">
          <div className="hero-left">
            <div className="hero-badge">
              <Zap size={14} />
              <span>Smart Investment Tracking</span>
            </div>
            <h1 className="hero-title">
              Your Complete
              <span className="gradient-text"> Investment Portfolio</span>
              <br />in One Place
            </h1>
            <p className="hero-subtitle">
              Track stocks and IPOs effortlessly. Get real-time insights, calculate P&L instantly, 
              and make data-driven investment decisions with confidence.
            </p>
            <div className="hero-cta">
              <Link href="/track" className="btn-primary-hero">
                Start Tracking Free
                <ArrowRight size={20} />
              </Link>
              <div className="hero-stats-inline">
                <div className="stat-item">
                  <TrendingUp size={18} />
                  <span>Real-time Updates</span>
                </div>
                <div className="stat-item">
                  <Shield size={18} />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hero-right">
            <div className="dashboard-preview">
              <div className="preview-header">
                <div className="preview-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className="preview-title">Portfolio Dashboard</span>
              </div>
              <div className="preview-content">
                <div className="metric-preview">
                  <div className="metric-item">
                    <span className="metric-label">Total Value</span>
                    <span className="metric-value">₹12,45,680</span>
                    <span className="metric-change positive">+24.5% ↑</span>
                  </div>
                  <div className="metric-item">
                    <span className="metric-label">Total Invested</span>
                    <span className="metric-value">₹10,00,000</span>
                  </div>
                </div>
                <div className="chart-preview">
                  <div className="chart-bars">
                    <div className="bar" style={{height: '40%'}}></div>
                    <div className="bar" style={{height: '65%'}}></div>
                    <div className="bar" style={{height: '50%'}}></div>
                    <div className="bar" style={{height: '80%'}}></div>
                    <div className="bar" style={{height: '70%'}}></div>
                    <div className="bar" style={{height: '90%'}}></div>
                    <div className="bar" style={{height: '75%'}}></div>
                  </div>
                </div>
                <div className="stocks-preview">
                  <div className="stock-item">
                    <div className="stock-icon">📈</div>
                    <div className="stock-info">
                      <span className="stock-name">RELIANCE</span>
                      <span className="stock-shares">50 shares</span>
                    </div>
                    <span className="stock-return positive">+12.5%</span>
                  </div>
                  <div className="stock-item">
                    <div className="stock-icon">💹</div>
                    <div className="stock-info">
                      <span className="stock-name">TCS</span>
                      <span className="stock-shares">30 shares</span>
                    </div>
                    <span className="stock-return positive">+8.3%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <LineChart size={28} />
              <h3>Real-time</h3>
              <p>Instant P&L calculations</p>
            </div>
            <div className="stat-card">
              <Wallet size={28} />
              <h3>INR Support</h3>
              <p>Indian Rupee formatting</p>
            </div>
            <div className="stat-card">
              <Smartphone size={28} />
              <h3>Mobile First</h3>
              <p>Track on any device</p>
            </div>
            <div className="stat-card">
              <Lock size={28} />
              <h3>Secure</h3>
              <p>MongoDB Atlas storage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Everything you need to manage your portfolio</h2>
            <p className="section-desc">Powerful features designed for smart investors</p>
          </div>
          
          <div className="features-showcase">
            <div className="feature-large">
              <div className="feature-content">
                <div className="feature-icon-large">
                  <BarChart3 size={40} />
                </div>
                <h3>Comprehensive Analytics</h3>
                <p>Track your total invested amount, current portfolio value, profit/loss, and return percentage with beautiful visualizations and real-time updates.</p>
                <ul className="feature-list">
                  <li><TrendingUp size={16} /> Portfolio performance metrics</li>
                  <li><TrendingUp size={16} /> Individual stock tracking</li>
                  <li><TrendingUp size={16} /> Profit/Loss calculations</li>
                </ul>
              </div>
              <div className="feature-visual">
                <div className="analytics-card">
                  <div className="analytics-header">Portfolio Performance</div>
                  <div className="analytics-chart">
                    <PieChart size={120} className="chart-icon" />
                  </div>
                  <div className="analytics-legend">
                    <span className="legend-item">
                      <span className="legend-dot profit"></span>
                      Profit: ₹2,45,680
                    </span>
                    <span className="legend-item">
                      <span className="legend-dot invested"></span>
                      Invested: ₹10,00,000
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="features-grid-small">
              <div className="feature-small">
                <div className="feature-icon-small">
                  <Globe size={24} />
                </div>
                <h4>Indian Market Focus</h4>
                <p>Built specifically for Indian investors with INR currency formatting and local market support.</p>
              </div>
              
              <div className="feature-small">
                <div className="feature-icon-small">
                  <Shield size={24} />
                </div>
                <h4>Data Security</h4>
                <p>Your investment data is encrypted and stored securely on MongoDB Atlas cloud infrastructure.</p>
              </div>
              
              <div className="feature-small">
                <div className="feature-icon-small">
                  <Zap size={24} />
                </div>
                <h4>Lightning Fast</h4>
                <p>Built with Next.js for instant page loads and smooth navigation. No waiting, just tracking.</p>
              </div>
              
              <div className="feature-small">
                <div className="feature-icon-small">
                  <Smartphone size={24} />
                </div>
                <h4>Responsive Design</h4>
                <p>Access your portfolio from anywhere - desktop, tablet, or mobile. Fully responsive interface.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-card">
            <div className="cta-content">
              <h2>Ready to take control of your investments?</h2>
              <p>Join thousands of investors tracking their portfolios with PortfolioPilot</p>
            </div>
            <Link href="/track" className="btn-cta">
              Get Started Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <Logo size={32} />
              <span className="footer-brand-name">PortfolioPilot</span>
              <p className="footer-tagline">Smart investment tracking for modern investors</p>
            </div>
            <div className="footer-copyright">
              © {new Date().getFullYear()} PortfolioPilot. Built with ❤️ for investors.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
