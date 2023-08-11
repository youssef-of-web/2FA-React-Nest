import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { Button } from "../components/ui/button";
import { withAuth } from "../hoc/withAuth";
import { DisableOTPAction, GenOTPAction } from "../redux/actions/auth";
import TwoFactorDialog from "../components/TwoFactorDialog";
import { useToast } from "../components/ui/use-toast";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { fullname, otp_enabled, id } = useAppSelector(state => state.auth);
  const { toast } = useToast();
  const [open, setOpen] = useState<boolean>(false);
  const [urlOTP, setUrlOTP] = useState<string>("");
  const dispatch = useAppDispatch();
  const Enable2FA = (id: string) => {
    dispatch(GenOTPAction({ id }))
      .unwrap()
      .then(res => {
        setUrlOTP(res.otp_url);
        setOpen(true);
      })
      .catch(err =>
        toast({
          title: "Generate OTP failed",
          variant: "destructive",
        })
      );
  };

  const DisableRFA = (id: string) => {
    dispatch(DisableOTPAction({ id }))
      .unwrap()
      .then(() =>
        toast({
          title: "OTP disabled",
          variant: "default",
        })
      )
      .catch(err =>
        toast({
          title: "OTP failed",
          variant: "destructive",
        })
      );
  };
  return (
    <div className="mt-4 flex items-center justify-center gap-y-6 flex-col">
      <h1 className="text-4xl">Welcome {fullname}</h1>
      {otp_enabled ? (
        <Button onClick={() => DisableRFA(id)}>Disable 2FA</Button>
      ) : (
        <Button onClick={() => Enable2FA(id)}>Enable 2FA</Button>
      )}

      <TwoFactorDialog open={open} setOpen={setOpen} urlOTP={urlOTP} />
    </div>
  );
};

export default withAuth(Profile);
