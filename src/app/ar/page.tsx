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
        <a-scene embedded arjs="sourceType: webcam; debugUIEnabled: false;">
          <a-marker preset="hiro">
            <a-entity
              gltf-model="/Heart.gltf"
              scale="2 2 2"
              position="0 0.5 0"
              rotation="0 180 0"
            ></a-entity>
          </a-marker>
          <a-camera></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
