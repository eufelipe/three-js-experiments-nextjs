"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const checkAFrame = () => {
      if (
        typeof AFRAME !== "undefined" &&
        typeof AFRAME.registerComponent !== "undefined"
      ) {
        setIsClient(true);
      } else {
        setTimeout(checkAFrame, 100);
      }
    };

    checkAFrame();
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
        <a-scene embedded arjs="trackingMethod: best;">
          <a-marker preset="hiro">
            <a-entity
              gltf-model="/Heart.glb"
              scale="0.5 0.5 0.5"
              position="0 0.5 0"
            ></a-entity>
          </a-marker>
          <a-camera position="0 1.6 2" look-controls></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
