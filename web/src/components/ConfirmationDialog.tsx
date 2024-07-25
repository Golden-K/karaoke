import { Button, DialogActions } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

type ConfirmationDialogProps = {
  isOpen: boolean;
  handleConfirm: () => void;
  handleCancel: () => void;
  title: string;
  description?: string;
};

export const ConfirmationDialog = ({
  isOpen,
  handleConfirm,
  handleCancel,
  title,
  description,
}: ConfirmationDialogProps) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{description}</DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Yes
        </Button>
        <Button onClick={handleCancel}>No</Button>
      </DialogActions>
    </Dialog>
  );
};
