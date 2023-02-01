import styles from "../../styles/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import AvatarComponent from "../avatar";
import EditModal from "../edit-modal";
import { Snackbar } from "@mui/material";
import { useState, Fragment } from "react";
import Button from "@mui/material/Button";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Image from "next/image";

export default function Profile(props) {
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = snackBarState;

  const isCurrentUserProfile = () => {
    return props.currentUser?._id === props?.user?._id;
  };

  const isFriendWithProfileUser = () => {
    const friendListsFromProfileOwner = props.user?.friends;

    return friendListsFromProfileOwner.some(
      (friend) => friend.user._id === props.currentUser?._id
    );
  };

  const handleClick = async () => {
    setSnackBarState({ ...snackBarState, open: true });
    await props.addOrRemoveFriendService(
      props?.user?._id,
      null,
      props.refreshData
    );
  };

  const handleClose = async () => {
    setSnackBarState({ ...snackBarState, open: false });
    await props.addOrRemoveFriendService(
      props?.user?._id,
      null,
      props.refreshData
    );
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
    <section className={styles.profileContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Avatar
            sx={{
              width: 150,
              height: 150,
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${props.user?.avatar}`}
              className="text-center"
              alt="Profile photo"
              fill
            />
          </Avatar>
          <div className="ms-4 fw-bold lh-1">
            <h1 className="mt-2">{props.user.name}</h1>
            <p className="ms-1 text-secondary">
              {props.user?.friends.length} Friends
            </p>
            {props.user?.friends?.map((friend, i) => {
              return (
                <AvatarComponent
                  key={i}
                  height={35}
                  width={35}
                  user={friend.user}
                />
              );
            })}
          </div>
        </div>
        {!isCurrentUserProfile() ? (
          <IconButton className="mb-auto" onClick={handleClick}>
            {isFriendWithProfileUser() ? (
              <PersonRemoveIcon />
            ) : (
              <PersonAddIcon />
            )}
          </IconButton>
        ) : (
          <EditModal
            currentUser={props.currentUser}
            currentUserFetch={props.currentUserFetch}
            postsFetch={props.postsFetch}
            updateUser={props.updateUser}
            refreshData={props.refreshData}
          />
        )}
      </div>
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
