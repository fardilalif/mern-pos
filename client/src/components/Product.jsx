import { Card, CardContent } from "@/components/ui/card.jsx";
import { currencyFormatter } from "@/utils/currencyFormatter.js";

const Product = ({ product, cart, handleProductIncrement }) => {
  return (
    <Card
      className="w-full h-full shadow-md hover:shadow-lg"
      onClick={() => handleProductIncrement(product)}
    >
      <CardContent className=" p-0 relative">
        {cart.map((item) => {
          if (item._id === product._id) {
            return (
              <span
                key={item._id}
                className="absolute -top-2 -right-4 rounded-full w-8 h-8 bg-primary text-primary-foreground grid place-items-center font-bold"
              >
                {item.quantity}
              </span>
            );
          }
        })}
        <img
          className="w-full h-32 object-cover rounded-t-lg"
          src={
            product.image
              ? product.image
              : "https://placehold.co/600x400?text=Product"
          }
          alt="product image"
        />

        <div className="flex flex-col justify-between items-baseline overflow-auto py-2 px-4 ">
          <h2 className="text-lg font-semibold capitalize tracking-wide">
            {product.name}
          </h2>
          <h3 className="text-xs">{currencyFormatter(product.price)}</h3>
        </div>
      </CardContent>
    </Card>
  );
};
export default Product;
