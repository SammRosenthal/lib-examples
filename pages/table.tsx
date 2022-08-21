import { useTableApi } from "../hooks/table/use-table-api";

export const Table = () => {
  const { data, isLoading, isError, error } = useTableApi();

  console.log(isLoading);

  if (isLoading) return <div>...Loading....</div>;
  if (isError) return <div>{JSON.stringify(error, undefined, 4)}</div>;

  return (
    <h1 className="text-2xl text-red-500">
      {JSON.stringify(data, undefined, 4)}
    </h1>
  );
};

export default Table;
