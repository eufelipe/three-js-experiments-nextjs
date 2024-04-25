"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof AFRAME !== "undefined") {
      AFRAME.registerComponent("wheel-zoom", {
        init: function () {
          this.zoom = 1;
          this.handleWheel = this.handleWheel.bind(this);
          this.el.sceneEl.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          this.el.sceneEl.removeEventListener("wheel", this.handleWheel);
        },
        handleWheel: function (event: any) {
          event.preventDefault();
          const delta = -event.deltaY * 0.01;
          this.zoom += delta;
          this.zoom = Math.max(0.1, Math.min(10, this.zoom));
          this.el.setAttribute("camera", "zoom", this.zoom);
        },
      });
    }
  }, []);

  return (
    <>
      <Head>
        <title>AR Experience</title>
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
        <a-scene>
          <a-light type="ambient" color="#555"></a-light>
          <a-light type="point" intensity="1" position="1 2 3"></a-light>
          <a-light type="point" intensity="1" position="-1 2 -3"></a-light>
          <a-light type="point" intensity="1" position="0 3 0"></a-light>
          <a-entity
            gltf-model="/Heart.gltf"
            position="0 0.5 -2"
            scale="0.001 0.001 0.001"
            zoom-control
          ></a-entity>
          <a-camera
            wheel-zoom
            position="0 1.6 0"
            look-controls-enabled="true"
          ></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
