import { Progress, Table, Tag } from "@douyinfe/semi-ui";
import React from "react";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const xuiDataSchema = z.object({
  user_list: z.array(
    z.object({
      remark: z.string(),
      enable: z.boolean(),
      protocol: z.string(),
      up: z.number(),
      down: z.number(),
    }),
  ),
  user_count: z.number(),
  up_total: z.number(),
  down_total: z.number(),
});

export default function XuiTable() {
  const xuiTableGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
  const xuiValidation = xuiDataSchema.safeParse(xuiTableGetData?.xuiData);

  const columns = [
    {
      title: "名称",
      dataIndex: "remark",
      width: "15%",
    },
    {
      title: "启用状态",
      dataIndex: "enable",
      width: "20%",
      render: (enable: boolean) => {
        return enable ? (
          <Tag color="green" type="light">
            启用
          </Tag>
        ) : (
          <Tag color="red" type="light">
            禁用
          </Tag>
        );
      },
    },
    {
      title: "协议",
      dataIndex: "protocol",
      width: "20%",
      render: (protocol: string) => {
        return (
          <Tag color="blue" type="light">
            {protocol}
          </Tag>
        );
      },
    },
    {
      title: "上传流量",
      dataIndex: "up",
      render: (up: number) => {
        return up.toFixed(2) + "GB";
      },
    },
    {
      title: "下载流量",
      dataIndex: "down",
      render: (down: number) => {
        return (
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
                xuiValidation.success
                  ? (down / xuiValidation.data.down_total) * 100 > 80
                    ? "rgba(var(--semi-red-5), 1)"
                    : (down / xuiValidation.data.down_total) * 100 > 50
                    ? "rgba(var(--semi-orange-5), 1)"
                    : "rgba(var(--semi-green-5), 1)"
                  : "rgba(var(--semi-red-5), 1)"
              }
              percent={
                xuiValidation.success
                  ? (down / xuiValidation.data.down_total) * 100
                  : 0
              }
              type="circle"
              size="small"
            />
            {down.toFixed(2) + "GB"}
          </div>
        );
      },
    },
  ];

  return (
    <div
      style={{
        overflow: "scroll",
      }}
    >
      <Table
        style={{
          marginLeft: "30px",
          marginTop: "10px",
          minWidth: "600px",
          maxWidth: "95%",
        }}
        loading={!xuiValidation.success}
        columns={columns}
        dataSource={xuiValidation.success ? xuiValidation.data.user_list : []}
        pagination={false}
        sticky={true}
      />
    </div>
  );
}
