import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hook";

export const withAuth = WrappedComponent => {
  const AuthComponent = props => {
    const { id, otp_enabled, otp_validated } = useAppSelector(
      state => state.auth
    );
    const navigate = useNavigate();
    useEffect(() => {
      if (id === "") {
        navigate("/login");
      } else {
        if (otp_enabled && !otp_validated) {
          navigate("/two-factor-validation");
        }
      }
    }, [id]);
    return <WrappedComponent {...props} />;
  };
  return AuthComponent;
};
