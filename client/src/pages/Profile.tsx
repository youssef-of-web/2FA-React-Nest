import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { Button } from "../components/ui/button";
import { withAuth } from "../hoc/withAuth";
import { DisableOTPAction } from "../redux/actions/auth";
import TwoFactorDialog from "../components/TwoFactorDialog";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { fullname, otp_enabled, id } = useAppSelector(state => state.auth);
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const Enable2FA = (id: string) => {
    console.log(id);
  };

  const DisableRFA = (id: string) => {
    dispatch(DisableOTPAction({ id }))
      .unwrap()
      .then(() => alert("OTP disabled"))
      .catch(err => alert(err));
  };
  return (
    <div className="mt-4 flex items-center justify-center gap-y-6 flex-col">
      <h1 className="text-4xl">Welcome {fullname}</h1>
      {otp_enabled ? (
        <Button onClick={() => DisableRFA(id)}>Disable 2FA</Button>
      ) : (
        <Button onClick={() => setOpen(true)}>Enable 2FA</Button>
      )}

      <TwoFactorDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default withAuth(Profile);
