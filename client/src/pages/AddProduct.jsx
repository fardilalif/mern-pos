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
import { useState } from "react";
import { Form } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "./../utils/customFetch";

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
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="">Add Product</Button>
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
                  <Input type="file" id="image" name="image" />
                </div>
                <Button
                  type="submit"
                  name="intent"
                  value="add product"
                  onClick={() => setOpen(!open)}
                >
                  Add Product
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
