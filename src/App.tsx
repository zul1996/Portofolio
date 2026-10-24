import React, { useState, useEffect, useCallback } from 'react';
import { ViewId } from './types';
import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { AboutView } from './components/views/AboutView';
import { SkillsView } from './components/views/SkillsView';
import { ContactView } from './components/views/ContactView';

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

  // Sync state with browser hash
  const navigateTo = useCallback((view: ViewId) => {
    setActiveView(view);
    setSelectedProjectId(null);
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

  // Keyboard navigation shortcuts: 1-5 to switch tabs, Esc to reset
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === 'Escape') {
        if (selectedProjectId) {
          handleSelectProject(null);
          return;
        }
        if (activeView !== 'home') {
          navigateTo('home');
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
  }, [selectedProjectId, activeView, navigateTo, handleSelectProject]);

  return (
    <div className="app-shell">
      {/* Secondary view back navigation */}
      {activeView !== 'home' && (
        <div style={{ position: 'absolute', top: 18, left: 24, zIndex: 30 }}>
          <button
            onClick={() => navigateTo('home')}
            className="btn-secondary"
            style={{ 
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              padding: '7px 16px',
              fontSize: '12.5px',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}
          >
            <span>&larr; Back to 3D World (Esc)</span>
          </button>
        </div>
      )}

      {/* Main Pure Fullscreen 3D Viewport Stage */}
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
    </div>
  );
};
