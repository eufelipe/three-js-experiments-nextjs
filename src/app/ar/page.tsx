"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <Head>
        <title>AR Experience</title>
      </Head>
      <Script
        src="https://aframe.io/releases/1.2.0/aframe.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />

      {isClient && (
        <a-scene>
          <a-entity
            gltf-model="/Heart.gltf"
            position="0 0 -3"
            scale="0.5 0.5 0.5"
          ></a-entity>
          <a-camera
            look-controls-enabled="true"
            position="0 1.6 0"
            fov="80"
          ></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
