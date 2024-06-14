import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import React from "react";

const Receipt = React.forwardRef(({ receiptData }, ref) => {
  return (
    <div ref={ref} className="grid gap-y-2 w-[500px] p-4">
      <h1 className="font-semibold text-lg text-center">Receipt</h1>

      <div>
        <div className="flex flex-col gap-y-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price (MYR)</TableHead>
                <TableHead>Total Price (MYR)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receiptData?.items?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.quantity * item.price}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell>Total Amount: </TableCell>
                <TableCell className="font-semibold">
                  {currencyFormatter(receiptData?.totalAmount)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <p>Thank you.</p>
    </div>
  );
});

// Adding a display name for easier debugging
Receipt.displayName = "Receipt";

export default Receipt;
