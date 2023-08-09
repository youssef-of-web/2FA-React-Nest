import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hook";
import { LogOutAction } from "../redux/actions/auth";
import { Button } from "./ui/button";

function Layout() {
  const { id } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const Logout = (id: string) => {
    dispatch(LogOutAction({ id }))
      .unwrap()
      .then(() => {
        window.location.href = "/login";
        localStorage.clear();
      })
      .catch(err => alert(err));
  };

  return (
    <div className="max-w-7xl mx-auto mt-5 bg-slate-50 h-screen">
      {id && <Button onClick={() => Logout(id)}>Logout</Button>}
      <Outlet />
    </div>
  );
}

export default Layout;
