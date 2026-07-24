import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BAR_COUNT = 26;
const BLUE = new THREE.Color("#1E9BE0");
const TEAL = new THREE.Color("#3FE0D0");

function Bars({ scrollRef }) {
  const meshRef = useRef();
  const groupRef = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phases = useMemo(
    () => Array.from({ length: BAR_COUNT }, (_, i) => (i * 2.399963) % (Math.PI * 2)),
    []
  );

  useEffect(() => {
    if (!meshRef.current) return;
    for (let i = 0; i < BAR_COUNT; i++) {
      const t = i / (BAR_COUNT - 1);
      meshRef.current.setColorAt(i, BLUE.clone().lerp(TEAL, t));
    }
    if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const scroll = scrollRef.current;
    for (let i = 0; i < BAR_COUNT; i++) {
      const x = (i - (BAR_COUNT - 1) / 2) * 0.32;
      const wave =
        Math.sin(time * 1.6 + phases[i]) * 0.5 + Math.sin(time * 0.7 + i * 0.4) * 0.3;
      const height = 0.55 + Math.abs(wave) * (1.3 + scroll.intensity * 0.7);
      dummy.position.set(x, height / 2 - 0.55, 0);
      dummy.scale.set(1, height, 1);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scroll.rotationY,
        0.08
      );
      groupRef.current.position.z = THREE.MathUtils.lerp(
        groupRef.current.position.z,
        -scroll.intensity * 0.8,
        0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[null, null, BAR_COUNT]}>
        <boxGeometry args={[0.15, 1, 0.15]} />
        <meshStandardMaterial roughness={0.35} metalness={0.15} />
      </instancedMesh>
    </group>
  );
}

export default function HeroSpectrumCanvas({ containerRef }) {
  const scrollRef = useRef({ intensity: 0, rotationY: 0 });

  useEffect(() => {
    if (!containerRef?.current) return undefined;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        scrollRef.current.intensity = self.progress;
        scrollRef.current.rotationY = self.progress * 0.6;
      },
    });

    return () => trigger.kill();
  }, [containerRef]);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 0.4, 7], fov: 42 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 4]} intensity={1.1} color="#3FE0D0" />
      <pointLight position={[-4, -2, 2]} intensity={0.8} color="#1E9BE0" />
      <Bars scrollRef={scrollRef} />
    </Canvas>
  );
}
