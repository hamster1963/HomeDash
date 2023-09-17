"use client";
import { IconSimilarity } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";

const FixedButton = () => {
  const switchMode = () => {
    const body = document.body;
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
    } else {
      body.setAttribute("theme-mode", "dark");
    }
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
        icon={<IconSimilarity />}
        type="secondary"
        theme="solid"
        aria-label="暗黑模式"
        onClick={switchMode}
      >
        晚安
      </Button>
    </div>
  );
};

export default FixedButton;
