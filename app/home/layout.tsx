"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Layout } from "@douyinfe/semi-ui";
import "./styles/globals.css";
import LeftSide from "@/app/home/leftSide";
import FixedButton from "@/app/home/fixedButton";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { Sider, Content } = Layout;

  function setTheme(theme: string) {
    const body = document.body;
    if (theme === "dark") {
      body.setAttribute("theme-mode", "dark");
      localStorage.setItem("theme-mode", "dark");
    } else {
      body.removeAttribute("theme-mode");
      localStorage.setItem("theme-mode", "light");
    }
  }

  const matchMode = useCallback((e: { matches: any }) => {
    if (e.matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    // Firstly, apply theme from localStorage or fallback to system preference
    const savedTheme = localStorage.getItem("theme-mode");
    console.log(savedTheme);
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (prefersDarkScheme) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    }

    // Then, setup the event listener to track system preference changes
    const mql = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMatchMode = (e: MediaQueryListEvent) => matchMode(e);
    mql.addEventListener("change", handleMatchMode);

    return () => {
      mql.removeEventListener("change", handleMatchMode);
    };
  }, [matchMode]);

  const [navWidth, setNavWidth] = useState("220px");
  const callbackNavWidth = (width: string) => {
    setNavWidth(width);
  };

  return (
    <Layout>
      <Sider
        style={{
          marginRight: navWidth,
        }}
      >
        <LeftSide callbackWidth={callbackNavWidth} />
      </Sider>
      <Layout>
        <Content>{children}</Content>
      </Layout>
      <FixedButton />
    </Layout>
  );
}
