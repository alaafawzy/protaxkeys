"use client";

import React, { useEffect, useRef } from "react";

// Wraps raw HTML and asks MathJax (v2) to typeset it after render
export default function MathJaxContent({ html }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // التحقق من وجود MathJax في نافذة المتصفح
    if (typeof window !== "undefined" && window.MathJax && window.MathJax.Hub && containerRef.current) {
      try {
        window.MathJax.Hub.Queue(["Typeset", window.MathJax.Hub, containerRef.current]);
      } catch (e) {
        console.error("MathJax typeset error", e);
      }
    }
  }, [html]);

  return <div ref={containerRef} dangerouslySetInnerHTML={{ __html: html }} />;
}