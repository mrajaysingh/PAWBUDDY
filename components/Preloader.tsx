"use client";
import { useEffect } from "react";
import Lottie from "lottie-react";
import animationData from "./paw-preloader.json";

export default function Preloader() {
  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.body.style.overflow = "hidden";
    window.addEventListener("contextmenu", preventDefault);
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("touchmove", preventDefault, { passive: false });
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("contextmenu", preventDefault);
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        zIndex: 9999,
        inset: 0,
        background: "#0a0e17",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie animationData={animationData} style={{ width: 160, height: 160 }} loop />
    </div>
  );
} 