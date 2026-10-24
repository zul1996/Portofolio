import React, { useState, useEffect, useCallback } from 'react';
import { ViewId } from './types';
import { HomeView } from './components/views/HomeView';
import { ProjectsView } from './components/views/ProjectsView';
import { AboutView } from './components/views/AboutView';
import { SkillsView } from './components/views/SkillsView';
import { ContactView } from './components/views/ContactView';
import { 
  Sparkles, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Mail 
} from 'lucide-react';

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

  // Keyboard navigation shortcuts: 0-4 / Esc to reset
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

      if (e.key === '0' || e.key === '`') navigateTo('home');
      else if (e.key === '1') navigateTo('about');
      else if (e.key === '2') navigateTo('skills');
      else if (e.key === '3') navigateTo('projects');
      else if (e.key === '4') navigateTo('contact');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, activeView, navigateTo, handleSelectProject]);

  return (
    <div className="app-shell">
      {/* Main Single-Screen Content Stage */}
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

      {/* Floating Bottom Command Dock */}
      <nav className="command-dock-container" role="navigation" aria-label="Command Dock">
        <div className="command-dock">
          <button
            onClick={() => navigateTo('home')}
            className={`dock-btn ${activeView === 'home' ? 'active' : ''}`}
            aria-label="Overview Stage"
            aria-current={activeView === 'home' ? 'page' : undefined}
          >
            <Sparkles size={14} />
            <span>Overview</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`dock-btn ${activeView === 'about' ? 'active' : ''}`}
            aria-label="Profile and CV"
            aria-current={activeView === 'about' ? 'page' : undefined}
          >
            <Briefcase size={14} />
            <span>01. Profile & CV</span>
          </button>

          <button
            onClick={() => navigateTo('skills')}
            className={`dock-btn ${activeView === 'skills' ? 'active' : ''}`}
            aria-label="Tech Stack and Capabilities"
            aria-current={activeView === 'skills' ? 'page' : undefined}
          >
            <Code2 size={14} />
            <span>02. Tech Stack</span>
          </button>

          <button
            onClick={() => navigateTo('projects')}
            className={`dock-btn ${activeView === 'projects' ? 'active' : ''}`}
            aria-label="Core Engineering Systems"
            aria-current={activeView === 'projects' ? 'page' : undefined}
          >
            <FolderGit2 size={14} />
            <span>03. Core Systems</span>
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`dock-btn ${activeView === 'contact' ? 'active' : ''}`}
            aria-label="Direct Communication and Inquiries"
            aria-current={activeView === 'contact' ? 'page' : undefined}
          >
            <Mail size={14} />
            <span>04. Contact</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
