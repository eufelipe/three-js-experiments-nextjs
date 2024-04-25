"use client";

import { Html, OrbitControls, useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState } from "react";
import { Vector3 } from "three";

interface TooltipProps {
  position: Vector3;
  text: string;
  visible: boolean;
}

const Tooltip = ({ position, text, visible }: TooltipProps) => {
  return (
    <Html
      position={position}
      zIndexRange={[100, 0]}
      style={{ display: visible ? "block" : "none" }}
    >
      <div
        style={{
          color: "white",
          background: "rgba(0, 0, 0, 0.8)",
          padding: "6px 10px",
          borderRadius: "8px",
        }}
      >
        {text}
      </div>
    </Html>
  );
};

interface BulletPointProps {
  position: [number, number, number];
  text: string;
}

const BulletPoint = ({ position, text }: BulletPointProps) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <>
      <mesh
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Outer sphere (border) */}
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshBasicMaterial color="black" />

        {/* Inner sphere (actual bullet point) */}
        <mesh position={position}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color={hovered ? "yellow" : "white"} />
        </mesh>
      </mesh>
      <Tooltip
        position={new Vector3(...position).add(new Vector3(0, 0.2, 0))}
        text={text}
        visible={hovered}
      />
    </>
  );
};

function ModeloFBX() {
  const fbx = useFBX("/Heart.fbx");
  return (
    <>
      <primitive object={fbx} scale={0.01} />
      <BulletPoint position={[1, 0.5, 1]} text="Ventrículo Esquerdo" />
      <BulletPoint position={[-1, 0.5, -1]} text="Átrio Direito" />
    </>
  );
}

const Home = () => {
  return (
    <div style={{ height: "100vh", width: "100vw", background: "white" }}>
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={Math.PI / 2} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            decay={0}
            intensity={Math.PI}
          />
          <pointLight
            position={[-10, -10, -10]}
            decay={0}
            intensity={Math.PI}
          />
          <ModeloFBX />
          <OrbitControls enableZoom={true} zoomSpeed={0.6} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Home;
