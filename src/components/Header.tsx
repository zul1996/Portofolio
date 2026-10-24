import React from 'react';
import { ViewId } from '../types';
import { portfolioData } from '../data/portfolio';
import { ArrowUpRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  onNavigate,
  mobileMenuOpen,
  onToggleMobileMenu
}) => {
  const { personal } = portfolioData;

  const navItems: { id: ViewId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="app-header" role="banner">
      <div className="brand-group">
        <a 
          href="#home" 
          className="brand-link" 
          onClick={(e) => { e.preventDefault(); onNavigate('home'); }}
          aria-label={`${personal.name} portfolio home`}
        >
          <span>{personal.name}</span>
          <span className="brand-badge">Systems</span>
        </a>

        {personal.status.available && (
          <div className="header-status-pill" title={personal.status.subtext}>
            <span className="status-pulse-dot" aria-hidden="true" />
            <span>Available for Q4 2026</span>
          </div>
        )}
      </div>

      <nav className="header-nav" role="navigation" aria-label="Main Navigation">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavigate(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className="nav-contact-cta"
          onClick={() => onNavigate('contact')}
          aria-label={activeView === 'contact' ? 'Direct contact view active' : 'Direct message or contact'}
          style={activeView === 'contact' ? { background: 'var(--color-green-dark)' } : undefined}
        >
          <span>{activeView === 'contact' ? 'Direct Channel' : 'Get in Touch'}</span>
          <ArrowUpRight size={14} aria-hidden="true" />
        </button>

        <button
          className="mobile-menu-toggle"
          onClick={onToggleMobileMenu}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};
