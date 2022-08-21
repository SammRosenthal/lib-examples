import { TableData } from "../../shapes/data";
import { useFetch } from "../use-api";

export const useTableApi = () => {
  return useFetch<TableData>(`/api/tableData`);
};
