"use client";

import {
  Card,
  Descriptions,
  Divider,
  Progress,
  Typography,
} from "@douyinfe/semi-ui";
import "../styles/style.css";

export default function Service() {
  const { Title } = Typography;

  const data = [
    {
      key: "实际用户数量",
      value: "1,480,000",
      style: { paddingRight: "0px" },
    },
  ];

  return (
    <>
      <Title
        heading={2}
        style={{ marginTop: "30px", marginLeft: "30px", marginBottom: "30px" }}
      >
        🛠️ 核心服务状态
      </Title>
      <Divider margin="12px" align="left">
        <div
          style={{
            marginLeft: "-10px",
            fontWeight: "normal",
            fontSize: "30px",
          }}
        >
          服务概览
        </div>
      </Divider>
      <div
        style={{
          display: "flex",
          justifyContent: "stretch",
          alignItems: "center",
          marginLeft: "30px",
          marginRight: "30px",
          borderRadius: "20px",
          minWidth: "250px",
          padding: "20px",
          flexWrap: "wrap",
          backgroundColor: "rgba(var(--semi-grey-0), 1)",
        }}
      >
        <Card
          style={{
            flex: 1,
            minWidth: "220px",
            marginRight: "15px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Progress
              percent={10}
              showInfo={true}
              type="circle"
              strokeWidth={10}
              aria-label="disk usage"
            />
            <Descriptions
              data={data}
              row
              size="medium"
              style={{
                marginLeft: "10px",
              }}
            />
          </div>
        </Card>
        <Card
          style={{
            flex: 1,
            minWidth: "220px",
            marginRight: "15px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Progress
              percent={10}
              showInfo={true}
              type="circle"
              strokeWidth={10}
              aria-label="disk usage"
            />
            <Descriptions
              data={data}
              row
              size="medium"
              style={{
                marginLeft: "10px",
              }}
            />
          </div>
        </Card>
        <Card
          style={{
            flex: 1,
            minWidth: "220px",
            marginRight: "15px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Progress
              percent={10}
              showInfo={true}
              type="circle"
              strokeWidth={10}
              aria-label="disk usage"
            />
            <Descriptions
              data={data}
              row
              size="medium"
              style={{
                marginLeft: "10px",
              }}
            />
          </div>
        </Card>
        <Card
          style={{
            flex: 1,
            minWidth: "220px",
            marginRight: "15px",
            borderRadius: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Progress
              percent={10}
              showInfo={true}
              type="circle"
              strokeWidth={10}
              aria-label="disk usage"
            />
            <Descriptions
              data={data}
              row
              size="medium"
              style={{
                marginLeft: "10px",
              }}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
