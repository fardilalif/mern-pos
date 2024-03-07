import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { useLoaderData } from "react-router-dom";
import { currencyFormatter } from "./../utils/currencyFormatter";
import customFetch from "./../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch.get("/products");
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
};

const Products = () => {
  const { products } = useLoaderData();

  return (
    <section className="grid  grid-cols-1  sm:grid-cols-[1fr_auto] gap-4">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {products.map((product) => {
          const { _id, name, price, image } = product;

          return (
            <Card key={_id} className="w-full h-full shadow-md">
              <CardContent className="">
                <img
                  className="w-full h-52 object-cover"
                  src={image}
                  alt="product image"
                />
                <div className="flex justify-between items-baseline ">
                  <h2 className="text-xl capitalize tracking-wide">{name}</h2>
                  <h3 className="">{currencyFormatter(price)}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="w-40">
        <div className="fixed">
          <Button>Payment</Button>
        </div>
      </div>
    </section>
  );
};
export default Products;
