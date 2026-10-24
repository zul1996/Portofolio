import React, { useState } from 'react';
import { ViewId } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { InteractiveTerminal } from '../InteractiveTerminal';
import { 
  FileText, 
  Send, 
  Activity, 
  ExternalLink, 
  Mail, 
  Check, 
  Copy 
} from 'lucide-react';
import { IconGithub, IconLinkedin } from '../Icons';

interface SplitTerminalHomeProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
}

export const SplitTerminalHome: React.FC<SplitTerminalHomeProps> = ({
  activeView,
  onNavigate
}) => {
  const { personal, social } = portfolioData;
  const [terminalTrigger, setTerminalTrigger] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleActionClick = (targetView: ViewId, customCommand?: string) => {
    if (customCommand) {
      setTerminalTrigger(customCommand);
    }
    onNavigate(targetView);
  };

  const handleContactDirect = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
    handleActionClick('contact', './init_contact.sh --address zul.indranto@gmail.com');
    // Open mail client directly
    window.location.href = `mailto:${personal.email}?subject=Backend%20Engineering%20/%20Architecture%20Inquiry`;
  };

  const handleCopyOnly = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
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

          {/* 2. Full Name Headline: Muhammad Zulkarnaen Indranto */}
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

        {/* 6. Quick Action Command Buttons */}
        <div className="terminal-actions-group">
          <div className="actions-buttons-row">
            <button
              className="term-btn-primary"
              onClick={handleContactDirect}
              aria-label="Direct Contact via Email"
              title="Click to copy email and open mail client"
            >
              <Send size={13} />
              <span>init_contact()</span>
            </button>

            <button
              className="term-btn-secondary"
              onClick={handleViewResume}
              aria-label="View Career Resume PDF"
              title="Open full PDF CV in new tab"
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

          {/* 7. Direct Clickable Contact Channels Strip */}
          <div className="direct-contact-strip" role="region" aria-label="Direct Channels">
            <a 
              href={`mailto:${personal.email}?subject=Backend%20Engineering%20Inquiry`} 
              className="contact-channel-pill"
              title="Send Direct Email"
            >
              <Mail size={12} color="#00FF9D" />
              <span>{personal.email}</span>
            </a>

            <button 
              onClick={handleCopyOnly} 
              className="contact-copy-icon-btn" 
              title="Copy Email to Clipboard"
              aria-label="Copy Email"
            >
              {copied ? <Check size={11} color="#00FF9D" /> : <Copy size={11} />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            {social.linkedin && (
              <a 
                href={social.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-channel-pill"
                title="Open LinkedIn Profile"
              >
                <IconLinkedin size={12} color="#00FF9D" />
                <span>LinkedIn</span>
                <ExternalLink size={10} style={{ opacity: 0.6 }} />
              </a>
            )}

            {social.github && (
              <a 
                href={social.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="contact-channel-pill"
                title="Open GitHub Profile"
              >
                <IconGithub size={12} color="#00FF9D" />
                <span>GitHub</span>
                <ExternalLink size={10} style={{ opacity: 0.6 }} />
              </a>
            )}
          </div>

          <div className="terminal-sys-meta">
            <span>Sidoarjo, Jawa Timur (UTC+07) &bull; 4+ Yrs Enterprise Experience &bull; Fast Response</span>
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
