import React from "react";
import { Progress, Table, Tag } from "@douyinfe/semi-ui";
import { SSEDataFetch } from "@/app/home/utils/sseFetch";

export default function XuiTable() {
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetXuiDataSSE",
  );
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
      render: (text: any) => {
        return text ? (
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
      render: (text: any) => {
        return (
          <Tag color="blue" type="light">
            {text}
          </Tag>
        );
      },
    },
    {
      title: "上传流量",
      dataIndex: "up",
      render: (text: any) => {
        return text.toFixed(2) + "GB";
      },
    },
    {
      title: "下载流量",
      dataIndex: "down",
      render: (text: any) => {
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
                (text / data?.xuiData.down_total) * 100 > 80
                  ? "rgba(var(--semi-red-5), 1)"
                  : (text / data?.xuiData.down_total) * 100 > 50
                  ? "rgba(var(--semi-orange-5), 1)"
                  : "rgba(var(--semi-green-5), 1)"
              }
              percent={(text / data?.xuiData.down_total) * 100}
              type="circle"
              size="small"
            />
            {text.toFixed(2) + "GB"}
          </div>
        );
      },
    },
  ];

  return (
    <Table
      style={{
        marginLeft: "30px",
        marginTop: "10px",
        minWidth: "600px",
        maxWidth: "95%",
      }}
      loading={data === undefined}
      columns={columns}
      dataSource={data?.xuiData ? data?.xuiData.user_list : []}
      pagination={false}
      sticky={true}
    />
  );
}
