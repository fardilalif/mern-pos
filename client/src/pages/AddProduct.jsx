import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Form } from "@/components/ui/form.jsx";
import { useForm } from "react-hook-form";
import { Form as ReactRouterForm, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormFieldComp } from "../components";
import customFetch from "./../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();

  console.log(formData);
  // check for image file

  try {
    await customFetch.post("/products", formData);
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};
const AddProduct = () => {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      category: "",
    },
  });

  return (
    <section>
      <Card className="w-[70%] mx-auto">
        <CardHeader>
          <CardTitle>Add Product</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <ReactRouterForm method="POST" className="grid w-full gap-4">
              <FormFieldComp
                form={form}
                name="name"
                formLabel="product name"
                placeholder="Name"
                required={true}
              />
              <FormFieldComp
                form={form}
                name="description"
                formLabel="product description"
                placeholder="Description"
                required={true}
              />
              <FormFieldComp
                form={form}
                name="category"
                formLabel="product category"
                placeholder="Category"
                required={true}
              />
              <FormFieldComp
                form={form}
                type="number"
                min="1"
                name="price"
                formLabel="product price"
                placeholder="Price"
                required={true}
              />
              <FormFieldComp
                form={form}
                type="file"
                name="image"
                formLabel="product image"
                required={true}
              />
              <Button type="submit" className="mt-2">
                Submit
              </Button>
            </ReactRouterForm>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};
export default AddProduct;
