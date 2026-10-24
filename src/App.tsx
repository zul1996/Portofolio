import React, { useState, useEffect, useCallback } from 'react';
import { ViewId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { AboutView } from './components/views/AboutView';
import { SkillsView } from './components/views/SkillsView';
import { ContactView } from './components/views/ContactView';
import { X, ArrowRight } from 'lucide-react';
import { portfolioData } from './data/portfolio';

const VALID_VIEWS: ViewId[] = ['home', 'projects', 'about', 'skills', 'contact'];

export const App: React.FC = () => {
  const parseCurrentLocation = (): { view: ViewId; projectId: string | null } => {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash) return { view: 'home', projectId: null };

    const parts = rawHash.split('/');
    const mainView = VALID_VIEWS.includes(parts[0] as ViewId) ? (parts[0] as ViewId) : 'home';
    const projectId = parts[0] === 'projects' && parts[1] ? parts[1] : null;

    return { view: mainView, projectId };
  };

  const initial = parseCurrentLocation();
  const [activeView, setActiveView] = useState<ViewId>(initial.view);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(initial.projectId);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Sync state with browser hash
  const navigateTo = useCallback((view: ViewId) => {
    setActiveView(view);
    setSelectedProjectId(null);
    setMobileMenuOpen(false);
    if (window.location.hash !== `#${view}`) {
      window.history.pushState(null, '', `#${view}`);
    }
  }, []);

  const handleSelectProject = useCallback((id: string | null) => {
    setSelectedProjectId(id);
    const targetHash = id ? `#projects/${id}` : '#projects';
    if (window.location.hash !== targetHash) {
      window.history.pushState(null, '', targetHash);
    }
  }, []);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const { view, projectId } = parseCurrentLocation();
      setActiveView(view);
      setSelectedProjectId(projectId);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Keyboard navigation shortcuts: 1-5 to switch tabs, Esc to close menu or reset project
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
          return;
        }
        if (selectedProjectId) {
          handleSelectProject(null);
          return;
        }
      }

      if (e.key === '1') navigateTo('home');
      else if (e.key === '2') navigateTo('projects');
      else if (e.key === '3') navigateTo('about');
      else if (e.key === '4') navigateTo('skills');
      else if (e.key === '5') navigateTo('contact');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, selectedProjectId, navigateTo, handleSelectProject]);

  const navItems: { id: ViewId; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="app-shell">
      {/* 1. Compact Header */}
      <Header
        activeView={activeView}
        onNavigate={navigateTo}
        mobileMenuOpen={mobileMenuOpen}
        onToggleMobileMenu={() => setMobileMenuOpen(prev => !prev)}
      />

      {/* 2. Main Fixed Viewport Stage */}
      <main className="main-stage" id="main-content" tabIndex={-1}>
        {activeView === 'home' && <HomeView onNavigate={navigateTo} />}
        {activeView === 'projects' && (
          <ProjectsView 
            selectedProjectId={selectedProjectId}
            onSelectProject={handleSelectProject}
          />
        )}
        {activeView === 'about' && <AboutView />}
        {activeView === 'skills' && <SkillsView />}
        {activeView === 'contact' && <ContactView />}
      </main>

      {/* 3. Minimal Footer */}
      <Footer />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div 
          className="mobile-nav-overlay"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div 
            className="mobile-nav-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
                <span style={{ fontWeight: 600, fontSize: '16px' }}>{portfolioData.personal.name}</span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                  style={{ padding: '6px' }}
                >
                  <X size={20} />
                </button>
              </div>

              <div className="mobile-nav-links">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    className={`mobile-nav-item ${activeView === item.id ? 'active' : ''}`}
                    onClick={() => navigateTo(item.id)}
                  >
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-light)' }}>
              <button
                className="btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => navigateTo('contact')}
              >
                <span>Get in Touch</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
