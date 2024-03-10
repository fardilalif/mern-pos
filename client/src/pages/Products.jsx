import { Button } from "@/components/ui/button.jsx";
import { Card, CardContent } from "@/components/ui/card.jsx";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { currencyFormatter } from "./../utils/currencyFormatter";
import customFetch from "./../utils/customFetch";
import {
  getCartData,
  removeCartData,
  saveCartData,
} from "./../utils/localStorage";

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
  const [cart, setCart] = useState(getCartData() || []);

  // first handle product increment when user clicks the item, then save the new state. use useEffect() to handle state change. once state change, create new object with three properties (_id, quantity, price) and save to localStorage by calling the function saveCartData()
  const handleProductIncrement = (product) => {
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem._id === product._id
    );

    if (existingItemIndex !== -1) {
      setCart((prevCart) => {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity =
          (prevCart[existingItemIndex].quantity || 0) + 1;
        return updatedCart;
      });
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    let items = cart.map((item) => {
      return {
        _id: item._id,
        quantity: item.quantity,
        price: item.price,
      };
    });

    saveCartData(items);
  }, [cart]);

  const abortTransaction = () => {
    setCart([]);
    removeCartData();
  };
  return (
    <section className="grid sm:grid-cols-[1fr_8rem] gap-4">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {products.map((product) => {
          const { _id, name, price, image } = product;

          return (
            <Card
              key={_id}
              className="w-full h-full shadow-md hover:shadow-lg"
              onClick={() => handleProductIncrement(product)}
            >
              <CardContent className="p-0 relative">
                {cart.map((item) => {
                  if (item._id === _id) {
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
                  src={image}
                  alt="product image"
                />
                <div className="flex flex-col justify-between items-baseline overflow-auto py-2 px-4 ">
                  <h2 className="text-lg font-semibold capitalize tracking-wide">
                    {name}
                  </h2>
                  <h3 className="text-xs">{currencyFormatter(price)}</h3>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="order-first sm:order-none">
        <div className="flex flex-wrap w-full gap-4 md:flex-col md:w-32 ">
          <Button>Payment</Button>
          <Button>Edit Cart</Button>
          <Button onClick={abortTransaction}>Abort Transaction</Button>
        </div>
      </div>
    </section>
  );
};
export default Products;
