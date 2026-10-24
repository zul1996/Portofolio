import React, { useState, useEffect, useCallback } from 'react';
import { ViewId } from './types';
import { SplitTerminalHome } from './components/views/SplitTerminalHome';
import { 
  Sparkles, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Mail 
} from 'lucide-react';

const VALID_VIEWS: ViewId[] = ['home', 'projects', 'about', 'skills', 'contact'];

export const App: React.FC = () => {
  const parseCurrentLocation = (): ViewId => {
    const rawHash = window.location.hash.replace('#', '').trim();
    if (!rawHash) return 'home';
    const parts = rawHash.split('/');
    return VALID_VIEWS.includes(parts[0] as ViewId) ? (parts[0] as ViewId) : 'home';
  };

  const [activeView, setActiveView] = useState<ViewId>(parseCurrentLocation);

  // Sync state with browser hash
  const navigateTo = useCallback((view: ViewId) => {
    setActiveView(view);
    if (window.location.hash !== `#${view}`) {
      window.history.pushState(null, '', `#${view}`);
    }
  }, []);

  // Handle browser back / forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      setActiveView(parseCurrentLocation());
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

      if (e.key === 'Escape' || e.key === '0' || e.key === '`') navigateTo('home');
      else if (e.key === '1') navigateTo('about');
      else if (e.key === '2') navigateTo('skills');
      else if (e.key === '3') navigateTo('projects');
      else if (e.key === '4') navigateTo('contact');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigateTo]);

  return (
    <div className="app-shell">
      {/* Main Single-Screen Split Terminal Stage */}
      <main className="main-stage" id="main-content" tabIndex={-1}>
        <SplitTerminalHome 
          activeView={activeView}
          onNavigate={navigateTo}
        />
      </main>

      {/* Floating Bottom Command Dock (Kept as requested) */}
      <nav className="command-dock-container" role="navigation" aria-label="Command Dock">
        <div className="command-dock">
          <button
            onClick={() => navigateTo('home')}
            className={`dock-btn ${activeView === 'home' ? 'active' : ''}`}
            aria-label="Overview System Boot"
            aria-current={activeView === 'home' ? 'page' : undefined}
          >
            <Sparkles size={14} />
            <span>00_SYS_BOOT</span>
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`dock-btn ${activeView === 'about' ? 'active' : ''}`}
            aria-label="Profile and CV"
            aria-current={activeView === 'about' ? 'page' : undefined}
          >
            <Briefcase size={14} />
            <span>01_CAREER_CV</span>
          </button>

          <button
            onClick={() => navigateTo('skills')}
            className={`dock-btn ${activeView === 'skills' ? 'active' : ''}`}
            aria-label="Tech Stack and Capabilities"
            aria-current={activeView === 'skills' ? 'page' : undefined}
          >
            <Code2 size={14} />
            <span>02_TECH_STACK</span>
          </button>

          <button
            onClick={() => navigateTo('projects')}
            className={`dock-btn ${activeView === 'projects' ? 'active' : ''}`}
            aria-label="Core Engineering Systems"
            aria-current={activeView === 'projects' ? 'page' : undefined}
          >
            <FolderGit2 size={14} />
            <span>03_PROJECTS</span>
          </button>

          <button
            onClick={() => navigateTo('contact')}
            className={`dock-btn ${activeView === 'contact' ? 'active' : ''}`}
            aria-label="Direct Communication and Inquiries"
            aria-current={activeView === 'contact' ? 'page' : undefined}
          >
            <Mail size={14} />
            <span>04_INIT_COMMS</span>
          </button>
        </div>
      </nav>
    </div>
  );
};
