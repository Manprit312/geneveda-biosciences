"use client";

import { useEffect } from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Force light theme for login page with explicit styles
    if (typeof window !== "undefined") {
      const root = document.documentElement;
      const body = document.body;
      
      // Remove dark class
      root.classList.remove("dark");
      
      // Set explicit light theme
      root.style.colorScheme = "light";
      root.setAttribute("data-theme", "light");
      
      // Ensure background colors are set
      root.style.backgroundColor = "#ffffff";
      body.style.backgroundColor = "#f0fdf4";
      body.style.color = "#111827";
      
      // Force remove any dark mode styles
      root.style.setProperty("--background", "#ffffff");
      root.style.setProperty("--foreground", "#171717");
    }
  }, []);

  return (
    <div style={{ backgroundColor: "#f0fdf4", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
