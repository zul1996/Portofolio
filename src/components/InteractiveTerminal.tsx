import React, { useState, useEffect, useRef } from 'react';
import { ViewId } from '../types';

interface InteractiveTerminalProps {
  activeView: ViewId;
  onNavigate: (view: ViewId) => void;
  terminalCommandTrigger?: string | null;
}

interface TerminalCommand {
  command: string;
  lines: string[];
}

const TERMINAL_SCRIPTS: Record<ViewId, TerminalCommand> = {
  home: {
    command: 'system.boot()',
    lines: [
      'initializing core_kernel...',
      '[██████████████████████] 100%',
      'identity: Zul (Systems Architect & Engine Dev)',
      'status: AVAILABLE FOR Q4 2026 CONSULTATION',
      'core_modules: [zero_boilerplate, monotonic_sec, local_first]',
      'database: PostgreSQL 16 cluster [ONLINE]',
      'sentinel: Monotonic watermark active [NO_TAMPER]',
      'establishing encrypted session...',
      'ready. Click menu below or type commands to execute.'
    ]
  },
  about: {
    command: 'cat ./career_trajectory.md',
    lines: [
      'loading professional trajectory & milestones...',
      '[██████████████████████] 100%',
      '====================================================',
      '● PRINCIPAL SYSTEMS ARCHITECT | Atharis Ecosystem',
      '  2023 — Present • Hybrid',
      '  - Designed zero-property decorator metadata engine',
      '  - Sub-5ms query hydration, eliminated 60% boilerplate',
      '  - Built pluggable audit sink & multi-tenant RBAC',
      '----------------------------------------------------',
      '● SR. BACKEND & INFRA ENGINEER | Distributed Tech Group',
      '  2021 — 2023 • Jakarta, ID',
      '  - Engineered high-concurrency payment gateway & Kafka bus',
      '  - Authored monotonic license sentinel with HMAC challenge',
      '----------------------------------------------------',
      '● SOFTWARE SOLUTIONS ENGINEER | CloudCore Systems',
      '  2018 — 2021 • Remote',
      '  - Deployed IoT access turnstiles with <120ms relay latency',
      '====================================================',
      'proven track record: 8+ years resilient enterprise delivery'
    ]
  },
  skills: {
    command: './inspect_tech_stack.sh --production',
    lines: [
      'auditing runtime capabilities & dependencies...',
      '[██████████████████████] 100%',
      '[CORE & BACKEND]',
      '  + Node.js & TypeScript (Strict types, event loop optimization)',
      '  + Go / Golang (High-throughput daemons & crypto utils)',
      '  + REST & GraphQL (Stateless contract-first API layers)',
      '  + Fastify & Express (Low-overhead schema validation)',
      '[ARCHITECTURE & DATA]',
      '  + PostgreSQL 16 (JSONB indexing, partitioning, tuning)',
      '  + TypeORM & Relational SQL (Zero-decorator inference)',
      '  + Redis (Atomic distributed locks, pub/sub, caches)',
      '[INFRASTRUCTURE & SECURITY]',
      '  + Docker & Containerization (Multi-stage builds)',
      '  + Linux & On-Premises (Systemd service daemons, edge nodes)',
      '  + Cryptography & Licensing (Monotonic watermarks, HMAC)',
      '16 core technologies verified in production environments.'
    ]
  },
  projects: {
    command: 'ls -la ./flagship_projects/ && cat specs.json',
    lines: [
      'fetching production architecture specifications...',
      '[██████████████████████] 100%',
      '[01] ATHARIS CORE ENGINE (Enterprise Framework)',
      '     Role: Lead Architect & Engine Developer',
      '     Stack: TypeScript • TypeORM • PostgreSQL • Docker',
      '     Metrics: Sub-5ms query hydration, 60% less boilerplate',
      '     Spec: Zero-property decorator reflection with auto REST/GQL',
      '----------------------------------------------------',
      '[02] MONOTONIC LEASE SENTINEL (Security & Licensing)',
      '     Role: Systems & Security Engineer',
      '     Stack: Go • PostgreSQL • HMAC-SHA256 • Linux',
      '     Metrics: 100% offline clock tamper rollback detection',
      '     Spec: Encrypted relational watermarks + HMAC challenge',
      '----------------------------------------------------',
      '[03] PRECISION GYM POS & IOT (Local-First Facility)',
      '     Role: Full-Stack & Embedded IoT Integrator',
      '     Stack: React • Fastify • SQLite • MQTT • WebSockets',
      '     Metrics: <120ms badge-to-gate turnstile relay latency'
    ]
  },
  contact: {
    command: './init_contact.sh --address zul@atharis.dev',
    lines: [
      'establishing secure comms channel...',
      '[██████████████████████] 100%',
      '----------------------------------------------------',
      'Primary Email: zul@atharis.dev',
      'Timezone:      UTC+07:00 (Jakarta, Indonesia)',
      'Expected SLA:  Within 24 Hours guaranteed',
      'Scope:         Systems Architecture, Frameworks, Local-First',
      '----------------------------------------------------',
      'Verified Direct Channels:',
      '  [1] GitHub:   https://github.com',
      '  [2] LinkedIn: https://linkedin.com',
      '  [3] Telegram: https://t.me',
      '  [4] Twitter:  https://x.com',
      '>> Email address copied to clipboard buffer!'
    ]
  }
};

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({
  activeView,
  onNavigate,
  terminalCommandTrigger
}) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [typedCommand, setTypedCommand] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  // Play script typing animation whenever activeView changes or terminalCommandTrigger fires
  useEffect(() => {
    let active = true;
    const script = TERMINAL_SCRIPTS[activeView];
    const fullCommand = terminalCommandTrigger || script.command;
    const linesToOutput = script.lines;

    setDisplayedLines([]);
    setTypedCommand('');
    setIsTyping(true);

    // Fast typing: 15ms per character
    let charIndex = 0;
    const typeInterval = setInterval(() => {
      if (!active) return;
      if (charIndex < fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);

        // Stream lines quickly: 25ms per line
        let lineIndex = 0;
        const lineInterval = setInterval(() => {
          if (!active) return;
          if (lineIndex < linesToOutput.length) {
            setDisplayedLines(prev => [...prev, linesToOutput[lineIndex]]);
            lineIndex++;
            if (terminalBodyRef.current) {
              terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }
          } else {
            clearInterval(lineInterval);
            setIsTyping(false);
          }
        }, 25);
      }
    }, 12);

    return () => {
      active = false;
      clearInterval(typeInterval);
    };
  }, [activeView, terminalCommandTrigger]);

  // Click terminal to instantly finish typing animation if still running
  const handleTerminalClick = () => {
    if (isTyping) {
      const script = TERMINAL_SCRIPTS[activeView];
      setTypedCommand(terminalCommandTrigger || script.command);
      setDisplayedLines(script.lines);
      setIsTyping(false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    setInputVal('');
    if (!cmd) return;

    if (cmd === 'clear') {
      setDisplayedLines([]);
      return;
    }
    if (cmd.includes('about') || cmd.includes('cv') || cmd === '1') {
      onNavigate('about');
      return;
    }
    if (cmd.includes('skill') || cmd.includes('stack') || cmd === '2') {
      onNavigate('skills');
      return;
    }
    if (cmd.includes('proj') || cmd.includes('system') || cmd === '3') {
      onNavigate('projects');
      return;
    }
    if (cmd.includes('contact') || cmd.includes('email') || cmd === '4') {
      onNavigate('contact');
      return;
    }
    if (cmd === 'home' || cmd === 'help' || cmd === '0') {
      onNavigate('home');
      return;
    }

    setDisplayedLines(prev => [
      ...prev,
      `> ${cmd}`,
      `command not recognized: "${cmd}". Available: 01_about, 02_stack, 03_projects, 04_contact, clear`
    ]);
  };

  return (
    <div className="terminal-window-chassis" role="region" aria-label="Interactive Shell Terminal">
      {/* Terminal Title Bar (macOS style dots) */}
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        <div className="terminal-title-text">
          <span>root@zul-arch: ~/{activeView === 'home' ? 'system' : activeView}</span>
        </div>

        <div className="terminal-status-icons" aria-hidden="true">
          <span className="terminal-bars" />
          <span className="terminal-bars" />
          <span className="terminal-bars" />
        </div>
      </div>

      {/* Terminal Output Body */}
      <div className="terminal-body" ref={terminalBodyRef} onClick={handleTerminalClick}>
        <div className="terminal-command-line">
          <span className="terminal-prompt-char">&gt;</span>
          <span className="terminal-typed-cmd">{typedCommand}</span>
          {isTyping && <span className="terminal-cursor-block animate-pulse">█</span>}
        </div>

        {displayedLines.map((line, idx) => {
          const isProgressBar = line.includes('███');
          const isHeading = line.startsWith('●') || line.startsWith('===');
          const isTag = line.startsWith('[') && line.endsWith(']');
          const isDivider = line.startsWith('---');

          return (
            <div 
              key={idx} 
              className={`terminal-log-line ${isProgressBar ? 'log-progress' : ''} ${isHeading ? 'log-heading' : ''} ${isTag ? 'log-tag' : ''} ${isDivider ? 'log-divider' : ''}`}
            >
              {line}
            </div>
          );
        })}

        {/* Interactive CLI Input prompt at the end */}
        {!isTyping && (
          <form onSubmit={handleCommandSubmit} className="terminal-input-form">
            <span className="terminal-input-prompt">root@zul:~#</span>
            <input 
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type help, 01, 02, 03, 04, clear..."
              className="terminal-cli-input"
              autoFocus
              spellCheck={false}
            />
            <span className="terminal-cursor-block">█</span>
          </form>
        )}
      </div>
    </div>
  );
};
