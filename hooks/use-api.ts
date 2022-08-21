import { useQuery } from "@tanstack/react-query";
import { DefaultError } from "../shapes/errors";

export const useFetch = <ResponseType = unknown, ErrorType = DefaultError>(
  url: string
) => {
  return useQuery<ResponseType, ErrorType>(
    [url],
    async () => await (await fetch(url)).json()
  );
};
