import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { Snackbar } from "@mui/material";
import { IconButton } from "@mui/material";

export default function FriendList(props) {
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = snackBarState;

  const [friend, setFriend] = useState();

  const handleClick = (friend) => {
    setSnackBarState({ ...snackBarState, open: true });
    setFriend(friend);
    props.addOrRemoveFriend(friend.user._id);
  };

  const handleClose = () => {
    setSnackBarState({ ...snackBarState, open: false });
    props.addOrRemoveFriend(friend.user._id);
  };

  const action = (
    <Fragment>
      <Button color="primary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={() => {
          setSnackBarState({ ...snackBarState, open: false });
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <section className={styles.friendListContainer}>
      <span className={styles.friendListTitle}>Friend List</span>
      {props.currentUser?.friends?.map((friend, i) => {
        return (
          <div key={i}>
            <div className="mt-3 d-flex justify-content-between">
              <div className="d-flex">
                <Avatar sx={{ width: 40, height: 40 }}>
                  {friend?.user.name}
                </Avatar>
                <div className="d-flex flex-column mt-2 ms-3">
                  <span className={styles.postProfileName}>
                    {friend?.user.name}
                  </span>
                  <span className={styles.postProfileSubText}>
                    {friend?.user.username}
                  </span>
                </div>
              </div>
              <IconButton
                onClick={() => {
                  handleClick(friend);
                }}
              >
                <PersonRemoveIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={() => {
          setSnackBarState({ ...snackBarState, open: false });
        }}
        message="Unfriended!"
        action={action}
      />
    </section>
  );
}
