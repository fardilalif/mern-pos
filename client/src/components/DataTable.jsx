import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button.jsx";
import { Input } from "./ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select.jsx";
import { Sheet } from "./ui/sheet.jsx";

const DataTable = ({
  title,
  data,
  columns,
  dialogContent,
  query,
  pageCount,
  currentPage,
  totalRows,
  rowsPerPage,
}) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: pageCount,
    rowCount: rowsPerPage,
    state: {
      sorting,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: rowsPerPage,
      },
    },
  });
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const handleTriggerContentSheet = () => {
    setIsOpenSheet(!isOpenSheet);
  };

  const handleRowClick = (rowData) => {
    setSelectedRow(rowData);
    handleTriggerContentSheet();
  };

  const handlePageChange = (page) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", page);
    navigate(`${pathname}?${searchParams}`);
  };

  const handlePerPageChange = (perPage) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", 1);
    searchParams.set("perPage", perPage);
    navigate(`${pathname}?${searchParams}`);
  };

  const handleQuery = (query) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("query", query);
    searchParams.set("page", 1);
    searchParams.set("perPage", 5);
    navigate(`${pathname}?${searchParams}`);
  };

  const debounce = (onChange) => {
    let timeout;
    return (e) => {
      const value = e.currentTarget.value;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        onChange(value);
      }, 2000);
    };
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold tracking-wide">{title}</h1>
      </div>
      <div className="py-4">
        <form>
          <Input
            placeholder="Search..."
            defaultValue={query}
            onChange={debounce((value) => {
              handleQuery(value);
            })}
            className="max-w-sm"
          />
        </form>
      </div>
      <div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              <Sheet
                open={isOpenSheet}
                onOpenChange={handleTriggerContentSheet}
              >
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      className="cursor-pointer"
                      onClick={() => handleRowClick(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
                {dialogContent && dialogContent(selectedRow)}
              </Sheet>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="flex-1 text-sm text-muted-foreground">
            Showing {data.length} of {totalRows} row(s) .
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => handlePerPageChange(Number(value))}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageChange(1)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <FaAngleDoubleLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <FaAngleLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <FaAngleRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => handlePageChange(table.getPageCount())}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <FaAngleDoubleRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
