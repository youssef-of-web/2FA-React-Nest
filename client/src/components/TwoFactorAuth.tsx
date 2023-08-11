import { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { QRCodeCanvas } from "qrcode.react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GenOTPSchema, GenOTPValues } from "../lib/validation";

interface TwoFactorAuthProps {}

const TwoFactorAuth: FC<TwoFactorAuthProps> = ({}) => {
  const form = useForm<GenOTPValues>({
    resolver: zodResolver(GenOTPSchema),
    defaultValues: {},
  });

  const VerifyOtpCode = (values: Omit<GenOTPValues, "token">) => {
    console.log(values);
  };
  return (
    <div>
      <div className="mt-4">
        <div className="bg-white p-8 rounded shadow">
          <h1 className="text-2xl font-bold mb-6">
            Two-Factor Authentication (2FA) Setup
          </h1>
          <p className="mb-4">
            We take security seriously! To enhance the security of your account,
            we require you to set up Two-Factor Authentication (2FA).
          </p>
          <p className="mb-4">
            2FA adds an extra layer of protection to your account by requiring
            you to enter a unique verification code, in addition to your
            password, each time you sign in.
          </p>
          <p className="mb-6">
            To get started, you will need to install the Google Authenticator
            app on your mobile device. Google Authenticator generates the
            verification codes for your account.
          </p>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold mb-2">
                How to set up 2FA using Google Authenticator:
              </h2>
              <ol className="list-decimal ml-6">
                <li className="mb-2">
                  Open the Google Authenticator app on your mobile device.
                </li>
                <li className="mb-2">
                  Scan the QR code displayed on the screen with the app.
                </li>
                <li className="mb-2">
                  Once scanned, Google Authenticator will generate a 6-digit
                  verification code.
                </li>
                <li className="mb-2">
                  Enter the verification code in the box below to complete the
                  setup.
                </li>
              </ol>
            </div>
            <QRCodeCanvas value={""} />
          </div>

          <Form {...form}>
            <form className="mt-8" onSubmit={form.handleSubmit(VerifyOtpCode)}>
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter the 6-digit verification code:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="******"
                        type="text"
                        id="verificationCode"
                        className="w-full p-2 rounded border border-gray-400 focus:outline-none focus:ring focus:border-blue-500"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="ml-3 mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-500"
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
