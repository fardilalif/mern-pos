import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
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
    await customFetch.post("/auth/login", data);
    toast.success("Login successful");
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Login = () => {
  const form = useForm({ defaultValues: { email: "", password: "" } });

  return (
    <div className="min-h-[100vh] grid place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <Form {...form}>
            <ReactRouterForm
              method="POST"
              className="grid w-full gap-4 items-center"
            >
              <FormFieldComp
                form={form}
                name="email"
                type="email"
                placeholder="Email"
              />
              <FormFieldComp
                form={form}
                name="password"
                type="password"
                required={true}
                placeholder="Password"
              />
              <Button type="submit" className="mt-2">
                Login
              </Button>
            </ReactRouterForm>
          </Form>
        </CardContent>
        <CardFooter>
          Need an account?{" "}
          <Button asChild variant="link" className="pl-2">
            <Link to="/register">Register</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
export default Login;
