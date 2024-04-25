"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const loadInterval = setInterval(() => {
      if (
        typeof AFRAME !== "undefined" &&
        AFRAME.components["zoom-camera"] === undefined
      ) {
        registerZoomComponent();
      } else if (
        typeof AFRAME !== "undefined" &&
        AFRAME.components["zoom-camera"] !== undefined
      ) {
        clearInterval(loadInterval);
        setIsClient(true);
      }
    }, 100);

    const registerZoomComponent = () => {
      AFRAME.registerComponent("zoom-camera", {
        schema: {
          zoomSpeed: { type: "number", default: 0.1 },
          minDistance: { type: "number", default: 1 },
          maxDistance: { type: "number", default: 10 },
        },
        init: function () {
          this.handleWheel = (event: any) => {
            event.preventDefault();
            const delta = event.deltaY * this.data.zoomSpeed;
            const direction = new AFRAME.THREE.Vector3();
            this.el.object3D.getWorldDirection(direction);
            direction.multiplyScalar(delta);
            const newPosition = this.el.object3D.position
              .clone()
              .add(direction);
            const distance = newPosition.length();

            if (
              distance > this.data.minDistance &&
              distance < this.data.maxDistance
            ) {
              this.el.object3D.position.copy(newPosition);
            }
          };
          this.el.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          this.el.removeEventListener("wheel", this.handleWheel);
        },
      });
    };

    return () => clearInterval(loadInterval);
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
              gltf-model="/Heart.glbf"
              position="0 0.5 0"
              scale="0.5 0.5 0.5"
            ></a-entity>
          </a-marker>
          <a-camera
            position="0 1.6 2"
            look-controls
            zoom-camera="zoomSpeed: 0.5"
          ></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
