"use client";

import Head from "next/head";
import Script from "next/script";
import { useEffect, useState } from "react";

const Ar = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof AFRAME !== "undefined") {
      AFRAME.registerComponent("zoom-control", {
        schema: {
          factor: { type: "number", default: 1 },
        },
        init: function () {
          this.handleWheel = this.handleWheel.bind(this);
          this.handleTouchMove = this.handleTouchMove.bind(this);
          this.handleTouchStart = this.handleTouchStart.bind(this);
          this.lastTouchDistance = null;

          window.addEventListener("wheel", this.handleWheel);
          window.addEventListener("touchmove", this.handleTouchMove);
          window.addEventListener("touchstart", this.handleTouchStart);
          window.addEventListener("touchend", () => {
            this.lastTouchDistance = null;
          });
        },
        remove: function () {
          window.removeEventListener("wheel", this.handleWheel);
          window.removeEventListener("touchmove", this.handleTouchMove);
          window.removeEventListener("touchstart", this.handleTouchStart);
          window.removeEventListener("touchend", () => {
            this.lastTouchDistance = null;
          });
        },
        handleWheel: function (event: any) {
          event.preventDefault();
          const scaleChange = event.deltaY * -0.005;
          this.data.factor = Math.max(0.1, this.data.factor + scaleChange);
          this.el.setAttribute(
            "scale",
            `${this.data.factor} ${this.data.factor} ${this.data.factor}`
          );
        },
        handleTouchStart: function (event: any) {
          if (event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            this.lastTouchDistance = Math.hypot(
              touch2.pageX - touch1.pageX,
              touch2.pageY - touch1.pageY
            );
          }
        },
        handleTouchMove: function (event: any) {
          if (event.touches.length === 2) {
            const touch1 = event.touches[0];
            const touch2 = event.touches[1];
            const currentTouchDistance = Math.hypot(
              touch2.pageX - touch1.pageX,
              touch2.pageY - touch1.pageY
            );
            if (this.lastTouchDistance) {
              const scaleChange =
                (currentTouchDistance - this.lastTouchDistance) * 0.001;
              this.data.factor = Math.max(0.1, this.data.factor + scaleChange);
              this.el.setAttribute(
                "scale",
                `${this.data.factor} ${this.data.factor} ${this.data.factor}`
              );
            }
            this.lastTouchDistance = currentTouchDistance;
          }
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
            animation="property: rotation; to: -90 360 0; loop: true; dur: 10000"
            zoom-control
          ></a-entity>
          <a-camera position="0 1.6 0" look-controls-enabled="true"></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
