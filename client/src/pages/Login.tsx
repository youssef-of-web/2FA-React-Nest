import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { LoginSchema, LoginValues } from "../lib/validation";
import { useAppDispatch } from "../hook";
import { LoginAction } from "../redux/actions/auth";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/ui/use-toast";

interface LoginProps {}

const Login: FC<LoginProps> = () => {
  const { toast } = useToast();
  const navigation = useNavigate();
  const form = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {},
  });

  const dispatch = useAppDispatch();
  const onSubmit = (data: LoginValues) => {
    dispatch(LoginAction({ data: data }))
      .unwrap()
      .then(() => {
        navigation("/profile");
      })
      .catch(err => {
        toast({
          title: "Login failed.",
          description: err,
          variant: "destructive",
        });
      });
  };
  return (
    <div className="flex flex-col gap-y-4 w-[500px] mx-auto mt-24">
      <h1 className="text-2xl font-bold">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="*********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button type="submit">SignIn</Button>
            <Link to={"/register"}>
              <Button variant={"link"} type="button">
                Create account
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
