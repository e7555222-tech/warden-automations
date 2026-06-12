import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const COL = {
  node: new THREE.Color('#4d8dff'),
  hot: new THREE.Color('#ffb24d'),
  cyan: new THREE.Color('#2fe6e0'),
  line: new THREE.Color('#2b6bd6'),
};

// Kamera scroll ile bu derinlik aralığında ağın içinden uçar
const CAM_START_Z = 14;
const CAM_END_Z = -26;
const FIELD_DEPTH: [number, number] = [-46, 9];

interface NetData {
  pos: Float32Array;
  col: Float32Array;
  nodes: THREE.Vector3[];
  edges: [number, number][];
  linePos: Float32Array;
}

function buildNetwork(count: number): NetData {
  const pos = new Float32Array(count * 3);
  const col = new Float32Array(count * 3);
  const nodes: THREE.Vector3[] = [];
  const [zMin, zMax] = FIELD_DEPTH;
  for (let i = 0; i < count; i++) {
    const x = (Math.random() - 0.5) * 26;
    const y = (Math.random() - 0.5) * 15;
    const z = zMin + Math.random() * (zMax - zMin);
    pos.set([x, y, z], i * 3);
    nodes.push(new THREE.Vector3(x, y, z));
    // ~14% "qualified leads" glow amber, rest blue/cyan
    const c = Math.random() < 0.14 ? COL.hot : Math.random() < 0.4 ? COL.cyan : COL.node;
    col.set([c.r, c.g, c.b], i * 3);
  }
  const edges: [number, number][] = [];
  const R = 4.6;
  for (let i = 0; i < count; i++) {
    let links = 0;
    for (let j = i + 1; j < count && links < 3; j++) {
      if (nodes[i].distanceTo(nodes[j]) < R) {
        edges.push([i, j]);
        links++;
      }
    }
  }
  const linePos = new Float32Array(edges.length * 6);
  edges.forEach((e, k) => {
    linePos.set([...nodes[e[0]].toArray(), ...nodes[e[1]].toArray()], k * 6);
  });
  return { pos, col, nodes, edges, linePos };
}

interface Packet {
  a: number;
  b: number;
  t: number;
  speed: number;
}

/** Sayfa scroll oranını (0..1) rAF dışında pasif dinleyicilerle takip eder. */
function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    let max = 1;
    const onScroll = () => {
      progress.current = Math.min(1, Math.max(0, window.scrollY / max));
    };
    const measure = () => {
      max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      onScroll();
    };
    measure();
    // içerik (lazy bölümler, fontlar) yüksekliği sonradan değiştirebilir
    const t = window.setTimeout(measure, 1500);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);
  return progress;
}

function Network({ count, packetCount, flight }: { count: number; packetCount: number; flight: boolean }) {
  const group = useRef<THREE.Group>(null);
  const net = useMemo(() => buildNetwork(count), [count]);
  const scrollTarget = useScrollProgress();
  const scroll = useRef(0);
  // canvas sits under the content layer, so read parallax from the window
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const packets = useMemo<Packet[]>(() => {
    return Array.from({ length: packetCount }, () => {
      const e = net.edges[(Math.random() * net.edges.length) | 0] || [0, 0];
      return { a: e[0], b: e[1], t: Math.random(), speed: 0.15 + Math.random() * 0.4 };
    });
  }, [net, packetCount]);

  const packetGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(Math.max(packetCount, 1) * 3), 3));
    return g;
  }, [packetCount]);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;

    // scroll'u yumuşat ve kamerayı ağın içinden uçur (reduced-motion'da sabit kalır)
    if (flight) {
      scroll.current += (scrollTarget.current - scroll.current) * Math.min(1, dt * 4);
      const s = scroll.current;
      const cam = state.camera;
      cam.position.z = CAM_START_Z + (CAM_END_Z - CAM_START_Z) * s;
      cam.position.x = Math.sin(s * Math.PI * 1.6) * 1.6 + mouse.current.x * 0.6;
      cam.position.y = Math.sin(s * Math.PI) * -1.2 + mouse.current.y * -0.4;
      cam.rotation.z = Math.sin(s * Math.PI * 2) * 0.03;
    }

    if (group.current) {
      group.current.rotation.y = Math.sin(t * 0.05) * 0.08 + mouse.current.x * 0.06;
      group.current.rotation.x = Math.cos(t * 0.04) * 0.04 + mouse.current.y * -0.04;
    }
    if (packetCount === 0) return;
    const arr = packetGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < packets.length; i++) {
      const p = packets[i];
      p.t += dt * p.speed;
      if (p.t >= 1) {
        p.t = 0;
        const e = net.edges[(Math.random() * net.edges.length) | 0] || [0, 0];
        p.a = e[0];
        p.b = e[1];
      }
      const a = net.nodes[p.a];
      const b = net.nodes[p.b];
      arr[i * 3] = a.x + (b.x - a.x) * p.t;
      arr[i * 3 + 1] = a.y + (b.y - a.y) * p.t;
      arr[i * 3 + 2] = a.z + (b.z - a.z) * p.t;
    }
    packetGeo.attributes.position.needsUpdate = true;
  });

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={COL.line} transparent opacity={0.22} blending={THREE.AdditiveBlending} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[net.pos, 3]} />
          <bufferAttribute attach="attributes-color" args={[net.col, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          transparent
          opacity={0.95}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {packetCount > 0 && (
        <points geometry={packetGeo}>
          <pointsMaterial
            size={0.22}
            color={COL.cyan}
            transparent
            opacity={0.95}
            sizeAttenuation
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      )}
    </group>
  );
}

export default function NetworkBackground() {
  const reduced =
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const small = typeof window !== 'undefined' && window.innerWidth < 760;
  // alan scroll boyunca gezildiği için eski sabit sahneden daha yoğun
  const count = small ? 150 : 320;
  const packetCount = reduced ? 0 : small ? 22 : 60;

  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 1, pointerEvents: 'none' }}
      camera={{ position: [0, 0, CAM_START_Z], fov: 60 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      {/* derinlik hissi: uzak düğümler arka plana karışır */}
      <fog attach="fog" args={['#05060a', 7, 34]} />
      <Network count={count} packetCount={packetCount} flight={!reduced} />
      <EffectComposer>
        <Bloom intensity={1.1} luminanceThreshold={0.05} luminanceSmoothing={0.5} mipmapBlur radius={0.7} />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
