import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';
import { useTableApi } from '../../hooks/table/use-table-api';
import { TableData } from '../../shapes/data';

const columnHelper = createColumnHelper<TableData>();

const columns = [
  columnHelper.accessor('firstName', {
    id: 'firstName',
    header: () => <span>First Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('lastName', {
    id: 'lastName',
    header: () => <span>Last Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    id: 'email',
    header: () => <span>Email</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('active', {
    id: 'active',
    header: () => <span>Is Active</span>,
    cell: (info) => (info.getValue() ? 'Active' : 'Not Active'),
  }),
];

export const Table = () => {
  const { data, isLoading, isError, error } = useTableApi();

  if (isLoading) return <div>...Loading....</div>;
  if (isError) return <div>{JSON.stringify(error, undefined, 4)}</div>;

  // Table component can only recieve valid data to render
  // Typescript should block a component that renders a table from passing
  // a falsy value like undefined or null (pending data from api)
  return <ExampleImportedTableComponent data={data} />;
};

export const ExampleImportedTableComponent = ({
  data,
}: {
  data: TableData[];
}) => {
  const table = useReactTable<TableData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headersGroup) => (
            <tr key={headersGroup.id}>
              {headersGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    className="min-w-fit border px-2 text-start"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border px-2 text-start">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Table;
