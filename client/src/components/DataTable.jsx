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
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { currencyFormatter } from "./../utils/currencyFormatter";
import { Button } from "./ui/button.jsx";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog.jsx";
import { Sheet } from "./ui/sheet.jsx";

const DataTable = ({ columns, data, title }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [selectedRow, setIsSelectedRow] = useState(null);
  const [isOpenSheet, setIsOpenSheet] = useState(false);

  const handleTriggerContentSheet = () => {
    setIsOpenSheet(!isOpenSheet);
  };

  const handleRowClick = (rowData) => {
    setIsSelectedRow(rowData);
    handleTriggerContentSheet();
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-semibold tra cking-wide">{title}</h1>
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
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Transaction Detail</DialogTitle>
                    <DialogDescription>
                      View transaction details.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid gap-y-4">
                    <h5 className="font-semibold tracking-wide">Items: </h5>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item</TableHead>
                          <TableHead>Quantity</TableHead>
                          <TableHead>Price (MYR)</TableHead>
                          <TableHead>Amount (MYR)</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedRow?.items?.map((item) => {
                          return (
                            <TableRow key={item._id}>
                              <TableCell className="font-medium">
                                {item.product.name}
                              </TableCell>
                              <TableCell>{item.quantity}</TableCell>
                              <TableCell>{item.price}</TableCell>
                              <TableCell>
                                {item.price * item.quantity}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>

                    <div className="flex items-center justify-end">
                      <span className="font-semibold">
                        Total: {currencyFormatter(selectedRow?.totalAmount)}
                      </span>
                    </div>
                  </div>
                  <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                      <Button type="button" variant="secondary">
                        Close
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Sheet>
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DataTable;
