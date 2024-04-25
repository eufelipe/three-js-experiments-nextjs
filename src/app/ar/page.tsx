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
        <a-scene arjs="sourceType: webcam; debugUIEnabled: true;">
          <a-marker preset="hiro">
            <a-box position="0 0.5 0" material="color: red;"></a-box>
          </a-marker>
          <a-entity camera></a-entity>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
