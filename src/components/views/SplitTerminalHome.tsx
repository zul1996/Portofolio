import React, { useState } from 'react';
import { ViewId } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { FileText, Send, Activity, ExternalLink } from 'lucide-react';

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

  const handleViewResume = () => {
    setTerminalTrigger('cat ./career_trajectory.md && open /resume.pdf');
    onNavigate('about');
    window.open('/resume.pdf', '_blank');
  };

  return (
    <div className="terminal-split-stage" role="region" aria-label="Terminal Split Stage">
      {/* Left Column: Personal Profile & Verified Backend Systems Identity */}
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
            <span>Backend Developer &amp; IT Infrastructure Specialist</span>
            <span className="blinking-underscore">_</span>
          </div>

          {/* 4. Domain / Capability Badges from Verified CV */}
          <div className="terminal-tag-row">
            <span className="terminal-tag">[ SPRING_BOOT_3 ]</span>
            <span className="terminal-tag">[ KOTLIN ]</span>
            <span className="terminal-tag">[ KAFKA_REDIS ]</span>
            <span className="terminal-tag">[ KUBERNETES_RKE ]</span>
          </div>

          {/* 5. Statement / Blockquote from Real Experience */}
          <div className="terminal-statement-box">
            <span className="statement-prompt-symbol">&gt;</span>
            <p className="statement-text">
              Engineering enterprise-grade core financing systems &amp; national-scale BUMN architectures using Kotlin, Spring Boot 3, Kafka event pipelines, and cloud container infrastructure.
            </p>
          </div>
        </div>

        {/* 6. Action Command Buttons (init_contact, view_resume, inspect_stack) */}
        <div className="terminal-actions-group">
          <div className="actions-buttons-row">
            <button
              className="term-btn-primary"
              onClick={() => handleActionClick('contact', './init_contact.sh --address zul.indranto@gmail.com')}
              aria-label="Initialize Contact Sequence"
            >
              <Send size={13} />
              <span>init_contact()</span>
            </button>

            <button
              className="term-btn-secondary"
              onClick={handleViewResume}
              aria-label="View Career Resume PDF"
            >
              <FileText size={13} />
              <span>view_resume<span className="text-highlight">.pdf</span></span>
              <ExternalLink size={11} style={{ opacity: 0.6 }} />
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
            <span>{personal.email} &bull; Sidoarjo, Jawa Timur (UTC+07) &bull; 4+ Yrs Proven</span>
          </div>
        </div>
      </div>

      {/* Right Column: Authentic Interactive Terminal Window with Live Typing */}
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
