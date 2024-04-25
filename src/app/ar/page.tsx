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
          window.addEventListener("wheel", this.handleWheel);
        },
        remove: function () {
          window.removeEventListener("wheel", this.handleWheel);
        },
        handleWheel: function (event: any) {
          event.preventDefault();
          console.log("move");

          const scaleChange = event.deltaY * -0.0005;
          this.data.factor = Math.max(0.1, this.data.factor + scaleChange);
          this.el.setAttribute(
            "scale",
            `${this.data.factor} ${this.data.factor} ${this.data.factor}`
          );
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
        <a-scene
          embedded
          arjs="sourceType: webcam; debugUIEnabled: false;"
          vr-mode-ui="enabled: false"
          style="display: block;"
        >
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
          <a-camera position="0 1.6 0" look-controls-enabled="true"></a-camera>
        </a-scene>
      )}
    </>
  );
};

export default Ar;
