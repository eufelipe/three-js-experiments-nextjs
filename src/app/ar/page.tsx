"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof AFRAME !== "undefined") {
      AFRAME.registerComponent("zoom-camera", {
        schema: {
          zoomSpeed: { type: "number", default: 0.1 },
        },
        init: function () {
          this.handleWheel = (event: any) => {
            event.preventDefault();
            const delta = event.deltaY * this.data.zoomSpeed;
            const camera = this.el.object3D; // Acessa o componente da câmera
            const direction = new AFRAME.THREE.Vector3();
            this.el.object3D.getWorldDirection(direction);
            direction.multiplyScalar(delta);
            camera.position.add(direction);
          };
          this.el.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          this.el.removeEventListener("wheel", this.handleWheel);
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
            position="0 1.6 5"
            look-controls-enabled="true"
            zoom-camera="zoomSpeed: 0.5"
          ></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
