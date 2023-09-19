"use client";

import { Descriptions, Progress } from "@douyinfe/semi-ui";
import { SSEDataFetch } from "@/app/home/utils/sse";

type ServerCardProps = {
  id: number;
  name: string;
  status: string;
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
};

function ServerCard(props: ServerCardProps) {
  return (
    <>
      <Descriptions className={"serverDescription"} row={true}>
        <Descriptions.Item
          style={{
            minWidth: "200px",
          }}
          itemKey="服务器"
        >
          {props.name}
        </Descriptions.Item>
        <Descriptions.Item
          style={{
            minWidth: "120px",
          }}
          itemKey="在线状态"
        >
          <div
            style={{
              color:
                props.status === "online"
                  ? "rgba(var(--semi-green-6), 1)"
                  : "rgba(var(--semi-red-6), 1)",
            }}
          >
            {props.status}
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          style={{
            minWidth: "170px",
          }}
          itemKey="CPU占用"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Progress
              style={{
                marginRight: "4px",
              }}
              stroke={
                props.cpu > 80
                  ? "rgba(var(--semi-red-5), 1)"
                  : props.cpu > 50
                  ? "rgba(var(--semi-orange-5), 1)"
                  : "rgba(var(--semi-green-5), 1)"
              }
              percent={props.cpu}
              type="circle"
              size="small"
            />
            {props.cpu}%
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          style={{
            minWidth: "170px",
          }}
          itemKey="内存占用"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Progress
              style={{
                marginRight: "4px",
              }}
              stroke={
                props.memory > 80
                  ? "rgba(var(--semi-red-5), 1)"
                  : props.memory > 50
                  ? "rgba(var(--semi-orange-5), 1)"
                  : "rgba(var(--semi-green-5), 1)"
              }
              percent={props.memory}
              type="circle"
              size="small"
            />
            {props.memory}%
          </div>
        </Descriptions.Item>
        <Descriptions.Item
          style={{
            minWidth: "160px",
          }}
          itemKey="存储占用"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Progress
              style={{
                marginRight: "4px",
              }}
              stroke={
                props.disk > 80
                  ? "rgba(var(--semi-red-5), 1)"
                  : props.disk > 50
                  ? "rgba(var(--semi-orange-5), 1)"
                  : "rgba(var(--semi-green-5), 1)"
              }
              percent={props.disk}
              type="circle"
              size="small"
            />
            {props.disk}%
          </div>
        </Descriptions.Item>
        <Descriptions.Item itemKey="在线天数">
          {props.uptime.toFixed(0)}天
        </Descriptions.Item>
      </Descriptions>
    </>
  );
}

export default function Server() {
  const data = SSEDataFetch("https://120.24.211.49/GetNetworkDataSSE");
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      {data?.serverInfo.map((server: ServerCardProps) => (
        <ServerCard
          key={server.id}
          id={server.id}
          name={server.name}
          status={server.status}
          cpu={server.cpu}
          memory={server.memory}
          disk={server.disk}
          uptime={server.uptime}
        />
      ))}
    </div>
  );
}
