import "../../style.css";

import {
  Descriptions,
  Progress,
  Skeleton,
  Typography,
} from "@douyinfe/semi-ui";
import { z } from "zod";

import { SSEDataFetch } from "@/app/home/utils/sseFetch";

const CoffeeInfoSchema = z.object({
  usedBound: z.string(),
  remainBound: z.string(),
  planBound: z.string(),
});

export default function CoffeeSummary() {
  const { Title } = Typography;
  const data = SSEDataFetch(
    process.env.NEXT_PUBLIC_GO_API_BASE_URL + "/GetNetworkDataSSE",
  );
  const coffeeValidation = CoffeeInfoSchema.safeParse(data?.coffeeInfo);

  const placeholder = (
    <div>
      <Skeleton.Title style={{ width: 50 }} />
    </div>
  );
  const networkSummaryData = [
    {
      key: "服务商",
      value: (
        <Title heading={4}>
          {data ? (
            "CoffeeCloud"
          ) : (
            <Skeleton
              placeholder={placeholder}
              loading={true}
              active
            ></Skeleton>
          )}
        </Title>
      ),
    },
    {
      key: "已使用流量",
      value: coffeeValidation.success ? (
        coffeeValidation.data.usedBound + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "剩余流量",
      value: coffeeValidation.success ? (
        coffeeValidation.data.remainBound + "GB"
      ) : (
        <Skeleton placeholder={placeholder} loading={true} active></Skeleton>
      ),
    },
    {
      key: "剩余占比",
      value: (
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          {coffeeValidation.success ? (
            (
              (Number(coffeeValidation.data.remainBound) /
                Number(coffeeValidation.data.planBound)) *
              100
            ).toFixed(2) + "%"
          ) : (
            <Skeleton
              placeholder={placeholder}
              loading={true}
              active
            ></Skeleton>
          )}
          {coffeeValidation.success && (
            <Progress
              percent={
                (Number(coffeeValidation.data.remainBound) /
                  Number(coffeeValidation.data.planBound)) *
                100
              }
              style={{
                marginLeft: "5px",
              }}
              type="circle"
              size="small"
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <>
      <Descriptions
        className="mainDescription"
        data={networkSummaryData}
        row
        size="medium"
      />
    </>
  );
}
