import { FC } from "react";
import TwoFactorAuth from "./TwoFactorAuth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "./ui/dialog";

interface TwoFactorDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}

const TwoFactorDialog: FC<TwoFactorDialogProps> = ({ open, setOpen }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[700px]">
        <DialogHeader>
          <DialogDescription>
            <TwoFactorAuth />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default TwoFactorDialog;
