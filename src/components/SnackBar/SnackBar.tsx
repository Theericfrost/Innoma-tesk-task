import { Snackbar } from "@mui/material";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { snackBarState } from "store/index";

const SnackBar = () => {
  const dispatch = useDispatch();

  const snackBarOpen = useSelector(snackBarState.selectors.snackBarOpen);
  const snackBarMessage = useSelector(snackBarState.selectors.snackBarMessage);

  const closeSnackBar = useCallback(() => {
    dispatch(snackBarState.snackBarSlice.actions.close());
  }, [dispatch]);

  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={6000}
      onClose={closeSnackBar}
      message={snackBarMessage}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
};

export default SnackBar;
