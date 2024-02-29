import { Typography } from "@douyinfe/semi-ui";
import React from "react";

type NewDescriptionProps = {
  keyString: string;
  value: React.ReactNode;
  style?: React.CSSProperties;
};

export default function NewDescription({
  keyString,
  value,
  style,
}: NewDescriptionProps) {
  const { Text, Title } = Typography;
  return (
    <div
      style={{
        gap: "3px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        ...style, // This is the style prop that is passed in from the parent component
      }}
    >
      <Text type="tertiary">{keyString}</Text>
      <Title heading={4}>{value}</Title>
    </div>
  );
}
