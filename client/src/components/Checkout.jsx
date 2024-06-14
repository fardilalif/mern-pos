import { queryClient } from "@/App.jsx";
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
import customFetch from "@/utils/customFetch.js";
import { removeCartData } from "@/utils/localStorage.js";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import CartItem from "./CartItem.jsx";
import Receipt from "./Receipt.jsx";

const Checkout = ({ cart, setCart, totalAmount }) => {
  const [receipt, setReceipt] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const componentRef = useRef(null);
  const [triggerPrint, setTriggerPrint] = useState(false);

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

  const saveTransaction = async () => {
    try {
      const { data } = await customFetch.post("/sales", { items: cart });
      setReceiptData(data.sale);
      withReactContent(Swal)
        .fire({
          title: "Payment Success!!",
          icon: "success",
          confirmButtonColor: "#16A34A",
          confirmButtonText: "Print Receipt",
          showCancelButton: true,
          cancelButtonText: "OK",
        })
        .then((result) => {
          if (result.isConfirmed) {
            setTriggerPrint(true); // Set triggerPrint to true
          }

          // clear cart data after successful payment
          setCart([]);
          removeCartData();
        });

      // invalidate all sales and total
      queryClient.invalidateQueries({ queryKey: ["allSales"] });
      queryClient.invalidateQueries({ queryKey: ["totalSales"] });
    } catch (error) {
      console.log(error);
      withReactContent(Swal).fire({
        title: "Payment Failed!!",
        icon: "error",
        confirmButtonColor: "#16A34A",
      });
    }
  };

  useEffect(() => {
    console.log(receiptData);
    if (triggerPrint && receiptData) {
      console.log("handle print");
      handlePrint();
      setTriggerPrint(false); // Reset the trigger
    }
  }, [triggerPrint, receiptData]);

  const handleOnBeforeGetContent = async () => {
    console.log("handleOnBeforeGetContent");
    console.log(receiptData);
    const response = await customFetch.get(`/sales/${receiptData._id}`);
    console.log(response.data);
    setReceipt(response.data);
    return response.data;
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onBeforeGetContent: () => handleOnBeforeGetContent(),
  });

  const payment = () => {
    withReactContent(Swal)
      .fire({
        title: "Payment Confirmation",
        html: `Total amount is 
              <span style='font-weight:700;font-style:italic'>${currencyFormatter(
                totalAmount
              )}</span>. 
        
              <div style='margin:10px 0'>
                <p style='font-weight:700;'>Cart items: </p>
                <div style='display: flex;flex-direction: column;text-align:center;align-items: flex-start; text-align: left;'>
                  ${cart
                    .map(
                      (item) =>
                        `<span style='display:inline-block;margin:2px 0' key=${item._id}>> ${item.name} x ${item.quantity}</span>`
                    )
                    .join(" ")}
                </div>
              </div>

              Please click pay to confirm.`,
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Pay",
        confirmButtonColor: "#16A34A",
      })
      .then((result) => {
        if (result.isConfirmed) {
          saveTransaction();
        }
      });
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button>Checkout</Button>
        </SheetTrigger>
        <SheetContent className="min-w-[500px] sm:min-w-[700px]">
          <SheetHeader>
            <SheetTitle>Checkout</SheetTitle>
            <SheetDescription>Edit cart before payment.</SheetDescription>
          </SheetHeader>
          <div>
            <div className="grid gap-4 py-4">
              {cart.length < 1 ? (
                <div className="text-center text-lg ">
                  <p className="text-muted-foreground">Cart is empty :(</p>
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

            {cart.length > 0 && (
              <div className="flex items-center justify-end py-4">
                <span className="text-lg font-bold">
                  Total Amount: {currencyFormatter(totalAmount)}
                </span>
              </div>
            )}
          </div>

          <SheetFooter>
            <SheetClose asChild>
              <Button
                type="submit"
                disabled={cart.length < 1}
                onClick={() => payment()}
              >
                Pay
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      {/* receipt component */}
      <div style={{ display: "none" }}>
        <Receipt ref={componentRef} receiptData={receipt} />
      </div>
    </>
  );
};
export default Checkout;
