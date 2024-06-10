import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, Link, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import FormField from "./../components/FormField";
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
  return (
    <div className="min-h-[100vh] grid place-items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Register</CardTitle>
        </CardHeader>
        <CardContent className="pb-0">
          <Form method="POST" className="grid gap-4 items-center">
            <FormField
              id="name"
              name="name"
              placeholder="Name"
              label="name"
              required={true}
            />
            <FormField
              id="email"
              name="email"
              placeholder="Email"
              label="email"
              type="email"
              required={true}
            />
            <FormField
              id="password"
              name="password"
              placeholder="Password"
              label="password"
              type="password"
              required={true}
            />
            <Button type="submit">Register</Button>
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
