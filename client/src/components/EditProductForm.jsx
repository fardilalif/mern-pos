import { queryClient } from "@/App.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import customFetch from "@/utils/customFetch.js";
import { Loader2 } from "lucide-react";
import { Form, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";

export const editProduct = async (formData) => {
  try {
    const data = Object.fromEntries(formData);
    const productId = data.productId;
    await customFetch.patch(`/products/${productId}`, formData);
    queryClient.invalidateQueries(["products"]);
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const EditProductForm = ({ productId, product }) => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Form
      method="POST"
      encType="multipart/form-data"
      className="grid w-full gap-4 items-center"
    >
      {/* store product id */}
      <input type="hidden" name="productId" value={productId} />
      <div className="flex flex-col justify-center gap-y-1.5 w-full ">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          placeholder="Product Name"
          defaultValue={product.name}
        />
      </div>
      <div className="flex flex-col justify-center gap-y-1.5 w-full">
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          placeholder="Product Description"
          defaultValue={product.description}
        />
      </div>
      <div className="flex flex-col justify-center gap-y-1.5 w-full">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          name="category"
          placeholder="Product Category"
          defaultValue={product.category}
        />
      </div>
      <div className="flex flex-col justify-center gap-y-1.5 w-full">
        <Label htmlFor="price">Price</Label>
        <Input
          type="number"
          id="price"
          name="price"
          placeholder="Product Price"
          defaultValue={product.price}
        />
      </div>
      <div className="flex flex-col justify-center gap-y-1.5 w-full">
        <Label htmlFor="image">Image</Label>
        <Input
          type="file"
          id="image"
          name="image"
          accept="image/png, image/jpeg"
        />
      </div>
      <Button
        type="submit"
        name="intent"
        value="edit product"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </>
        ) : (
          "Edit Product"
        )}
      </Button>
    </Form>
  );
};
export default EditProductForm;
