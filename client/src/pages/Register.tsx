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
import { useAppDispatch } from "../hook";
import { RegisterSchema, RegisterValues } from "../lib/validation";
import { RegisterAction } from "../redux/actions/auth";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

const Register: FC<RegisterProps> = () => {
  const navigation = useNavigate();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {},
  });
  const dispatch = useAppDispatch();
  const onSubmit = (data: RegisterValues) => {
    dispatch(RegisterAction({ data: data }))
      .unwrap()
      .then(() => {
        navigation("/login");
      })
      .catch(err => {
        alert(err);
      });
  };
  return (
    <div className="flex flex-col gap-y-4 w-[500px] mx-auto mt-24">
      <h1 className="text-2xl font-bold">Registration</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fullname</FormLabel>
                <FormControl>
                  <Input placeholder="tensorcode" {...field} />
                </FormControl>
                <FormMessage />
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
                  <Input placeholder="email@domain.com" {...field} />
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
                  <Input placeholder="**********" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">SignUp</Button>
        </form>
      </Form>
    </div>
  );
};

export default Register;
