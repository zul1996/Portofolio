import React, { useEffect } from 'react';
import { portfolioData } from '../../data/portfolio';
import { 
  ArrowLeft, 
  ArrowRight, 
  ExternalLink, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { IconGithub } from '../Icons';

interface ProjectsViewProps {
  selectedProjectId: string | null;
  onSelectProject: (id: string | null) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  selectedProjectId,
  onSelectProject
}) => {
  const { projects } = portfolioData;

  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;
  const currentIndex = selectedProject ? projects.findIndex(p => p.id === selectedProject.id) : 0;

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % projects.length;
    onSelectProject(projects[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (currentIndex - 1 + projects.length) % projects.length;
    onSelectProject(projects[prevIdx].id);
  };

  // Keyboard navigation for projects (Left, Right, Escape)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProjectId) return;
      if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === 'Escape') {
        onSelectProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProjectId, currentIndex]);

  // Code snippets illustrating project architecture
  const projectCodeSnippets: Record<string, string> = {
    'atharis-core': `// Zero-Property Decorator Schema Inference
@Entity('subscriptions')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  customerEmail: string;

  @Column({ type: 'timestamptz' })
  expiresAt: Date;
}
// -> Auto-infers REST endpoints, validations,
//    and dynamic GraphQL schema with 0 boilerplate.`,

    'monotonic-sentinel': `// Monotonic Clock Watermark Protection
function verifyLeaseTimestamp(dbWatermark: number, clientClock: number): boolean {
  if (clientClock < dbWatermark) {
    // Clock rollback or time tamper detected
    triggerSecurityLockout({ reason: 'CLOCK_ROLLBACK_ATTEMPT' });
    return false;
  }
  updateSecureWatermark(clientClock);
  return verifyHmacSignature(clientClock);
}`,

    'turnstile-access-iot': `// Resilient Offline Turnstile Gate Relay
async function onRfidBadgeScanned(badgeUid: string): Promise<GateResult> {
  // Query ultra-fast local SQLite edge cache (<5ms)
  const member = await localEdgeDb.findMemberByBadge(badgeUid);
  if (!member || !member.isActive) {
    return { openGate: false, status: 'DENIED' };
  }
  // Relay gate open trigger via MQTT & queue async cloud sync
  await gateController.pulseRelay(150);
  offlineSyncQueue.enqueue({ event: 'CHECK_IN', badgeUid });
  return { openGate: true, status: 'GRANTED' };
}`
  };

  return (
    <div className="view-container">
      <div className="projects-view">
        {/* View Header */}
        <div className="view-header">
          <div className="view-heading-group">
            <h2 className="view-title">Selected Systems & Works</h2>
            <p className="view-subtitle">
              Resilient enterprise foundations, security sentinel engines, and offline-first IoT platforms.
            </p>
          </div>

          <div className="view-controls">
            {selectedProject ? (
              <button 
                className="btn-icon-nav"
                onClick={() => onSelectProject(null)}
                aria-label="Back to all projects overview"
              >
                <ArrowLeft size={14} aria-hidden="true" />
                <span>All Projects (Esc)</span>
              </button>
            ) : (
              <span className="project-num" style={{ fontFamily: 'var(--font-mono)' }}>
                Showing 3 of 3 Core Systems
              </span>
            )}
          </div>
        </div>

        {/* Dynamic Display: Grid or Focused Detail */}
        {!selectedProject ? (
          <div className="projects-grid" role="region" aria-label="Projects overview grid">
            {projects.slice(0, 3).map((project, index) => (
              <button
                key={project.id}
                className="project-card"
                onClick={() => onSelectProject(project.id)}
                aria-label={`View details for ${project.title}`}
              >
                <div className="project-card-top">
                  <div className="project-badge-row">
                    <span className="project-category-badge">{project.category}</span>
                    <span className="project-num">0{index + 1}</span>
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-summary">{project.summary}</p>
                </div>

                <div className="project-card-bottom">
                  <div className="tech-tag-list">
                    {project.stack.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>

                  <div className="project-card-footer">
                    <span>Inspect Specs</span>
                    <ArrowRight size={14} aria-hidden="true" />
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          /* Focused Detail View */
          <div className="project-detail-layout" role="region" aria-label={`Project details for ${selectedProject.title}`}>
            <div className="detail-left">
              <div>
                <div className="detail-meta-header">
                  <span className="project-category-badge">{selectedProject.category}</span>
                  <span className="project-num" style={{ fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
                    0{currentIndex + 1} / 0{projects.length}
                  </span>
                  {selectedProject.metrics && (
                    <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}>
                      &bull; {selectedProject.metrics}
                    </span>
                  )}
                </div>

                <h3 className="detail-title">{selectedProject.title}</h3>

                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '14px' }}>
                  {selectedProject.summary}
                </p>

                <div className="detail-block-row">
                  <div className="detail-block">
                    <div className="detail-block-label">The Problem</div>
                    <div className="detail-block-text">{selectedProject.problem}</div>
                  </div>

                  <div className="detail-block">
                    <div className="detail-block-label">The Architecture</div>
                    <div className="detail-block-text">{selectedProject.solution}</div>
                  </div>
                </div>

                <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    ROLE:
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {selectedProject.role}
                  </span>
                </div>

                <div className="tech-tag-list" style={{ marginTop: '10px' }}>
                  {selectedProject.stack.map(tech => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              {/* Bottom Actions and Navigation */}
              <div className="detail-actions">
                <div className="detail-links">
                  {selectedProject.demoUrl && (
                    <a
                      href={selectedProject.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                      aria-label="Open live application"
                    >
                      <span>Live Site</span>
                      <ExternalLink size={13} aria-hidden="true" />
                    </a>
                  )}

                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary"
                      style={{ padding: '6px 14px', fontSize: '12px' }}
                      aria-label="View source repository"
                    >
                      <IconGithub size={13} color="currentColor" />
                      <span>Repository</span>
                    </a>
                  )}
                </div>

                <div className="detail-pagination">
                  <button 
                    className="btn-icon-nav"
                    onClick={handlePrev}
                    aria-label="Previous project"
                  >
                    <ArrowLeft size={13} aria-hidden="true" />
                    <span>Prev</span>
                  </button>

                  <button 
                    className="btn-icon-nav"
                    onClick={handleNext}
                    aria-label="Next project"
                  >
                    <span>Next</span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side: Architecture & Code Spec Window */}
            <div className="detail-right">
              <div className="preview-mock-window">
                <div className="mock-window-bar">
                  <div className="mock-dots">
                    <span className="mock-dot" />
                    <span className="mock-dot" />
                    <span className="mock-dot" />
                  </div>
                  <span>spec://{selectedProject.id}.arch</span>
                  <Sparkles size={13} color="var(--color-green)" aria-hidden="true" />
                </div>

                <div className="mock-window-body">
                  <pre className="mock-code-box">
                    <code>{projectCodeSnippets[selectedProject.id] || '// System specification loaded'}</code>
                  </pre>

                  {selectedProject.metrics && (
                    <div className="mock-metrics-badge">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Check size={14} color="var(--color-green-dark)" />
                        <span>Verified Performance:</span>
                      </div>
                      <span style={{ fontWeight: 600 }}>{selectedProject.metrics}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
