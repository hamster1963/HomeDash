import useSWRSubscription from "swr/subscription";

export function SSEDataFetch(url: string) {
  const { data } = useSWRSubscription(
    url,
    (key: string | URL, { next }: any) => {
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
