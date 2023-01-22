import { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../styles/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import SnackBarComponent from "../snack-bar";

export default function FriendList(props) {
  const [snackBar, setSnackBar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = snackBar;

  const [friend, setFriend] = useState();

  const handleClick = (friend) => {
    setSnackBar({ ...snackBar, open: true });
    setFriend(friend);
    props.addOrRemoveFriend(friend.user._id);
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false });
    props.addOrRemoveFriend(friend.user._id);
  };

  return (
    <section className={styles.friendListContainer}>
      <span className={styles.friendListTitle}>Friend List</span>
      {props.currentUser?.friends?.map((friend, i) => {
        return (
          <div key={i}>
            <div className="mt-3 d-flex justify-content-between">
              <div className="d-flex">
                <Avatar sx={{ width: 55, height: 55 }}>
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
      <SnackBarComponent
        handleClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={() => {
          setSnackBar({ ...snackBar, open: false });
        }}
        message="Unfriended!"
      />
    </section>
  );
}
