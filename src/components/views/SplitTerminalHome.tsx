import React, { useState } from 'react';
import { ViewId } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { FileText, Send, Activity } from 'lucide-react';

interface SplitTerminalHomeProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export const SplitTerminalHome: React.FC<SplitTerminalHomeProps> = ({
  activeView,
  onNavigate
}) => {
  const { personal } = portfolioData;
  const [terminalTrigger, setTerminalTrigger] = useState<string | null>(null);

  const handleActionClick = (targetView: ViewId, customCommand?: string) => {
    if (customCommand) {
      setTerminalTrigger(customCommand);
    }
    onNavigate(targetView);
  };

  return (
    <div className="terminal-split-stage" role="region" aria-label="Terminal Split Stage">
      {/* Left Column: Personal Profile & Systems Builder Identity */}
      <div className="terminal-left-column">
        <div>
          {/* 1. System Status Badge */}
          <div className="sys-status-pill">
            <span className="status-pulse-dot" />
            <span className="sys-status-text">SYSTEM.STATUS: ONLINE</span>
          </div>

          {/* 2. Main Name Headline */}
          <h1 className="terminal-main-name">
            {personal.name}
          </h1>

          {/* 3. Sub-headline with Terminal Cursor */}
          <div className="terminal-sub-title">
            <span>Systems Builder & Framework Architect</span>
            <span className="blinking-underscore">_</span>
          </div>

          {/* 4. Domain / Capability Badges */}
          <div className="terminal-tag-row">
            <span className="terminal-tag">[ ZERO_BOILERPLATE ]</span>
            <span className="terminal-tag">[ POSTGRESQL_16 ]</span>
            <span className="terminal-tag">[ MONOTONIC_SEC ]</span>
          </div>

          {/* 5. Statement / Blockquote */}
          <div className="terminal-statement-box">
            <span className="statement-prompt-symbol">&gt;</span>
            <p className="statement-text">
              Executing zero-property decorator metadata inference &amp; building tamper-resistant local-first enterprise systems.
            </p>
          </div>
        </div>

        {/* 6. Action Command Buttons (init_contact, view_resume, inspect_telemetry) */}
        <div className="terminal-actions-group">
          <div className="actions-buttons-row">
            <button
              className="term-btn-primary"
              onClick={() => handleActionClick('contact', './init_contact.sh --recipient zul@atharis.dev')}
              aria-label="Initialize Contact Sequence"
            >
              <Send size={13} />
              <span>init_contact()</span>
            </button>

            <button
              className="term-btn-secondary"
              onClick={() => handleActionClick('about', 'cat ./career_trajectory.md')}
              aria-label="View Career Resume"
            >
              <FileText size={13} />
              <span>view_resume<span className="text-highlight">.pdf</span></span>
            </button>

            <button
              className="term-btn-secondary"
              onClick={() => handleActionClick('skills', './inspect_tech_stack.sh --production')}
              aria-label="Inspect Systems Tech Stack"
            >
              <Activity size={13} />
              <span>inspect_stack()</span>
            </button>
          </div>

          <div className="terminal-sys-meta">
            <span>root@atharis.dev &bull; Jakarta, UTC+07:00 &bull; 8+ Yrs Proven</span>
          </div>
        </div>
      </div>

      {/* Right Column: Authentic Interactive Terminal Window */}
      <div className="terminal-right-column">
        <InteractiveTerminal 
          activeView={activeView}
          onNavigate={onNavigate}
          terminalCommandTrigger={terminalTrigger}
        />
      </div>
    </div>
  );
};
