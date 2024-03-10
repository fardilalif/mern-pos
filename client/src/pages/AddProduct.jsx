import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "./../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  try {
    await customFetch.post("/products", formData);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const AddProduct = () => {
  return (
    <section className="grid place-items-center">
      <Card className="w-[60%] shadow-md">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
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
            <Button>Submit</Button>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default AddProduct;
