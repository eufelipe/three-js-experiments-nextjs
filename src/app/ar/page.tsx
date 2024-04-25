"use client";

import Head from "next/head";

const Ar = () => {
  return (
    <>
      <Head>
        <script src="https://aframe.io/releases/1.2.0/aframe.min.js"></script>
        <script src="https://jeromeetienne.github.io/AR.js/aframe/build/aframe-ar.js"></script>
      </Head>
      <a-scene embedded arjs="sourceType: webcam;">
        <a-marker preset="hiro">
          <a-entity
            fbx-model="url(/Heart.fbx)"
            scale="0.5 0.5 0.5"
            rotation="-90 0 0"
          ></a-entity>
        </a-marker>
        <a-entity camera></a-entity>
      </a-scene>
    </>
  );
};

export default Ar;
