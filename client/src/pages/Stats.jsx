import { queryClient } from "@/App.jsx";
import { DataTable, Loading } from "@/components/index.js";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import customFetch from "@/utils/customFetch.js";
import { useQuery } from "@tanstack/react-query";
import { BarChart } from "../components";
import { dateFormatter } from "../utils/dateFormatter";

const allSalesQuery = {
  queryKey: ["allSales"],
  queryFn: async () => {
    const response = await customFetch.get("/sales");
    return response.data;
  },
};

const totalSalesDataQuery = {
  queryKey: ["totalSales"],
  queryFn: async () => {
    const response = await customFetch.get("/sales/total-sales");
    return response.data;
  },
};

export const loader = async () => {
  queryClient.ensureQueryData(totalSalesDataQuery);
  queryClient.ensureQueryData(allSalesQuery);
  return null;
};

const Stats = () => {
  const {
    data: salesData,
    isLoading: isLoadingSales,
    isError: isErrorSales,
  } = useQuery(allSalesQuery) || {};
  const {
    data: totalSalesData,
    isLoading: isLoadingTotalSales,
    isError: isErrorTotalSales,
  } = useQuery(totalSalesDataQuery);

  if (isLoadingSales || isLoadingTotalSales) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isErrorSales || isErrorTotalSales) {
    return (
      <div>
        <h1 className="font-bold">Ops! Something went wrong.</h1>
      </div>
    );
  }

  const { sales } = salesData;
  const { totalSales } = totalSalesData;

  const state = {
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

  const columns = [
    {
      accessorKey: "totalAmount",
      header: "Total Amount (MYR)",
      accessorFn: (row) => currencyFormatter(row.totalAmount),
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      accessorFn: (row) => row.createdBy.name,
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => dateFormatter(row.getValue("createdAt")),
    },
  ];

  return (
    <div className="flex  gap-4">
      <Card className="flex-1">
        <CardHeader></CardHeader>
        <CardContent>
          <BarChart title="Products Chart" state={state} />
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardHeader></CardHeader>
        <CardContent>
          <DataTable data={sales} columns={columns} title="Transactions" />
        </CardContent>
      </Card>
    </div>
  );
};
export default Stats;
