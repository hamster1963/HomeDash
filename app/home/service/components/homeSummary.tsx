import { Card, Tag, Typography } from "@douyinfe/semi-ui";
import Image from "next/image";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

type HomeCardProps = {
  type: string;
  status: boolean;
  value: string;
  img: string;
};

const HomeCard = ({ type, status, value, img }: HomeCardProps) => {
  const { Title } = Typography;
  return (
    <Card
      style={{
        flex: 1,
        minWidth: "230px",
        margin: "10px",
        borderRadius: "20px",
        background: status ? "rgba(var(--semi-green-0), 1)" : "",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
          <Title
            heading={6}
            style={{
              color: "rgba(var(--semi-grey-9), 1)",
            }}
          >
            {type}
            <Tag
              style={{
                marginLeft: "5px",
              }}
              size="small"
              shape="circle"
              color={status ? "green" : "amber"}
            >
              {" "}
              {status ? "运行中" : "已关闭"}{" "}
            </Tag>
          </Title>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Title
              heading={4}
              style={{
                color: "rgba(var(--semi-grey-9), 1)",
              }}
            >
              {value}
            </Title>
          </div>
        </div>
        <Image src={img} alt={"air"} width={80} height={80} />
      </div>
    </Card>
  );
};

const homeCardDataSchema = z.object({
  AirConditioner: z.object({
    state: z.boolean(),
    temp: z.number(),
  }),
  Humidifier: z.object({
    state: z.boolean(),
    humidity: z.number(),
  }),
  AirPurifier: z.object({
    state: z.boolean(),
    pm25: z.number(),
  }),
  Light: z.object({
    state: z.boolean(),
    brightness: z.number(),
  }),
});

export default function HomeSummary() {
  const homeInfoGetData = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetHomeDataSSE",
  );
  const homeCardValidation = homeCardDataSchema.safeParse(
    homeInfoGetData?.homeData,
  );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          marginLeft: "10px",
          marginRight: "10px",
          borderRadius: "20px",
          padding: "10px",
          flexWrap: "wrap",
        }}
      >
        <HomeCard
          type={"空调"}
          status={
            homeCardValidation.success
              ? homeCardValidation.data.AirConditioner.state
              : false
          }
          value={
            homeCardValidation.success
              ? homeCardValidation.data.AirConditioner.temp + "°C"
              : "离线中"
          }
          img={"/air.png"}
        />

        <HomeCard
          type={"加湿器"}
          status={
            homeCardValidation.success
              ? homeCardValidation.data.Humidifier.state
              : false
          }
          value={
            homeCardValidation.success
              ? homeCardValidation.data.Humidifier.humidity + "%"
              : "离线中"
          }
          img={"/wet.png"}
        />

        <HomeCard
          type={"空气净化器"}
          status={
            homeCardValidation.success
              ? homeCardValidation.data.AirPurifier.state
              : false
          }
          value={
            homeCardValidation.success
              ? homeCardValidation.data.AirPurifier.pm25 + "ug/m³"
              : "离线中"
          }
          img={"/tree.png"}
        />
        <HomeCard
          type={"卧室床头灯"}
          status={
            homeCardValidation.success
              ? homeCardValidation.data.Light.state
              : false
          }
          value={
            homeCardValidation.success
              ? homeCardValidation.data.Light.brightness + "%"
              : "离线中"
          }
          img={"/light.png"}
        />
      </div>
    </>
  );
}
