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
      'identity: Muhammad Zulkarnaen Indranto',
      'role: Backend Developer & IT Infrastructure Specialist',
      'proven_track: 4+ Years Enterprise Backend & Systems Engineering',
      'active_stack: [Kotlin, Spring Boot 3, Kafka, Redis, Docker, Kubernetes]',
      'database_cluster: PostgreSQL & MySQL [ONLINE]',
      'major_achievement: Built national BUMN enterprise credit core from scratch',
      'location: Sidoarjo, Jawa Timur, Indonesia',
      'status: AVAILABLE FOR HIGH-IMPACT BACKEND ROLES',
      'ready. Click bottom menu [00-04] or action buttons to inspect.'
    ]
  },
  about: {
    command: 'cat ./career_trajectory.md',
    lines: [
      'reading professional experience & verified CV...',
      '[██████████████████████] 100%',
      '========================================================================',
      '● PT DWIDASA SAMASARA INDONESIA | Surabaya, ID',
      '  Jul 2024 — Present • Backend Developer',
      '  - Jamkrindo System (PT Jaminan Kredit Indonesia):',
      '    * Built national BUMN core credit guarantee app from scratch',
      '    * Stack: Kotlin, Spring Boot 3, Kafka, Redis, Docker, Kubernetes',
      '  - Nexus Platform (Fortress Data Services):',
      '    * Core financing & credit ops management backend with Kafka streams',
      '------------------------------------------------------------------------',
      '● PT FORTRESS DATA SERVICES | Jakarta Pusat, ID',
      '  Apr 2024 — Jul 2024 • Core Banking Systems Training (Temenos Transact)',
      '  - Specialized in Temenos Transact modules: Customer Management, Accounts,',
      '    Teller, Loan Management, General Ledger, T24/jBASE, & FinCloud',
      '------------------------------------------------------------------------',
      '● PT BUANA MEGAH PAPER MILLS | Pasuruan, ID',
      '  Jul 2023 — Apr 2024 • IT Support & Infrastructure',
      '  - Maintained server hardware, enterprise LAN network & minimized downtime',
      '------------------------------------------------------------------------',
      '● PT BEST PROFIT FUTURES | Surabaya, ID',
      '  Mar 2021 — Aug 2022 • IT Support & Systems',
      '  - Continuous network support, troubleshooting & company web optimization',
      '------------------------------------------------------------------------',
      '● UNIVERSITAS MUHAMMADIYAH SIDOARJO | Sidoarjo, ID',
      '  Jan 2014 — Dec 2018 • Bachelor Degree in Informatics (GPA 3.49 / 4.00)',
      '========================================================================',
      '> verified: 4+ years delivering national-scale resilient systems'
    ]
  },
  skills: {
    command: './inspect_tech_stack.sh --production',
    lines: [
      'auditing runtime competencies, frameworks & tools...',
      '[██████████████████████] 100%',
      '[BACKEND FRAMEWORKS & RUNTIMES]',
      '  + Kotlin & Spring Boot 3 (Core financing & BUMN enterprise microservices)',
      '  + Java & C# (Enterprise server services & OOP architectures)',
      '  + NodeJS, NestJS & ExpressJS (Asynchronous microservices & API gateways)',
      '  + PHP & Laravel (Modular MVC backends & rapid domain services)',
      '[DATABASES & MESSAGE BROKERS]',
      '  + PostgreSQL & MySQL (Complex schemas, JSONB, transaction isolation)',
      '  + Apache Kafka (High-throughput asynchronous message stream pipelines)',
      '  + Redis (In-memory caching, atomic distributed locks, rate-limiting)',
      '  + Microsoft SQL Server (Stored procedures, relational administration)',
      '[DEVOPS, INFRASTRUCTURE & BANKING]',
      '  + Docker & Kubernetes (RKE container cluster orchestration)',
      '  + GitLab CI/CD & Git (Automated regression testing, deployment pipelines)',
      '  + Linux / Ubuntu (Systemd services, network diagnostics, bash automation)',
      '  + Temenos Transact (T24/jBASE core banking modules & FinCloud)',
      '[FRONTEND & DESIGN TOOLS]',
      '  + TypeScript, JavaScript, HTML5 & Modern CSS',
      '  + Figma, Photoshop & Illustrator (UI/UX design & vector assets)',
      '> all competencies production-verified across active projects.'
    ]
  },
  projects: {
    command: 'ls -la ./flagship_projects/ && cat specs.json',
    lines: [
      'fetching flagship enterprise system specifications...',
      '[██████████████████████] 100%',
      '[01] JAMKRINDO ENTERPRISE SYSTEM (PT Jaminan Kredit Indonesia)',
      '     Category: BUMN Core Architecture (National Scale)',
      '     Role: Core Backend Developer',
      '     Stack: Kotlin • Spring Boot 3 • Kafka • Redis • Docker • K8s',
      '     Scope: Built from scratch for nationwide multi-branch credit management',
      '     Metrics: Zero critical downtime across nationwide branch deployments',
      '------------------------------------------------------------------------',
      '[02] NEXUS PLATFORM (Fortress Data Services)',
      '     Category: Core Financing & Credit Operations',
      '     Role: Backend Systems Developer',
      '     Stack: Kotlin • Spring Boot 3 • PostgreSQL • Kafka • Redis • GitLab',
      '     Scope: High-throughput core financing with sub-second async processing',
      '     Metrics: Sub-second asynchronous credit stream processing with clean code',
      '------------------------------------------------------------------------',
      '[03] ATHARIS MODULAR BUSINESS CORE',
      '     Category: Framework Architecture & Local-First Licensing',
      '     Role: Framework Architect & Engine Developer',
      '     Stack: TypeScript • Node.js • TypeORM • PostgreSQL • Linux',
      '     Scope: Zero-property decorator metadata inference & monotonic sentinel',
      '     Metrics: Sub-5ms query hydration, 60% less boilerplate code'
    ]
  },
  contact: {
    command: './init_contact.sh --address zul.indranto@gmail.com',
    lines: [
      'opening direct communication channel...',
      '[██████████████████████] 100%',
      '------------------------------------------------------------------------',
      'Direct Email: zul.indranto@gmail.com',
      'Location:     Sidoarjo, Jawa Timur, Indonesia',
      'Timezone:     UTC+07:00 (WIB)',
      'Response SLA: Within 24 Hours guaranteed',
      'Scope:        Backend Engineering, Spring Boot, Kotlin, Cloud Infra',
      '------------------------------------------------------------------------',
      'Verified Communication & Profile Channels:',
      '  [1] GitHub:   https://github.com/zul1996',
      '  [2] LinkedIn: https://www.linkedin.com/in/muhammad-zulkarnaen-indranto/',
      '  [3] Telegram: https://t.me/zul1996',
      '  [4] Resume:   /resume.pdf (Available for direct view/download)',
      '------------------------------------------------------------------------',
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
    let typeTimer: ReturnType<typeof setInterval> | null = null;
    let lineTimer: ReturnType<typeof setInterval> | null = null;

    const script = TERMINAL_SCRIPTS[activeView];
    const fullCommand = terminalCommandTrigger || script.command;
    const linesToOutput = script.lines || [];

    setDisplayedLines([]);
    setTypedCommand('');
    setIsTyping(true);

    let charIndex = 0;
    typeTimer = setInterval(() => {
      if (!active) return;
      if (charIndex < fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, charIndex + 1));
        charIndex++;
      } else {
        if (typeTimer) clearInterval(typeTimer);

        let lineIndex = 0;
        lineTimer = setInterval(() => {
          if (!active) return;
          if (lineIndex < linesToOutput.length) {
            const nextLine = linesToOutput[lineIndex];
            if (nextLine !== undefined) {
              setDisplayedLines(prev => [...prev, nextLine]);
            }
            lineIndex++;
            if (terminalBodyRef.current) {
              terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
            }
          } else {
            if (lineTimer) clearInterval(lineTimer);
            setIsTyping(false);
          }
        }, 18);
      }
    }, 10);

    return () => {
      active = false;
      if (typeTimer) clearInterval(typeTimer);
      if (lineTimer) clearInterval(lineTimer);
    };
  }, [activeView, terminalCommandTrigger]);

  // Click terminal to instantly finish typing animation if still running
  const handleTerminalClick = () => {
    if (isTyping) {
      const script = TERMINAL_SCRIPTS[activeView];
      setTypedCommand(terminalCommandTrigger || script.command);
      setDisplayedLines(script.lines || []);
      setIsTyping(false);
    }
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    setInputVal('');
    if (!cmd) return;

    if (cmd === 'clear' || cmd === 'cls') {
      setDisplayedLines([]);
      return;
    }
    if (cmd === 'help') {
      setDisplayedLines(prev => [
        ...prev,
        '> help',
        'SYSTEM COMMAND MATRIX:',
        '  github   / gh      - Open https://github.com/zul1996 in new tab',
        '  linkedin / in      - Open LinkedIn profile in new tab',
        '  resume   / pdf     - Open verified CV /resume.pdf in new tab',
        '  01_cv    / about   - View full career experience & education',
        '  02_stack / skills  - Audit backend frameworks & cloud tools',
        '  03_proj  / systems - Inspect Jamkrindo, Nexus & Atharis engines',
        '  04_comms / contact - Direct contact & copy zul.indranto@gmail.com',
        '  00_boot  / home    - System initialization diagnostic',
        '  clear              - Wipe terminal buffer'
      ]);
      return;
    }
    if (cmd === 'github' || cmd === 'gh') {
      window.open('https://github.com/zul1996', '_blank');
      setDisplayedLines(prev => [...prev, '> github', '>> Navigating to https://github.com/zul1996 in new tab...']);
      return;
    }
    if (cmd === 'linkedin' || cmd === 'in') {
      window.open('https://www.linkedin.com/in/muhammad-zulkarnaen-indranto/', '_blank');
      setDisplayedLines(prev => [...prev, '> linkedin', '>> Navigating to LinkedIn profile in new tab...']);
      return;
    }
    if (cmd === 'resume' || cmd === 'pdf' || cmd === 'cv.pdf') {
      window.open('/resume.pdf', '_blank');
      setDisplayedLines(prev => [...prev, '> view_resume.pdf', '>> Opening /resume.pdf in new tab...']);
      return;
    }
    if (cmd === '01' || cmd === '1' || cmd.includes('about') || cmd === 'cv') {
      onNavigate('about');
      return;
    }
    if (cmd === '02' || cmd === '2' || cmd.includes('skill') || cmd.includes('stack')) {
      onNavigate('skills');
      return;
    }
    if (cmd === '03' || cmd === '3' || cmd.includes('proj') || cmd.includes('system')) {
      onNavigate('projects');
      return;
    }
    if (cmd === '04' || cmd === '4' || cmd.includes('contact') || cmd.includes('email') || cmd === 'mail') {
      onNavigate('contact');
      return;
    }
    if (cmd === '00' || cmd === '0' || cmd === 'boot' || cmd === 'home') {
      onNavigate('home');
      return;
    }

    setDisplayedLines(prev => [
      ...prev,
      `> ${cmd}`,
      `command not recognized: "${cmd}". Type "help" or try: github, linkedin, resume, 01, 02, 03, 04, clear`
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
          if (!line || typeof line !== 'string') return null;
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
              placeholder="try: github, linkedin, resume, 01_cv, 02_stack, help, clear..."
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
