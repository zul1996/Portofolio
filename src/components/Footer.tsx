import React from 'react';
import { portfolioData } from '../data/portfolio';
import { Send } from 'lucide-react';
import { IconGithub, IconLinkedin, IconTwitter } from './Icons';

export const Footer: React.FC = () => {
  const { personal, social } = portfolioData;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer" role="contentinfo">
      <div className="footer-left">
        <span>&copy; {currentYear} {personal.name}. All systems nominal.</span>
        <span>&bull;</span>
        <span>{personal.location} &bull; {personal.timezone}</span>
      </div>

      <div className="footer-right">
        <span className="footer-nav-hint">Fixed Viewport Shell &bull; Shortcuts [1-5]</span>
        
        {social.github && (
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="GitHub Profile"
          >
            <IconGithub size={15} />
          </a>
        )}

        {social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="LinkedIn Profile"
          >
            <IconLinkedin size={15} />
          </a>
        )}

        {social.twitter && (
          <a
            href={social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Twitter Profile"
          >
            <IconTwitter size={15} />
          </a>
        )}

        {social.telegram && (
          <a
            href={social.telegram}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-social-link"
            aria-label="Telegram Profile"
          >
            <Send size={15} />
          </a>
        )}
      </div>
    </footer>
  );
};
