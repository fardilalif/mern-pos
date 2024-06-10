import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormField from "./../components/FormField";
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
  return (
    <div className="min-h-[100vh] grid place-items-center">
      <Card className="w-[350px] shadow-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <Form method="POST" className="grid gap-4 items-center">
            <FormField
              type="email"
              id="email"
              name="email"
              label="email"
              placeholder="example@domain.com"
              required={true}
            />
            <FormField
              type="password"
              id="password"
              name="password"
              label="password"
              required={true}
            />
            <Button type="submit">Login</Button>
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
