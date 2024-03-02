import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form.jsx";
import { Input } from "@/components/ui/input.jsx";
import { useForm } from "react-hook-form";
import { Link, Form as ReactRouterForm, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "./../utils/customFetch";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration successful");
    return redirect("/login");
  } catch (error) {
    console.log(error);
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
            <ReactRouterForm
              method="POST"
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="your name" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        required
                        placeholder="test@gmail.com"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" required {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="mt-2">
                Submit
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
