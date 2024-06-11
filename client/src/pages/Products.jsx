import { queryClient } from "@/App.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Checkout, Loading, Product } from "./../components";
import customFetch from "./../utils/customFetch";
import {
  getCartData,
  removeCartData,
  saveCartData,
} from "./../utils/localStorage";
import { addProduct } from "./AddProduct.jsx";
import { AddProduct } from "./index.js";

const productsQuery = {
  queryKey: ["products"],
  queryFn: async () => {
    const response = await customFetch.get("/products");
    return response.data;
  },
};

export const loader = async () => {
  return queryClient.ensureQueryData(productsQuery);
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "add product") return await addProduct(formData);
  // TODO: edit/delete product

  return null;
};

const Products = () => {
  const { isPending, data } = useQuery(productsQuery);
  const products = data?.products;
  const [totalAmount, setTotalAmount] = useState(0);
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
    const calculateTotalAmount = () => {
      const total = cart.reduce(
        (sum, cartItem) => sum + cartItem.quantity * cartItem.price,
        0
      );
      setTotalAmount(total);
    };

    calculateTotalAmount();

    saveCartData(cart);
  }, [cart]);

  const abortTransaction = () => {
    setCart([]);
    removeCartData();
  };

  if (isPending)
    return (
      <div className="flex items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <section className="grid sm:grid-cols-[1fr_8rem] gap-4">
      {/* render products */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center">
        {products.length < 1 ? (
          <div className="text-center">
            <h1 className="text-lg font-medium tracking-wider">
              Ops! Products are empty
            </h1>
          </div>
        ) : (
          products.map((product) => {
            return (
              <Product
                key={product._id}
                product={product}
                cart={cart}
                handleProductIncrement={handleProductIncrement}
              />
            );
          })
        )}
      </div>

      {/* option buttons */}
      <div className="order-first sm:order-none">
        <div className="flex flex-wrap w-full gap-4 md:flex-col md:w-32 ">
          <AddProduct />

          <Checkout cart={cart} setCart={setCart} totalAmount={totalAmount} />

          <Button onClick={abortTransaction}>Abort Transaction</Button>
        </div>
      </div>
    </section>
  );
};
export default Products;
