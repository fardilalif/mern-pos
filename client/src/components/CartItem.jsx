import { Button } from "@/components/ui/button.jsx";
import { currencyFormatter } from "@/utils/currencyFormatter.js";
import { MdDeleteOutline } from "react-icons/md";
import Divider from "./Divider.jsx";
import SelectInput from "./SelectInput.jsx";

const CartItem = ({
  cartItem,
  updateQuantity,
  deleteCartItem,
  generateQuantityOptions,
}) => {
  return (
    <div className="grid gap-y-4">
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm">{cartItem.name}</p>
          <span className="text-xs text-muted-foreground">
            {cartItem.description}
          </span>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <span className="text-sm">Price:</span>
          <p className="text-xs font-bold">
            {currencyFormatter(cartItem.price)}
          </p>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-x-2 ">
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() =>
                updateQuantity(cartItem._id, parseInt(cartItem.quantity - 1))
              }
            >
              -
            </Button>
            <div className="w-20">
              <SelectInput
                options={generateQuantityOptions(cartItem.quantity)}
                data={cartItem}
                onValueChange={updateQuantity}
              />
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-6 w-6"
              onClick={() =>
                updateQuantity(cartItem._id, parseInt(cartItem.quantity + 1))
              }
            >
              +
            </Button>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <span className="text-sm">Total:</span>
          <p className="text-xs font-bold">
            {currencyFormatter(cartItem.price * cartItem.quantity)}
          </p>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => deleteCartItem(cartItem._id)}
        >
          <MdDeleteOutline className="h-4 w-4" />
        </Button>
      </div>
      <Divider />
    </div>
  );
};
export default CartItem;
