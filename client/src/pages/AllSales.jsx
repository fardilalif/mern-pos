import { queryClient } from "@/App.jsx";
import { DataTable } from "@/components/index.js";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import customFetch from "@/utils/customFetch.js";
import { useQuery } from "@tanstack/react-query";

const allSalesQuery = {
  queryKey: ["allSales"],
  queryFn: async () => {
    const response = await customFetch.get("/sales");
    return response.data;
  },
};

export const loader = async () => {
  return queryClient.ensureQueryData(allSalesQuery);
};

const AllSales = () => {
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
      cell: ({ row }) => new Date(row.getValue("createdAt")).toString(),
    },
  ];

  const {
    data: { sales },
  } = useQuery(allSalesQuery);

  console.log(sales);
  console.log(columns);

  return (
    <div>
      <DataTable data={sales} columns={columns} />
    </div>
  );
};
export default AllSales;
