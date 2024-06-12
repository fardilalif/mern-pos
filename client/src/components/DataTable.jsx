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
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import Divider from "./Divider.jsx";
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

const DataTable = ({ columns, data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
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
          <Sheet open={isOpenSheet} onOpenChange={handleTriggerContentSheet}>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
                <DialogDescription>View transaction details.</DialogDescription>
              </DialogHeader>

              <div className="grid gap-y-4">
                <h5 className="font-semibold tracking-wide">Items: </h5>

                <div className="flex flex-col gap-y-2 text-sm">
                  {selectedRow.items.map((item) => (
                    <div key={item._id} className="grid gap-y-2">
                      <div className="flex items-center justify-between">
                        <span>{item.product.name}</span>
                        <span>{item.quantity}</span>
                      </div>
                      <Divider />
                    </div>
                  ))}
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
  );
};
export default DataTable;
