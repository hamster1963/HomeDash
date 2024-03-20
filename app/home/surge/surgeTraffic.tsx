import { Descriptions, Skeleton, Typography } from "@douyinfe/semi-ui";
import React from "react";

function SurgeTraffic() {
  const { Title, Text } = Typography;
  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const surgeTrafficDataOne = [
    {
      key: "上传速度",
      value: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              fontWeight: "lighter",
            }}
          >
            5.45
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            Mb/s
          </Text>
        </div>
      ),
    },
    {
      key: "下载速度",
      value: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "50px",
              lineHeight: "50px",
              fontWeight: "lighter",
            }}
          >
            101.23
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            Mb/s
          </Text>
        </div>
      ),
    },
  ];
  const surgeTrafficDataTwo = [
    {
      key: "节点",
      value: (
        <Title
          heading={2}
          style={{
            fontWeight: "lighter",
          }}
        >
          🇺🇸 US Americano
        </Title>
      ),
    },
    {
      key: "延迟",
      value: (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "baseline",
            // justifyContent: "stretch",
            gap: "5px",
          }}
        >
          <Text
            style={{
              fontSize: "33px",
              fontWeight: "lighter",
            }}
          >
            89
          </Text>
          <Text
            style={{
              fontSize: "15px",
              fontWeight: "lighter",
            }}
          >
            ms
          </Text>
        </div>
      ),
    },
    {
      key: "流量占比",
      value: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "250px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: "15px",
                fontWeight: "lighter",
                color: "rgba(var(--semi-grey-6), 1)",
              }}
            >
              32GB
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",

                height: "5px",
                backgroundColor: "rgba(var(--semi-grey-3), 1)",
                marginRight: "5px",
                borderRadius: "10px",
              }}
            ></div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            <Text
              style={{
                fontSize: "15px",
                fontWeight: "lighter",
                color: "rgba(var(--semi-green-6), 1)",
              }}
            >
              32GB
            </Text>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "5px",
                backgroundColor: "rgba(var(--semi-green-5), 1)",
                marginRight: "5px",
                borderRadius: "10px",
              }}
            ></div>
          </div>
        </div>
      ),
    },
  ];
  return (
    <section
      style={{
        marginBottom: "30px",
        overflow: "visible",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        flexWrap: "wrap",
      }}
    >
      <Descriptions
        className="xuiDescription"
        data={surgeTrafficDataOne}
        row
        size="large"
      />
      <Descriptions
        className="xuiDescription"
        data={surgeTrafficDataTwo}
        row
        size="large"
      />
    </section>
  );
}

export default SurgeTraffic;
