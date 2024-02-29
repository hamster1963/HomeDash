import { Typography } from "@douyinfe/semi-ui";
import React from "react";

type NewDescriptionProps = {
  keyString: string;
  value: React.ReactNode;
};

export default function NewDescription({
  keyString,
  value,
}: NewDescriptionProps) {
  const { Text, Title } = Typography;
  return (
    <div
      style={{
        gap: "3px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Text type="tertiary">{keyString}</Text>
      <Title heading={4}>{value}</Title>
    </div>
  );
}
