import { queryClient } from "@/App.jsx";
import { editProduct } from "@/components/EditProductForm.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AddProduct, EditProductForm } from "../components";
import { addProduct } from "../components/AddProduct.jsx";
import { Checkout, Loading, Product } from "./../components";
import customFetch from "./../utils/customFetch";
import {
  getCartData,
  removeCartData,
  saveCartData,
} from "./../utils/localStorage";

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

  if (request.method === "POST") return await addProduct(formData);
  else if (request.method === "PATCH") return await editProduct(formData);
  else if (request.method === "DELETE") return await deleteProduct(formData);

  return null;
};

const deleteProduct = async (formData) => {
  const result = await withReactContent(Swal).fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (result.isConfirmed) {
    try {
      const data = Object.fromEntries(formData);
      const productId = data.productId;

      await customFetch.delete(`/products/${productId}`);
      queryClient.invalidateQueries(["products"]);

      return null;
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  }

  return null;
};

const Products = () => {
  const { isPending, data } = useQuery(productsQuery);
  const products = data?.products;
  const [totalAmount, setTotalAmount] = useState(0);
  const [cart, setCart] = useState(getCartData() || []);

  // handles add product to cart when click on product
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

  // saves cart data to localStorage whenever cart state changes
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
    <section className="flex gap-4">
      {/* render products */}
      <div className="grid gap-4 grid-cols-3 sm:grid-cols-5 md:grid-cols-7">
        {products.length < 1 ? (
          <div className="text-center">
            <h1 className="text-lg font-medium tracking-wider">
              Ops! Products are empty
            </h1>
          </div>
        ) : (
          products.map((product) => {
            return (
              <Dialog key={product._id}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Product
                      product={product}
                      cart={cart}
                      handleProductIncrement={handleProductIncrement}
                    />
                  </ContextMenuTrigger>
                  <ContextMenuContent className="w-40">
                    <DialogTrigger asChild>
                      <ContextMenuItem className="flex items-center justify-between">
                        Edit Product <Pencil size={15} />
                      </ContextMenuItem>
                    </DialogTrigger>
                    <ContextMenuItem>
                      <Form method="delete" className="min-w-full">
                        <input
                          type="hidden"
                          name="productId"
                          value={product._id}
                        ></input>
                        <button
                          type="submit"
                          className="text-destructive w-full flex items-center justify-between"
                        >
                          Delete Product
                          <Trash2 size={15} />
                        </button>
                      </Form>
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Product Details</DialogTitle>
                    <DialogDescription>
                      Enter new product description to add product.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-2">
                    <EditProductForm
                      productId={product._id}
                      product={product}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            );
          })
        )}
      </div>

      {/* option buttons */}
      <div>
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
