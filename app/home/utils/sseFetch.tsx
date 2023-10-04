import useSWRSubscription, {
  type SWRSubscriptionOptions,
} from "swr/subscription";

type LooseObject = {
  [key: string]: any;
};

export function SSEDataFetch(url: string): LooseObject | undefined {
  const { data } = useSWRSubscription<LooseObject>(
    url,
    (key: string | URL, { next }: SWRSubscriptionOptions<LooseObject>) => {
      const source = new EventSource(key);
      source.onmessage = (event) => {
        const parsedData = JSON.parse(event.data);
        next(null, parsedData);
      };
      source.onerror = () => next(new Error("EventSource error"));
      return () => source.close();
    },
  );
  return data;
}
