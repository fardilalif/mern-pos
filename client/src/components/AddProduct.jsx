import { queryClient } from "@/App.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Loader2 } from "lucide-react";
import { Form, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

export const addProduct = async (formData) => {
  try {
    await customFetch.post("/products", formData);
    queryClient.invalidateQueries(["products"]);
    return null;
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddProduct = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product Details</DialogTitle>
          <DialogDescription>
            Enter product description to add product.
          </DialogDescription>
          <div className="py-2">
            <section className="grid place-items-center">
              <Form
                method="POST"
                encType="multipart/form-data"
                className="grid w-full gap-4 items-center"
              >
                <div className="flex flex-col justify-center gap-y-1.5 w-full ">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" placeholder="Product Name" />
                </div>
                <div className="flex flex-col justify-center gap-y-1.5 w-full">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    name="description"
                    placeholder="Product Description"
                  />
                </div>
                <div className="flex flex-col justify-center gap-y-1.5 w-full">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    placeholder="Product Category"
                  />
                </div>
                <div className="flex flex-col justify-center gap-y-1.5 w-full">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Product Price"
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
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                      wait
                    </>
                  ) : (
                    " Add Product"
                  )}
                </Button>
              </Form>
            </section>
          </div>
        </DialogHeader>
        <DialogFooter></DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default AddProduct;
