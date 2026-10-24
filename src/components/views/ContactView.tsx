import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { 
  Copy, 
  Check, 
  Mail, 
  Send, 
  ArrowUpRight,
  Clock,
  MapPin
} from 'lucide-react';
import { IconGithub, IconLinkedin, IconTwitter } from '../Icons';

export const ContactView: React.FC = () => {
  const { personal, social } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    }).catch(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2600);
    });
  };

  return (
    <div className="view-container">
      <div className="contact-view">
        {/* Left Column: Direct Inquiries & Copy Email */}
        <div className="contact-left">
          <div className="eyebrow-tag">
            <span>DIRECT CHANNELS & INQUIRIES</span>
          </div>

          <h2 className="contact-headline">
            Let's discuss systems, architecture, or technical advisory.
          </h2>

          <p className="contact-subtext">
            I am available for high-leverage software architecture consultation, modular framework implementation, and hardened local-first systems. Reach out directly via email or preferred channels.
          </p>

          <div className="email-action-box" role="region" aria-label="Direct Email Channel">
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '4px', textTransform: 'uppercase' }}>
                Primary Direct Address
              </div>
              <div className="email-display-text">{personal.email}</div>
            </div>

            <div className="email-actions-group">
              <button 
                className="btn-copy"
                onClick={handleCopyEmail}
                aria-label="Copy email address to clipboard"
              >
                {copied ? <Check size={14} color="var(--color-green-dark)" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={`mailto:${personal.email}?subject=Technical%20Inquiry%20via%20Portfolio`}
                className="btn-primary"
                style={{ padding: '7px 14px', fontSize: '12.5px' }}
                aria-label="Open native mail client"
              >
                <Mail size={14} aria-hidden="true" />
                <span>Mail Client</span>
              </a>
            </div>
          </div>

          {copied && (
            <div className="copy-feedback-toast" role="status" aria-live="polite">
              <Check size={14} color="var(--color-green-dark)" />
              <span>Email address copied to your clipboard.</span>
            </div>
          )}
        </div>

        {/* Right Column: Availability & Verified Channels */}
        <div className="contact-right">
          <div className="contact-card-info">
            <div className="info-row">
              <span className="info-label">Current Availability</span>
              <span className="info-val" style={{ color: 'var(--color-green-dark)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="status-pulse-dot" />
                Available &bull; Q4 2026
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">Location & Timezone</span>
              <span className="info-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={13} color="var(--color-green)" />
                {personal.location} &bull; {personal.timezone}
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">Expected Response</span>
              <span className="info-val" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={13} color="var(--color-green)" />
                Within 24 Hours
              </span>
            </div>

            <div className="info-row">
              <span className="info-label">Consultation Scope</span>
              <span className="info-val">Architecture, Engines, Local-First</span>
            </div>
          </div>

          <div className="social-links-grid" role="region" aria-label="Social and code channels">
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="GitHub Profile"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconGithub size={15} color="var(--color-green)" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </a>
            )}

            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="LinkedIn Profile"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconLinkedin size={15} color="var(--color-green)" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </a>
            )}

            {social.telegram && (
              <a
                href={social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Telegram Direct"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Send size={15} color="var(--color-green)" />
                  <span>Telegram</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </a>
            )}

            {social.twitter && (
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Twitter Profile"
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconTwitter size={15} color="var(--color-green)" />
                  <span>X / Twitter</span>
                </div>
                <ArrowUpRight size={14} color="var(--text-muted)" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
