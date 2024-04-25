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
          this.handleWheel = (event: any) => {
            event.preventDefault();
            const zoomAmount = event.deltaY * -0.01 * this.data.speed;
            const camPos = this.el.object3D.position;
            camPos.z += zoomAmount;
            this.el.object3D.position.set(camPos.x, camPos.y, camPos.z);
          };
          this.el.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          this.el.removeEventListener("wheel", this.handleWheel);
        },
      });
    }
  }, []);

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
        onLoad={() => {
          if (!isClient) setIsClient(true);
        }}
        strategy="beforeInteractive"
      />
      <Script
        src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"
        strategy="beforeInteractive"
      />
      {isClient && (
        <a-scene>
          <a-marker preset="hiro">
            <a-entity
              gltf-model="/Heart.glb"
              position="0 0.5 0"
              scale="0.5 0.5 0.5"
            ></a-entity>
          </a-marker>
          <a-camera position="0 1.6 2" look-controls></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
