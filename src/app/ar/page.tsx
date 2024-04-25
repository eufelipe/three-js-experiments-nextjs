"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof AFRAME !== "undefined") {
      AFRAME.registerComponent("zoom", {
        schema: {
          speed: { type: "number", default: 1 },
        },
        init: function () {
          this.handleWheel = this.handleWheel.bind(this);
          window.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          window.removeEventListener("wheel", this.handleWheel);
        },
        handleWheel: function (event: any) {
          event.preventDefault();
          let zoomAmount = event.deltaY * -0.01 * this.data.speed;
          let camPos = this.el.getAttribute("position");
          camPos.z += zoomAmount;
          this.el.setAttribute("position", camPos);
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

          <a-marker preset="hiro">
            <a-entity
              gltf-model="url(/Heart.glb)"
              scale="0.5 0.5 0.5"
              animation="property: rotation; to: 0 360 0; loop: true; dur: 10000"
              event-set__1="_event: mouseenter; scale: 1 1 1"
              event-set__2="_event: mouseleave; scale: 0.5 0.5 0.5"
            ></a-entity>
          </a-marker>

          <a-camera
            position="0 1.6 2"
            look-controls="pointerLockEnabled: true"
            zoom="speed: 0.5"
          ></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
