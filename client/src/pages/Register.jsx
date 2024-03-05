import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form.jsx";
import { useForm } from "react-hook-form";
import { Link, Form as ReactRouterForm, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { FormFieldComp } from "../components";
import customFetch from "./../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  const form = useForm({
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <div className="min-h-[100vh] grid place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <Form {...form}>
            <ReactRouterForm method="POST" className="grid w-full gap-4">
              <FormFieldComp
                form={form}
                name="name"
                placeholder="Name"
                required={true}
              />
              <FormFieldComp
                form={form}
                name="email"
                placeholder="Email"
                type="email"
              />
              <FormFieldComp
                form={form}
                type="password"
                name="password"
                placeholder="Password"
                required={true}
              />
              <Button type="submit" className="mt-2">
                Register
              </Button>
            </ReactRouterForm>
          </Form>
        </CardContent>
        <CardFooter>
          Already have an account?{" "}
          <Button asChild variant="link" className="pl-2">
            <Link to="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Register;
