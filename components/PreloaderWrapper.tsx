"use client";
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

// Dynamically import Preloader with ssr: false
const Preloader = dynamic(() => import('./Preloader'), {
  ssr: false,
  loading: () => null,
});

export default function PreloaderWrapper({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Render the dynamically imported Preloader */}
      {loading && <Preloader />}
      <div style={{ visibility: loading ? "hidden" : "visible" }}>{children}</div>
    </>
  );
} 