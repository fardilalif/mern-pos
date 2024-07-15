import { queryClient } from "@/App.jsx";
import { DataTable, Loading } from "@/components/index.js";
import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import customFetch from "@/utils/customFetch.js";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpDown } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import { BarChart, LineChart } from "../components";
import { dateFormatter } from "../utils/dateFormatter";

const allSalesQuery = (params) => {
  const { page = 1, perPage = 5, query = "" } = params;

  return {
    queryKey: ["allSales", page, perPage, query],
    queryFn: async () => {
      const response = await customFetch.get("/sales", {
        params: { page, perPage, query },
      });
      return response.data;
    },
  };
};

const totalSalesDataQuery = {
  queryKey: ["totalSales"],
  queryFn: async () => {
    const response = await customFetch.get("/sales/total-sales");
    return response.data;
  },
};

const productsSoldQuery = {
  queryKey: ["productsSold"],
  queryFn: async () => {
    const response = await customFetch.get("/sales/products-sold");
    return response.data;
  },
};

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  queryClient.ensureQueryData(totalSalesDataQuery);
  queryClient.ensureQueryData(allSalesQuery(params));
  queryClient.ensureQueryData(productsSoldQuery);
  return { params };
};

const Stats = () => {
  const { params } = useLoaderData();
  const { page, perPage, query } = params;

  const {
    data: salesData,
    isLoading: isLoadingSales,
    isError: isErrorSales,
  } = useQuery(allSalesQuery(params));
  const {
    data: totalSalesData,
    isLoading: isLoadingTotalSales,
    isError: isErrorTotalSales,
  } = useQuery(totalSalesDataQuery);
  const {
    data: productsSoldData,
    isLoading: isLoadingProductsSold,
    isError: isErrorProductsSold,
  } = useQuery(productsSoldQuery);

  const renderDialogContent = (selectedRow) => {
    return (
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transaction Detail</DialogTitle>
          <DialogDescription>View transaction details.</DialogDescription>
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
                    <TableCell className="font-medium">{item?.name}</TableCell>
                    <TableCell>{item?.quantity}</TableCell>
                    <TableCell>{currencyFormatter(item?.price)}</TableCell>
                    <TableCell>
                      {currencyFormatter(item?.price * item?.quantity)}
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
    );
  };

  if (isLoadingSales || isLoadingTotalSales || isLoadingProductsSold) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isErrorSales || isErrorTotalSales || isErrorProductsSold) {
    return (
      <div>
        <h1 className="font-bold">Ops! Something went wrong.</h1>
      </div>
    );
  }
  const { sales } = salesData;
  const { totalSales } = totalSalesData;
  const { productsSold } = productsSoldData;

  const totalSalesState = {
    options: {
      chart: {
        id: "total-sales",
      },
      xaxis: {
        categories: totalSales.map((item) => item.product),
        title: {
          text: "Product",
        },
      },
      yaxis: {
        title: {
          text: "Number of Product Sold",
        },
      },
    },
    series: [
      {
        name: "Total sold",
        data: totalSales.map((item) => item.totalSold),
      },
    ],
  };

  const productsSoldState = {
    options: {
      chart: {
        id: "products-sold",
      },
      xaxis: {
        categories: productsSold.map((entry) => entry._id),
        title: {
          text: "Date",
        },
      },
      yaxis: {
        title: {
          text: "Number of Product Sold",
        },
      },
    },

    series: [
      {
        name: "Products Sold",
        data: productsSold.map((entry) => entry.totalProductsSold),
      },
    ],
  };

  const columns = [
    {
      accessorKey: "totalAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Total Amount (MYR)
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        return currencyFormatter(row.getValue("totalAmount"));
      },
    },
    {
      accessorKey: "createdBy.name",
      header: "Created By",
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Created At
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => dateFormatter(row.getValue("createdAt")),
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            <BarChart title="Products Sold / Product" state={totalSalesState} />
            <LineChart title="Products Sold / Day" state={productsSoldState} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader></CardHeader>
        <CardContent>
          <DataTable
            data={sales}
            columns={columns}
            title="Transactions"
            dialogContent={renderDialogContent}
            totalRows={salesData.totalSales}
            rowsPerPage={Number(perPage) || 5}
            pageCount={salesData.totalPages}
            query={query}
            currentPage={Number(page) || 1}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default Stats;
