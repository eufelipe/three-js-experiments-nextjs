"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const sceneEl = document.querySelector("a-scene");
    if (sceneEl) {
      sceneEl.addEventListener("loaded", () => {
        const playButton = document.querySelector(".a-enter-vr-button");
        if (playButton && !!playButton?.parentNode) {
          playButton.parentNode.removeChild(playButton);
        }
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>AR Experience</title>

        <style jsx global>{`
          html,
          body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
            overflow: hidden;
          }
          #__next {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
          }
          a-scene {
            flex-grow: 1;
            width: 100%;
            height: 100%;
          }
          .a-enter-vr,
          .a-enter-vr-button {
            display: none !important;
          }
        `}</style>
      </Head>
      <Script
        src="https://aframe.io/releases/1.2.0/aframe.min.js"
        onLoad={() => {
          setIsClient(true);
        }}
        strategy="beforeInteractive"
      />
      <Script
        src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />

      {isClient && (
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          vr-mode-ui="enabled: false"
        >
          <a-light type="ambient" color="#555"></a-light>
          <a-light type="point" intensity="1" position="1 2 3"></a-light>
          <a-light type="point" intensity="1" position="-1 2 -3"></a-light>
          <a-light type="point" intensity="1" position="0 3 0"></a-light>
          <a-entity
            gltf-model="/Heart.gltf"
            position="0 0.5 -2"
            scale="0.001 0.001 0.001"
            animation="property: rotation; to: -90 360 0; loop: true; dur: 100000"
            zoom-control
          ></a-entity>
          <a-camera position="0 1.6 0" look-controls-enabled="true"></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
