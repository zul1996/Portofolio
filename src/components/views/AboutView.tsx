import React from 'react';
import { portfolioData } from '../../data/portfolio';
import { Briefcase, Compass, CheckCircle } from 'lucide-react';

export const AboutView: React.FC = () => {
  const { about } = portfolioData;

  return (
    <div className="view-container">
      <div className="about-view">
        {/* Left Column: Background & Engineering Principles */}
        <div className="about-col-left">
          <div className="about-intro-group">
            <div className="eyebrow-tag">
              <span>ENGINEERING PHILOSOPHY</span>
            </div>

            <h2 className="about-lead">
              {about.lead}
            </h2>

            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="about-paragraph">
                {p}
              </p>
            ))}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Compass size={13} color="var(--color-green)" aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Core Working Principles
              </span>
            </div>

            <div className="principles-grid">
              {about.principles.map((pr, idx) => (
                <div key={idx} className="principle-item">
                  <div className="principle-title">{pr.title}</div>
                  <div className="principle-desc">{pr.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Experience Timeline & Milestones */}
        <div className="about-col-right">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '10px', borderBottom: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Briefcase size={14} color="var(--color-green)" aria-hidden="true" />
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                Professional Trajectory & Experience
              </h3>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>
              8+ YRS PROVEN
            </span>
          </div>

          <div className="timeline-list">
            {about.experience.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-period">{exp.period}</div>
                <div className="timeline-role">{exp.role}</div>
                <div className="timeline-company">{exp.company} &bull; {exp.location}</div>
                <div className="timeline-desc">{exp.description}</div>

                <div className="tech-tag-list" style={{ marginTop: '6px' }}>
                  {exp.technologies.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '10px 14px', background: 'var(--bg-primary)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11.5px', color: 'var(--text-muted)' }}>
            <CheckCircle size={14} color="var(--color-green)" aria-hidden="true" />
            <span>Demonstrated track record of delivering resilient, production-hardened systems.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
