import React from "react";

type SurgeCardProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
};

function SurgeCard({ children, style }: SurgeCardProps) {
  return (
    <div
      style={{
        borderRadius: "20px",
        border: "1px solid ",
        borderColor: "rgba(var(--semi-grey-1), 1)",
        boxShadow: "0px 20px 20px -20px rgba(0, 0, 0, 0.2)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default SurgeCard;
