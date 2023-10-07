"use client";
import { IconDesktop, IconMoon, IconSun } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const FixedButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const switchMode = (theme: string) => {
    setTheme(theme);
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={"fixedButton"}>
      <Button
        style={{ borderRadius: "50%" }}
        icon={<IconSun />}
        type={"tertiary"}
        theme={theme === "light" ? "solid" : "borderless"}
        aria-label="浅色模式"
        onClick={() => switchMode("light")}
      ></Button>
      <Button
        type={"tertiary"}
        style={{ borderRadius: "50%" }}
        icon={<IconMoon />}
        theme={theme === "dark" ? "solid" : "borderless"}
        aria-label="深色模式"
        onClick={() => switchMode("dark")}
      ></Button>
      <Button
        type={"tertiary"}
        style={{ borderRadius: "50%" }}
        icon={<IconDesktop />}
        theme={theme === "system" ? "solid" : "borderless"}
        aria-label="系统设置"
        onClick={() => switchMode("system")}
      ></Button>
    </div>
  );
};

export default FixedButton;
