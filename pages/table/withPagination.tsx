import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useTableApi } from '../../hooks/table/use-table-api';
import { TableData } from '../../shapes/data';

export const Table = () => {
  const { data, isLoading, isError, error } = useTableApi();

  if (isLoading) return <div>...Loading....</div>;
  if (isError) return <div>{JSON.stringify(error, undefined, 4)}</div>;

  // Table component can only recieve valid data to render
  // Typescript should block a component that renders a table from passing
  // a falsy value like undefined or null (pending data from api)
  return <ExampleImportedTableComponent data={data} />;
};

const columnHelper = createColumnHelper<TableData>();

export const ExampleImportedTableComponent = ({
  data,
}: {
  data: TableData[];
}) => {
  const columns = React.useMemo(
    () => [
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
    ],
    [],
  );

  const table = useReactTable<TableData>({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <>
      <table className="mx-auto">
        <thead>
          {table.getHeaderGroups().map((headersGroup) => (
            <tr key={headersGroup.id}>
              {headersGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="min-w-fit border px-2 text-start"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
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

      <div id="spacer" aria-hidden className="py-2" />

      {/* Buttons that link into the data for pagination */}
      <div className="mx-auto flex justify-center gap-2">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
