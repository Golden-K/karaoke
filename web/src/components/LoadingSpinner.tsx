import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";

type LoadingSpinnerProps = {
  isLoading: boolean;
};

export const LoadingSpinner = ({ isLoading }: LoadingSpinnerProps) => {
  return isLoading ? (
    <Modal
      open={true}
      aria-labelledby="loading"
      aria-describedby="loading-modal"
      style={styles.container}
    >
      <CircularProgress size={100} color="warning" />
    </Modal>
  ) : null;
};

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
};
