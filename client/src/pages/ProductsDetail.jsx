import { queryClient } from "@/App.jsx";
import { DataTable } from "@/components/index.js";
import Loading from "@/components/Loading.jsx";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import customFetch from "@/utils/customFetch.js";
import { dateFormatter } from "@/utils/dateFormatter.js";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";

const allProductsQuery = (params) => {
  const { page = 1, perPage = 5, query = "" } = params;

  return {
    queryKey: ["allProducts", page, perPage, query],
    queryFn: async () => {
      const response = await customFetch.get("/products", {
        params: { page, perPage, query },
      });
      return response.data;
    },
  };
};

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  queryClient.ensureQueryData(allProductsQuery(params));
  return { params };
};

const ProductsDetail = () => {
  const { params } = useLoaderData();
  const { page, perPage, query } = params;
  const { data, isError, isPending } = useQuery(allProductsQuery(params));

  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h1 className="font-bold">Ops! Something went wrong.</h1>
      </div>
    );
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price",
      cell: ({ row }) => currencyFormatter(row.getValue("price")),
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => dateFormatter(row.getValue("createdAt")),
    },
    {
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ row }) => dateFormatter(row.getValue("updatedAt")),
    },
  ];

  return (
    <>
      <DataTable
        data={data.products}
        columns={columns}
        title="Products Detail"
        totalRows={data.totalProducts}
        rowsPerPage={Number(perPage) || 5}
        pageCount={data.totalPages}
        query={query}
        currentPage={Number(page) || 1}
      />
    </>
  );
};
export default ProductsDetail;
