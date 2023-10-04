"use client";
import { IconSimilarity } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";

const FixedButton = () => {
  const [dark, setDark] = useState(false);
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      localStorage.setItem("theme-mode", "light");
      setDark(false);
    } else {
      body.setAttribute("theme-mode", "dark");
      localStorage.setItem("theme-mode", "dark");
      setDark(true);
    }
  };

  useEffect(() => {
    const body = document.body;
    const dark = body.hasAttribute("theme-mode");
    setDark(dark);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Button
        style={{ marginBottom: "10px" }}
        icon={<IconSimilarity />}
        type="tertiary"
        theme="solid"
        aria-label="暗黑模式"
        onClick={switchMode}
      >
        {dark ? "早安" : "晚安"}
      </Button>
    </div>
  );
};

export default FixedButton;
