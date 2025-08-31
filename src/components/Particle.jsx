import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim"; 

export default function Particle() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: true, zIndex: -1 },
        background: {
          color: "#0f172a", 
        },
        particles: {
          number: {
            value: 50,
          },
          color: {
            value: "#38bdf8", 
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.5,
          },
          size: {
            value: { min: 2, max: 6 },
          },
          move: {
            enable: true,
            speed: 2,
          },
          links: {
            enable: true,
            distance: 150,
            color: "#38bdf8",
            opacity: 0.3,
            width: 1,
          },
        },
        detectRetina: true,
      }}
    />
  );
}
