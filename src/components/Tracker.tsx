"use client";

import { useEffect } from "react";

export default function Tracker() {
  useEffect(() => {
    const trackView = async () => {
      try {
        await fetch("/api/track", { method: "POST" });
      } catch {
        // Fail silently to avoid breaking UX
      }
    };
    trackView();
  }, []);

  return null;
}
