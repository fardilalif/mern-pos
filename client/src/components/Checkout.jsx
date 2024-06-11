import { Button } from "@/components/ui/button.jsx";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import CartItem from "./CartItem.jsx";

const Checkout = ({ cart, setCart, totalAmount }) => {
  const updateQuantity = (itemId, quantity) => {
    setCart((prevCart) => {
      if (quantity < 1) return prevCart.filter((cart) => cart._id !== itemId);
      else
        return prevCart.map((cart) =>
          cart._id === itemId ? { ...cart, quantity } : cart
        );
    });
  };

  const deleteCartItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem._id !== itemId)
    );
  };

  const generateQuantityOptions = (currentQuantity) => {
    const maxQuantity = currentQuantity + 10;
    const options = Array.from({ length: maxQuantity }, (_, i) => i + 1);
    return options;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Checkout</Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px] sm:min-w-[700px]">
        <SheetHeader>
          <SheetTitle>Checkout</SheetTitle>
          <SheetDescription>Edit cart before payment .</SheetDescription>
        </SheetHeader>
        <div>
          <div className="grid gap-4 py-4">
            {cart.length < 1 ? (
              <div className="text-center text-lg ">
                <p>Cart is empty :(</p>
              </div>
            ) : (
              cart.map((cartItem) => {
                return (
                  <CartItem
                    key={cartItem._id}
                    cartItem={cartItem}
                    deleteCartItem={deleteCartItem}
                    updateQuantity={updateQuantity}
                    generateQuantityOptions={generateQuantityOptions}
                  />
                );
              })
            )}
          </div>

          <div className="flex items-center justify-end py-4">
            <span className="text-lg font-bold">
              Total Amount: {currencyFormatter(totalAmount)}
            </span>
          </div>
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Pay</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
export default Checkout;
