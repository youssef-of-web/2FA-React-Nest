import { useForm } from "react-hook-form";
import { withAuth } from "../hoc/withAuth";
import { useAppDispatch, useAppSelector } from "../hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenOTPSchema, GenOTPValues } from "../lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import { ValidateOTPAction } from "../redux/actions/auth";
import { useToast } from "../components/ui/use-toast";
import { useNavigate } from "react-router-dom";

function TwoFactorAuth() {
  const { id, otp_validated } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const navigation = useNavigate();
  const form = useForm<GenOTPValues>({
    resolver: zodResolver(GenOTPSchema),
    defaultValues: {
      id: id,
    },
  });

  const ValidateOTP = (values: GenOTPValues) => {
    dispatch(ValidateOTPAction({ id: values.id, token: values.token }))
      .unwrap()
      .then(res => {
        navigation("/profile");
      })
      .catch(err => {
        toast({
          title: "Failed Request",
          description: err,
          variant: "destructive",
        });
      });
  };

  if (otp_validated) {
    return (window.location.href = "/profile");
  }

  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-semibold mb-4">
          Two-Factor Authentication
        </h1>
        <p className="text-gray-600 mb-6">
          Open your authenticator app and enter the code below:
        </p>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(ValidateOTP)}>
            <FormField
              control={form.control}
              name="token"
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
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            >
              Submit
            </button>
          </form>
        </Form>
        <p className="mt-4 text-sm text-gray-500">
          If you don't have an authenticator app, you can{" "}
          <a href="#" className="text-blue-500 hover:underline">
            learn more about setting it up
          </a>
          .
        </p>
      </div>
    </div>
  );
}

export default withAuth(TwoFactorAuth);
