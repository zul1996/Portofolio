import React, { useState } from 'react';
import { portfolioData } from '../../data/portfolio';
import { Layers, Terminal, Database, Shield, Layout } from 'lucide-react';

export const SkillsView: React.FC = () => {
  const { skills } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categoryIcons: Record<string, React.ReactNode> = {
    backend: <Terminal size={14} />,
    architecture: <Database size={14} />,
    infrastructure: <Shield size={14} />,
    frontend: <Layout size={14} />
  };

  const filteredCategories = selectedCategory === 'all'
    ? skills
    : skills.filter(cat => cat.id === selectedCategory);

  return (
    <div className="view-container">
      <div className="skills-view">
        {/* Header with category selector */}
        <div className="view-header">
          <div className="view-heading-group">
            <h2 className="view-title">Technical Capabilities & Stack</h2>
            <p className="view-subtitle">
              Demonstrated competencies across systems engineering, database internals, and modern web architectures.
            </p>
          </div>

          <div className="skills-category-tabs" role="tablist" aria-label="Skill categories">
            <button
              className={`category-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
              role="tab"
              aria-selected={selectedCategory === 'all'}
            >
              All Domains
            </button>
            {skills.map((cat) => (
              <button
                key={cat.id}
                className={`category-tab-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat.id)}
                role="tab"
                aria-selected={selectedCategory === cat.id}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Matrix Grid */}
        <div className="skills-matrix-grid" role="region" aria-label="Technical skills matrix">
          {filteredCategories.map((cat) => (
            <div key={cat.id} className="skill-category-card">
              <div>
                <div className="skill-card-header">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-green)' }}>
                      {categoryIcons[cat.id] || <Layers size={14} />}
                    </span>
                    <span className="skill-cat-title">{cat.name}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '10.5px', color: 'var(--text-muted)' }}>
                    {cat.items.length} TECHNOLOGIES
                  </span>
                </div>

                <div className="skill-item-list">
                  {cat.items.map((item) => (
                    <div key={item.name} className="skill-item-row">
                      <div className="skill-name-col">
                        <span className="skill-name">{item.name}</span>
                        <span className="skill-item-desc">{item.description}</span>
                      </div>

                      <div style={{ display: 'flex', gap: '4px' }}>
                        {item.tags.map(t => (
                          <span key={t} className="skill-tag-pill">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '8px', borderTop: '1px solid var(--border-light)', display: 'flex', justifyContent: 'flex-end', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                Production-proven &bull; Zero fluff
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
