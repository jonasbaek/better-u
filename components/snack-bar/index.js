import { Snackbar } from "@mui/material";
import { Fragment } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";

export default function SnackBarComponent(props) {
  const action = (
    <Fragment>
      <Button color="primary" size="small" onClick={() => props.handleClose()}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          props.onClose();
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );
  return (
    <Snackbar
      anchorOrigin={props.anchorOrigin}
      open={props.open}
      autoHideDuration={6000}
      onClose={() => props.handleClose()}
      message={props.message}
      action={action}
    />
  );
}
