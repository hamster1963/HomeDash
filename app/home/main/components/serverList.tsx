import { Progress, Skeleton } from "@douyinfe/semi-ui";
import React from "react";

import NewDescription from "@/app/home/main/components/NewDescription";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type ServerCardProps = {
  id: number;
  name: string;
  status: string;
  cpu: number;
  memory: number;
  disk: number;
  uptime: number;
  up: number;
  down: number;
};

const placeholder = (
  <div>
    <Skeleton.Title style={{ width: 50 }} />
  </div>
);

function ServerCard(props: ServerCardProps) {
  return (
    <>
      <div>
        <div
          className={"serverDescription"}
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <NewDescription
            style={{
              minWidth: "200px",
            }}
            keyString={"服务器"}
            value={props.name}
          />
          <section
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "40px",
            }}
          >
            <NewDescription
              keyString={"在线状态"}
              value={
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
              }
            />
            <NewDescription
              style={{
                width: "110px",
                overflow: "hidden",
              }}
              keyString={"CPU占用"}
              value={
                props.status === "online" ? (
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
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
            <NewDescription
              style={{
                width: "110px",
                overflow: "hidden",
              }}
              keyString={"内存占用"}
              value={
                props.status === "online" ? (
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
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
            <NewDescription
              style={{
                width: "110px",
                overflow: "hidden",
              }}
              keyString={"存储占用"}
              value={
                props.status === "online" ? (
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
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
            <NewDescription
              style={{
                width: "110px",
                overflow: "hidden",
              }}
              keyString={"上传"}
              value={
                props.status === "online" ? (
                  props.up.toFixed(2) + "mb/s"
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
            <NewDescription
              style={{
                width: "110px",
                overflow: "hidden",
              }}
              keyString={"下载"}
              value={
                props.status === "online" ? (
                  props.down.toFixed(2) + "mb/s"
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
            <NewDescription
              keyString={"在线天数"}
              value={
                props.status === "online" ? (
                  props.uptime.toFixed(0) + "天"
                ) : (
                  <Skeleton
                    placeholder={placeholder}
                    loading={true}
                    active
                  ></Skeleton>
                )
              }
            />
          </section>
        </div>
      </div>
    </>
  );
}

export default function Server() {
  const serverGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      {serverGetData ? (
        serverGetData?.serverInfo.map((server: ServerCardProps) => (
          <ServerCard
            key={server.id}
            id={server.id}
            name={server.name}
            status={server.status}
            cpu={server.cpu}
            memory={server.memory}
            disk={server.disk}
            uptime={server.uptime}
            up={server.up}
            down={server.down}
          />
        ))
      ) : (
        <ServerCard
          key={"server.id"}
          id={0}
          name={"加载中"}
          status={"加载中"}
          cpu={0}
          memory={0}
          disk={0}
          uptime={0}
          up={0}
          down={0}
        />
      )}
    </div>
  );
}
