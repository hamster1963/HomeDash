"use client";
import React, { useEffect, useState } from "react";
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
  function matchMode(e: { matches: any }) {
    const body = document.body;
    if (e.matches) {
      if (!body.hasAttribute("theme-mode")) {
        body.setAttribute("theme-mode", "dark");
      }
    } else {
      if (body.hasAttribute("theme-mode")) {
        body.removeAttribute("theme-mode");
      }
    }
  }
  useEffect(() => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const handleMatchMode = (e: MediaQueryListEvent) => matchMode(e);
    mql.addEventListener("change", handleMatchMode);
    matchMode(mql);

    return () => {
      mql.removeEventListener("change", handleMatchMode);
    };
  }, []);

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
