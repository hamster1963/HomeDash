"use client";
import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { useTheme } from "next-themes";

const FixedButton = () => {
  const { theme, setTheme } = useTheme();
  const switchMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
        icon={theme === "light" ? <IconMoon /> : <IconSun />}
        theme="light"
        aria-label="切换模式"
        onClick={switchMode}
      >
        {theme === "light" ? "晚安" : "早安"}
      </Button>
    </div>
  );
};

export default FixedButton;
