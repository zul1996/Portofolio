import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { portfolioData } from '../data/portfolio';
import { ViewId } from '../types';
import { 
  X, 
  Check, 
  Compass, 
  Briefcase, 
  Code2, 
  FolderGit2, 
  Mail, 
  ChevronRight
} from 'lucide-react';
import { IconGithub, IconLinkedin, IconTwitter } from './Icons';

interface TechIsland3DProps {
  onNavigate: (view: ViewId) => void;
}

type SectorId = 'cv' | 'skills' | 'projects' | 'contact';

function createSoftShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(256, 256, 30, 256, 256, 240);
  gradient.addColorStop(0, 'rgba(24, 34, 28, 0.28)');
  gradient.addColorStop(0.5, 'rgba(24, 34, 28, 0.10)');
  gradient.addColorStop(0.85, 'rgba(24, 34, 28, 0.02)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 512, 512);

  return new THREE.CanvasTexture(canvas);
}

export const TechIsland3D: React.FC<TechIsland3DProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSector, setActiveSector] = useState<SectorId | null>(null);
  const [hoveredSector, setHoveredSector] = useState<SectorId | null>(null);
  const [copied, setCopied] = useState(false);
  const [loadingModel, setLoadingModel] = useState(true);

  // Target camera state for smooth lerping (Elevated 45° isometric view - unobstructed)
  const targetCamPos = useRef(new THREE.Vector3(4.5, 4.4, 4.5));
  const currentCamPos = useRef(new THREE.Vector3(4.5, 4.4, 4.5));
  const targetCamLook = useRef(new THREE.Vector3(0, -0.2, 0));
  const currentCamLook = useRef(new THREE.Vector3(0, -0.2, 0));

  const selectSector = useCallback((sector: SectorId | null) => {
    setActiveSector(sector);
    if (!sector) {
      targetCamPos.current.set(4.5, 4.4, 4.5);
      targetCamLook.current.set(0, -0.2, 0);
    } else if (sector === 'cv') {
      targetCamPos.current.set(2.4, 3.2, 2.6);
      targetCamLook.current.set(0.1, 0.6, -0.1);
    } else if (sector === 'skills') {
      targetCamPos.current.set(-2.8, 2.8, 2.4);
      targetCamLook.current.set(-1.4, 0.2, 0.6);
    } else if (sector === 'projects') {
      targetCamPos.current.set(2.8, 2.8, 2.4);
      targetCamLook.current.set(1.4, 0.2, 0.6);
    } else if (sector === 'contact') {
      targetCamPos.current.set(0, 2.8, 3.4);
      targetCamLook.current.set(0, 0.1, -1.2);
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Atmosphere Setup
    const skyColor = new THREE.Color(0xbfe6e1);
    const scene = new THREE.Scene();
    scene.background = skyColor;
    scene.fog = new THREE.FogExp2(0xbfe6e1, 0.025);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 200);
    camera.position.copy(currentCamPos.current);
    camera.lookAt(currentCamLook.current);

    // 2. Renderer Setup (Full viewport)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Natural Sun & Ambient Lighting
    const ambientLight = new THREE.AmbientLight(0xdcf5f0, 0.95);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x62b7ad, 0.8);
    scene.add(hemiLight);

    // Key Directional Sun
    const sunLight = new THREE.DirectionalLight(0xfffaf0, 1.7);
    sunLight.position.set(12, 18, 10);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 45;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Warm Sun Reflection & Rim Fill
    const sunRim = new THREE.DirectionalLight(0x35846c, 0.65);
    sunRim.position.set(-8, 8, -8);
    scene.add(sunRim);

    // 4. Grounding Shadow Plane
    const shadowTex = createSoftShadowTexture();
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.6;
    scene.add(shadowPlane);

    // 5. Master Voxel Island Group
    const islandGroup = new THREE.Group();
    scene.add(islandGroup);

    // 6. Interactive Raycast Beacons
    const sectorMeshes: THREE.Mesh[] = [];
    const registerClickable = (mesh: THREE.Mesh, sector: SectorId) => {
      mesh.userData = { sector };
      sectorMeshes.push(mesh);
    };

    // Helper: Create 3D Holographic Marker Anchor on the island
    const createBeaconMarker = (x: number, y: number, z: number, sector: SectorId, color: number = 0x174d33) => {
      const markerGroup = new THREE.Group();
      markerGroup.position.set(x, y, z);

      // Glowing anchor ring on water/ground
      const disc = new THREE.Mesh(
        new THREE.RingGeometry(0.12, 0.32, 32),
        new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: 0.85 })
      );
      disc.rotation.x = -Math.PI / 2;
      disc.position.y = 0.02;
      markerGroup.add(disc);

      // Vertical energy stalk
      const stalk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.02, 0.02, 0.65, 16),
        new THREE.MeshBasicMaterial({ color: 0x24734a, transparent: true, opacity: 0.75 })
      );
      stalk.position.y = 0.35;
      markerGroup.add(stalk);

      // Floating interactive crystal diamond
      const diamond = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.22, 0),
        new THREE.MeshPhysicalMaterial({
          color,
          emissive: color,
          emissiveIntensity: 0.5,
          metalness: 0.25,
          roughness: 0.1,
          transmission: 0.4
        })
      );
      diamond.position.y = 0.75;
      diamond.castShadow = true;
      registerClickable(diamond, sector);
      markerGroup.add(diamond);

      // Rotating pulse halo
      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.34, 0.02, 16, 32),
        new THREE.MeshBasicMaterial({ color: 0x55c789, transparent: true, opacity: 0.9 })
      );
      halo.rotation.x = Math.PI / 2;
      halo.position.y = 0.75;
      markerGroup.add(halo);

      islandGroup.add(markerGroup);
      return { group: markerGroup, diamond, halo };
    };

    // 4 Key Strategic Beacons Anchored across the Voxel Island
    const bCV = createBeaconMarker(0.1, 1.45, -0.2, 'cv', 0x174d33); // Village Peak
    const bSkills = createBeaconMarker(-2.3, 0.45, 1.1, 'skills', 0x24734a); // Left Workshop
    const bProjects = createBeaconMarker(2.4, 0.5, 0.9, 'projects', 0x24734a); // Right Coast
    const bContact = createBeaconMarker(-2.2, 0.25, -0.8, 'contact', 0x174d33); // Harbor Pier Waters

    // 7. Ambient Micro-Luminescent Particles
    const particleGroup = new THREE.Group();
    const particleGeo = new THREE.BoxGeometry(0.06, 0.06, 0.06);
    const particleMat = new THREE.MeshBasicMaterial({ color: 0x55c789 });

    const particles: THREE.Mesh[] = [];
    for (let i = 0; i < 28; i++) {
      const p = new THREE.Mesh(particleGeo, particleMat);
      const angle = (i / 28) * Math.PI * 2;
      const radius = 3.2 + (i % 3) * 0.7;
      p.position.set(
        Math.cos(angle) * radius,
        0.5 + Math.sin(i * 1.6) * 0.9,
        Math.sin(angle) * radius
      );
      particleGroup.add(p);
      particles.push(p);
    }
    islandGroup.add(particleGroup);

    // 8. Load the Little Voxel Island GLB Asset
    const loader = new GLTFLoader();
    loader.load(
      '/little_voxel_island.glb',
      (gltf) => {
        const model = gltf.scene;

        // Auto-center and normalize scale
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const targetScale = 8.5 / maxDim;
        model.scale.setScalar(targetScale);
        model.position.sub(center.clone().multiplyScalar(targetScale));

        // Enable shadows on all voxel blocks
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        islandGroup.add(model);
        setLoadingModel(false);
      },
      undefined,
      (err) => {
        console.error('Error loading voxel island:', err);
        setLoadingModel(false);
      }
    );

    // 9. Raycasting and Pointer Interactions
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const getSectorUnderMouse = (e: MouseEvent): SectorId | null => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(sectorMeshes, true);
      if (hits.length > 0) {
        return (hits[0].object.userData.sector as SectorId) || null;
      }
      return null;
    };

    const onPointerMove = (e: MouseEvent) => {
      const sector = getSectorUnderMouse(e);
      if (sector) {
        renderer.domElement.style.cursor = 'pointer';
        setHoveredSector(sector);
      } else {
        renderer.domElement.style.cursor = 'grab';
        setHoveredSector(null);
      }
    };

    const onPointerClick = (e: MouseEvent) => {
      const sector = getSectorUnderMouse(e);
      if (sector) {
        selectSector(sector);
      }
    };

    // User drag orbit
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e: MouseEvent) => {
      if (getSectorUnderMouse(e)) return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
      renderer.domElement.style.cursor = 'grabbing';
    };

    const onWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;

      islandGroup.rotation.y += deltaX * 0.007;
      targetCamPos.current.y = THREE.MathUtils.clamp(
        targetCamPos.current.y + deltaY * 0.014,
        2.0,
        9.0
      );

      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onWindowMouseUp = () => {
      isDragging = false;
    };

    renderer.domElement.addEventListener('mousemove', onPointerMove);
    renderer.domElement.addEventListener('click', onPointerClick);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onWindowMouseMove);
    window.addEventListener('mouseup', onWindowMouseUp);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // 10. Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Camera lerp
      currentCamPos.current.lerp(targetCamPos.current, 0.055);
      currentCamLook.current.lerp(targetCamLook.current, 0.055);
      camera.position.copy(currentCamPos.current);
      camera.lookAt(currentCamLook.current);

      // Natural gentle floating bob of island if idle
      if (!isDragging && !activeSector) {
        islandGroup.position.y = Math.sin(t * 1.1) * 0.07;
        islandGroup.rotation.y += 0.0018;
      }

      // Beacon halo & diamond rotations
      bCV.diamond.rotation.y = t * 1.4;
      bCV.halo.rotation.z = -t * 1.2;

      bSkills.diamond.rotation.y = -t * 1.2;
      bSkills.halo.rotation.z = t * 1.5;

      bProjects.diamond.rotation.y = t * 1.3;
      bProjects.halo.rotation.z = -t * 1.1;

      bContact.diamond.rotation.y = -t * 1.5;
      bContact.halo.rotation.z = t * 1.3;

      // Orbiting voxel particles
      particleGroup.rotation.y = t * 0.15;
      particles.forEach((p, idx) => {
        p.position.y += Math.sin(t * 2 + idx) * 0.0015;
        p.rotation.x += 0.01;
        p.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onWindowMouseMove);
      window.removeEventListener('mouseup', onWindowMouseUp);
      renderer.domElement.removeEventListener('mousemove', onPointerMove);
      renderer.domElement.removeEventListener('click', onPointerClick);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      shadowTex.dispose();
    };
  }, [selectSector, activeSector]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  const sectorLabels: Record<SectorId, { title: string; hint: string }> = {
    cv: { title: 'Citadel Peak & Career Architecture', hint: '8+ Yrs Framework Architect • Atharis Core' },
    skills: { title: 'Engineering Workshop & Capabilities', hint: 'PostgreSQL 16 • TypeORM • Node.js • Go' },
    projects: { title: 'Production Sentinel & Outpost', hint: 'Atharis Engine • Monotonic Sentinel • Gym POS' },
    contact: { title: 'Harbor Beacon & Consultation', hint: 'Direct Inquiry • Q4 2026 Availability' }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {/* 3D Full-bleed Canvas */}
      <div 
        ref={containerRef} 
        style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      />

      {/* Hover Inspection Tooltip (Top Right) */}
      {hoveredSector && !activeSector && (
        <div 
          style={{
            position: 'absolute',
            top: 20,
            right: 24,
            background: 'rgba(24, 34, 28, 0.88)',
            backdropFilter: 'blur(8px)',
            color: '#FFFFFF',
            fontFamily: 'var(--font-mono)',
            fontSize: '11.5px',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
            pointerEvents: 'none',
            animation: 'fadeIn 160ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            zIndex: 15
          }}
        >
          <Compass size={13} color="#55c789" />
          <span>Click to inspect: {sectorLabels[hoveredSector].title}</span>
        </div>
      )}

      {/* Floating 3D Sector Hotspot Pins on the Voxel Island */}
      {!activeSector && !loadingModel && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>
          {/* Top Peak: CV */}
          <div 
            style={{
              position: 'absolute',
              top: '20%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto'
            }}
          >
            <button
              onClick={() => selectSector('cv')}
              className="topology-node"
              style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}
              title="Click to view CV and Career Experience"
            >
              <Briefcase size={14} color="var(--color-green)" />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>01. Profile & Experience (CV)</span>
              <span className="project-category-badge" style={{ fontSize: '9px' }}>8+ Yrs</span>
            </button>
          </div>

          {/* Left Terrace: Skills */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              left: '18%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'auto'
            }}
          >
            <button
              onClick={() => selectSector('skills')}
              className="topology-node"
              style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}
              title="Click to inspect Tech Stack and Capabilities"
            >
              <Code2 size={14} color="var(--color-green)" />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>02. Tech Stack & Engineering</span>
              <span className="project-category-badge" style={{ fontSize: '9px' }}>16 Techs</span>
            </button>
          </div>

          {/* Right Outpost: Projects */}
          <div 
            style={{
              position: 'absolute',
              top: '50%',
              right: '18%',
              transform: 'translate(50%, -50%)',
              pointerEvents: 'auto'
            }}
          >
            <button
              onClick={() => selectSector('projects')}
              className="topology-node"
              style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}
              title="Click to inspect Core Projects"
            >
              <FolderGit2 size={14} color="var(--color-green)" />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>03. Core Systems & Specs</span>
              <span className="project-category-badge" style={{ fontSize: '9px' }}>3 Live</span>
            </button>
          </div>

          {/* Harbor Pier: Contact */}
          <div 
            style={{
              position: 'absolute',
              bottom: '12%',
              left: '26%',
              transform: 'translate(-50%, 0)',
              pointerEvents: 'auto'
            }}
          >
            <button
              onClick={() => selectSector('contact')}
              className="topology-node"
              style={{
                padding: '6px 14px',
                background: 'rgba(255,255,255,0.92)',
                backdropFilter: 'blur(8px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                border: '1px solid rgba(255,255,255,0.8)'
              }}
              title="Click to view Contact and Direct Consultation"
            >
              <Mail size={14} color="var(--color-green)" />
              <span style={{ fontSize: '12px', fontWeight: 600 }}>04. Direct Inquiries & Comms</span>
              <span className="project-category-badge" style={{ fontSize: '9px' }}>Available Q4</span>
            </button>
          </div>
        </div>
      )}

      {/* Bottom Sector Dock Bar */}
      <div 
        style={{
          position: 'absolute',
          bottom: 16,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
          zIndex: 20
        }}
      >
        <div 
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 24px -4px rgba(24, 34, 28, 0.14)',
            padding: '5px 8px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            pointerEvents: 'auto'
          }}
          role="navigation"
          aria-label="3D Sector Dock"
        >
          <button
            onClick={() => selectSector(null)}
            className={`category-tab-btn ${!activeSector ? 'active' : ''}`}
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            Orbit Reset
          </button>

          <button
            onClick={() => selectSector('cv')}
            className={`category-tab-btn ${activeSector === 'cv' ? 'active' : ''}`}
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            01. CV / Experience
          </button>

          <button
            onClick={() => selectSector('skills')}
            className={`category-tab-btn ${activeSector === 'skills' ? 'active' : ''}`}
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            02. Tech Stack
          </button>

          <button
            onClick={() => selectSector('projects')}
            className={`category-tab-btn ${activeSector === 'projects' ? 'active' : ''}`}
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            03. Systems
          </button>

          <button
            onClick={() => selectSector('contact')}
            className={`category-tab-btn ${activeSector === 'contact' ? 'active' : ''}`}
            style={{ padding: '5px 12px', fontSize: '12px' }}
          >
            04. Contact
          </button>
        </div>
      </div>

      {/* Rich Interactive Information Drawer (Slide-in) */}
      {activeSector && (
        <div 
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            bottom: 60,
            width: 'clamp(360px, 34vw, 480px)',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-light)',
            boxShadow: '0 16px 48px -10px rgba(24, 34, 28, 0.22)',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            zIndex: 40,
            animation: 'detailFadeIn 220ms var(--ease-editorial) forwards'
          }}
          role="dialog"
          aria-modal="true"
        >
          {/* Drawer Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-light)' }}>
            <div>
              <span className="project-category-badge" style={{ fontSize: '10px' }}>
                {activeSector === 'cv' && 'SECTOR 01 // CAREER & RESUME'}
                {activeSector === 'skills' && 'SECTOR 02 // TECHNICAL STACK'}
                {activeSector === 'projects' && 'SECTOR 03 // PRODUCTION ENGINES'}
                {activeSector === 'contact' && 'SECTOR 04 // DIRECT COMMS'}
              </span>
              <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                {sectorLabels[activeSector].title}
              </h3>
            </div>

            <button
              onClick={() => selectSector(null)}
              className="btn-icon-nav"
              style={{ padding: '4px 8px', fontSize: '11px' }}
              aria-label="Close sector drawer"
            >
              <span>Back (Esc)</span>
              <X size={14} />
            </button>
          </div>

          {/* Drawer Scrollable Content */}
          <div style={{ flex: 1, minHeight: 0, overflowY: 'auto', padding: '16px 0' }}>
            {/* 1. CV Sector */}
            {activeSector === 'cv' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-main)' }}>
                    {portfolioData.personal.name}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--color-green-dark)', fontWeight: 500, margin: '2px 0 6px 0' }}>
                    {portfolioData.personal.title}
                  </div>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {portfolioData.about.lead}
                  </p>
                </div>

                <div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: '8px', textTransform: 'uppercase' }}>
                    Track Record & Key Positions
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {portfolioData.about.experience.map((exp, idx) => (
                      <div key={idx} style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-green)' }}>
                          <span>{exp.period}</span>
                          <span>{exp.location}</span>
                        </div>
                        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)', marginTop: '2px' }}>
                          {exp.role}
                        </div>
                        <div style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{exp.company}</div>
                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. Skills Sector */}
            {activeSector === 'skills' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Production-verified stack powering high-throughput backend services, local-first offline clients, and database architectures.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {portfolioData.skills.map((cat) => (
                    <div key={cat.id} style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '12px' }}>
                      <div style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--color-green-dark)', marginBottom: '8px' }}>
                        {cat.name}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                        {cat.items.map((it) => (
                          <span key={it.name} className="tech-tag" style={{ fontSize: '10.5px', background: '#FFFFFF' }}>
                            {it.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Projects Sector */}
            {activeSector === 'projects' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)' }}>
                  Selected engineering systems built for resilience, zero-boilerplate data mapping, and offline security.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {portfolioData.projects.map((p, idx) => (
                    <div 
                      key={p.id}
                      style={{ 
                        background: 'var(--bg-secondary)', 
                        border: '1px solid var(--border-light)', 
                        borderRadius: 'var(--radius-md)', 
                        padding: '12px',
                        cursor: 'pointer',
                        transition: 'border-color 160ms ease'
                      }}
                      onClick={() => onNavigate('projects')}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-main)' }}>
                          0{idx + 1}. {p.title}
                        </span>
                        <span className="project-category-badge" style={{ fontSize: '9px' }}>{p.category}</span>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.4' }}>
                        {p.summary}
                      </p>
                      {p.metrics && (
                        <div style={{ marginTop: '6px', fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--color-green-dark)' }}>
                          &bull; {p.metrics}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Contact Sector */}
            {activeSector === 'contact' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                  Available for select software architecture consultation, modular enterprise frameworks, and hardened local-first deployments.
                </p>

                <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
                  <div style={{ fontSize: '10.5px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Direct Email Channel
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 600, color: 'var(--text-main)', margin: '4px 0 10px 0' }}>
                    {portfolioData.personal.email}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      className="btn-copy"
                      onClick={handleCopyEmail}
                      style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px', padding: '6px' }}
                    >
                      {copied ? <Check size={13} /> : null}
                      <span>{copied ? 'Copied to Clipboard!' : 'Copy Email'}</span>
                    </button>

                    <a 
                      href={`mailto:${portfolioData.personal.email}?subject=Technical%20Consultation%20Inquiry`}
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center', fontSize: '11.5px', padding: '6px' }}
                    >
                      <Mail size={13} />
                      <span>Mail Client</span>
                    </a>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {portfolioData.social.github && (
                    <a href={portfolioData.social.github} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px 12px', fontSize: '12px' }}>
                      <IconGithub size={14} color="var(--color-green)" />
                      <span>GitHub</span>
                    </a>
                  )}
                  {portfolioData.social.linkedin && (
                    <a href={portfolioData.social.linkedin} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px 12px', fontSize: '12px' }}>
                      <IconLinkedin size={14} color="var(--color-green)" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                  {portfolioData.social.telegram && (
                    <a href={portfolioData.social.telegram} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px 12px', fontSize: '12px' }}>
                      <IconTwitter size={14} color="var(--color-green)" />
                      <span>Telegram</span>
                    </a>
                  )}
                  {portfolioData.social.twitter && (
                    <a href={portfolioData.social.twitter} target="_blank" rel="noopener noreferrer" className="social-btn" style={{ padding: '8px 12px', fontSize: '12px' }}>
                      <IconTwitter size={14} color="var(--color-green)" />
                      <span>X / Twitter</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer Actions */}
          <div style={{ paddingTop: '12px', borderTop: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              Press ESC to dismiss
            </span>

            <button
              className="btn-primary"
              style={{ fontSize: '12px', padding: '6px 14px' }}
              onClick={() => {
                const targetView = activeSector === 'cv' ? 'about' : activeSector;
                onNavigate(targetView as ViewId);
              }}
            >
              <span>Explore Full {activeSector.toUpperCase()} View</span>
              <ChevronRight size={13} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
