import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../hook";
import { Button } from "../components/ui/button";
import { withAuth } from "../hoc/withAuth";
import { DisableOTPAction, EnableOTPAction } from "../redux/actions/auth";

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const { fullname, otp_enabled, id } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const Enable2FA = (id: string) => {
    dispatch(EnableOTPAction({ id }))
      .unwrap()
      .then(() => alert("OTP enabled"))
      .catch(err => alert(err));
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
        <Button onClick={() => Enable2FA(id)}>Enable 2FA</Button>
      )}
    </div>
  );
};

export default withAuth(Profile);
