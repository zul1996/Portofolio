import React, { useState } from 'react';
import { ViewId } from '../../types';
import { portfolioData } from '../../data/portfolio';
import { 
  ArrowRight, 
  Compass, 
  Mail, 
  Copy, 
  Check, 
  Terminal, 
  Cpu, 
  ExternalLink 
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (view: ViewId) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const { personal, projects, about } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const featuredProject = projects[0];

  return (
    <div className="view-container">
      <div className="bento-stage" role="region" aria-label="Bento Command Stage">
        
        {/* Card 1: Main Identity & Strategic Value (Hero Bento Card) */}
        <div className="bento-card bento-hero">
          <div className="bento-hero-top">
            <div className="eyebrow-tag">
              <span>usr@atharis:~$ sys --info</span>
            </div>

            <div className="status-badge-inline">
              <span className="status-pulse-dot" />
              <span>[ONLINE] Q4 2026 Consultation</span>
            </div>
          </div>

          <div className="bento-hero-content">
            <h1 className="bento-headline">
              {personal.headline}
            </h1>
            <p className="bento-subheadline">
              {personal.subheadline}
            </p>
          </div>

          <div className="bento-hero-footer">
            <div className="bento-identity">
              <span className="bento-name">{personal.name}</span>
              <span className="bento-title">&bull; {personal.title}</span>
            </div>

            <button 
              className="btn-primary"
              onClick={() => onNavigate('projects')}
              style={{ padding: '8px 18px', fontSize: '13px' }}
            >
              <span>Explore 3 Flagship Systems</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Card 2: Live Operational Telemetry & Verified Metrics */}
        <div className="bento-card bento-telemetry">
          <div className="bento-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={14} color="#22C55E" />
              <span className="bento-header-label">TELEMETRY://METRICS</span>
            </div>
            <span className="project-category-badge" style={{ fontSize: '9px' }}>[VERIFIED]</span>
          </div>

          <div className="telemetry-grid">
            <div className="telemetry-box">
              <span className="telemetry-num">Sub-5ms</span>
              <span className="telemetry-desc">TypeORM query hydration</span>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-num">100%</span>
              <span className="telemetry-desc">Monotonic tamper sentinel</span>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-num">8+ Yrs</span>
              <span className="telemetry-desc">Production systems delivery</span>
            </div>
            <div className="telemetry-box">
              <span className="telemetry-num">60% Less</span>
              <span className="telemetry-desc">Scaffolding boilerplate</span>
            </div>
          </div>

          <div className="telemetry-footer-bar">
            <span>Core: PostgreSQL 16 &bull; TypeORM &bull; Docker</span>
          </div>
        </div>

        {/* Card 3: Flagship Architecture Spotlight (Code Spec) */}
        <div 
          className="bento-card bento-spotlight"
          onClick={() => onNavigate('projects')}
          role="button"
          tabIndex={0}
          aria-label="Inspect Atharis Core Engine architecture"
        >
          <div className="bento-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={14} color="#22C55E" />
              <span className="bento-header-label">REPO://ATHARIS_CORE</span>
            </div>
            <span className="project-category-badge" style={{ fontSize: '9px' }}>
              {featuredProject.category}
            </span>
          </div>

          <div className="spotlight-body">
            <h3 className="spotlight-title">{featuredProject.title}</h3>
            <p className="spotlight-summary">{featuredProject.summary}</p>

            <pre className="spotlight-code-snippet">
              <code>{`// Zero-Decorator Inference
@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'timestamptz' }) expiresAt: Date;
}
// -> Auto-synthesizes REST & GraphQL`}</code>
            </pre>
          </div>

          <div className="bento-action-row">
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-green-dark)' }}>
              Click to inspect technical specs
            </span>
            <ExternalLink size={13} color="var(--color-green)" />
          </div>
        </div>

        {/* Card 4: Engineering Principles & Philosophy */}
        <div 
          className="bento-card bento-principles"
          onClick={() => onNavigate('about')}
          role="button"
          tabIndex={0}
          aria-label="Read engineering principles and career trajectory"
        >
          <div className="bento-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={14} color="#22C55E" />
              <span className="bento-header-label">SPEC://PHILOSOPHY</span>
            </div>
            <span className="project-category-badge" style={{ fontSize: '9px' }}>3 Tenets</span>
          </div>

          <div className="principles-mini-list">
            {about.principles.map((pr, idx) => (
              <div key={idx} className="principle-mini-item">
                <span className="principle-mini-num">0{idx + 1}</span>
                <div>
                  <div className="principle-mini-title">{pr.title}</div>
                  <div className="principle-mini-desc">{pr.description}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="bento-action-row">
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-green-dark)' }}>
              Read full experience timeline (8+ Yrs)
            </span>
            <ArrowRight size={13} color="var(--color-green)" />
          </div>
        </div>

        {/* Card 5: Fast Inquiries & Direct Channels */}
        <div className="bento-card bento-comms">
          <div className="bento-card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Mail size={14} color="#22C55E" />
              <span className="bento-header-label">COMMS://DIRECT_CHANNEL</span>
            </div>
            <span className="project-category-badge" style={{ fontSize: '9px' }}>24h Response</span>
          </div>

          <div className="comms-body">
            <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Primary Address
            </div>
            <div className="comms-email-text">{personal.email}</div>

            <div className="comms-btn-group">
              <button 
                className="btn-copy"
                onClick={handleCopyEmail}
                style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px', padding: '6px' }}
                aria-label="Copy email address"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? 'Copied!' : 'Copy Email'}</span>
              </button>

              <a 
                href={`mailto:${personal.email}?subject=Systems%20Architecture%20Inquiry`}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px', padding: '6px' }}
                aria-label="Open native email client"
              >
                <Mail size={13} />
                <span>Mail Client</span>
              </a>
            </div>
          </div>

          <div className="bento-action-row" onClick={() => onNavigate('contact')}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              {personal.location} &bull; {personal.timezone}
            </span>
            <span style={{ fontSize: '11px', color: 'var(--color-green)', fontWeight: 500 }}>
              All Channels &rarr;
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};
