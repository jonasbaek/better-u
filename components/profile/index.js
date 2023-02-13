import styles from "../../styles/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import AvatarComponent from "../avatar";
import EditProfileModal from "../edit-profile-modal";
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

  const SumLikesFromPosts = () => {
    const userPosts = props.user?.posts;
    const totalLikes = userPosts?.reduce(
      (sum, post) => sum + post.likes.length,
      0
    );
    return totalLikes;
  };

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
    await props.currentUserFetch.mutate();
  };

  const handleClose = async () => {
    setSnackBarState({ ...snackBarState, open: false });
    await props.addOrRemoveFriendService(
      props?.user?._id,
      null,
      props.refreshData
    );
    await props.currentUserFetch.mutate();
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
        <div className="d-flex flex-wrap">
          <Avatar
            sx={{
              width: 150,
              height: 150,
            }}
          >
            {!!props.user?.avatar ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${props.user?.avatar}`}
                className="text-center"
                alt="Profile photo"
                fill
              />
            ) : null}
          </Avatar>
          <div className="ms-4 fw-bold lh-1">
            <h1 className="mt-2">{props.user.name}</h1>
            <p className="text-secondary mb-4 mt-3 ms-1">
              {props.user?.description}
            </p>
            <div className={styles.profileSubContainer}>
              <span>{props.user?.friends?.length} friends</span>
              <span>{SumLikesFromPosts()} likes</span>
              <span>{props.user?.posts?.length} posts</span>
            </div>
            <div className="d-flex pb-5">
              {props.user?.friends?.map((friend, i) =>
                i < 5 ? (
                  <div
                    key={friend._id}
                    className={`${
                      i % 2 === 0
                        ? "position-absolute ms-3"
                        : "position-relative"
                    }`}
                  >
                    <AvatarComponent
                      height={35}
                      width={35}
                      user={friend.user}
                    />
                  </div>
                ) : null
              )}
            </div>
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
          <EditProfileModal
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
