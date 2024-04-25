"use client";

import { OrbitControls } from "@react-three/drei";
import { Canvas, useLoader } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";

export function Modelo3D({ modelPath }: any) {
  const model = useLoader(FBXLoader, modelPath);

  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <primitive object={model} scale={0.01} />
      <OrbitControls />
    </Canvas>
  );
}

export default Modelo3D;
