import Avatar from "@mui/material/Avatar";
import styles from "../../styles/styles.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import SnackBarComponent from "../snack-bar";
import { useState } from "react";

export default function Post(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const openSettings = Boolean(anchorEl);

  const [snackBar, setSnackBar] = useState({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = snackBar;

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const handleClick = () => {
    setSnackBar({ ...snackBar, open: true });
    props.addOrRemoveFriend(props.post.user.id);
  };

  const handleClose = () => {
    setSnackBar({ ...snackBar, open: false });
    props.addOrRemoveFriend(props.post.user.id);
  };

  const isCurrentUserPost = () => {
    return props.currentUser._id === props.post?.user?.id;
  };

  const isFriendWithPostOwner = () => {
    const friendListsFromPostOwner = props.post?.user?.friends;
    return friendListsFromPostOwner.some(
      (friend) => friend.user === props.currentUser._id
    );
  };

  const postCreatedDate = new Date(props.post.createdAt);
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "full",
  });

  return (
    <section className={styles.postContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Avatar sx={{ width: 50, height: 50 }}>
            {props.post?.user?.name}
          </Avatar>
          <div className="d-flex flex-column mt-2">
            <span className={styles.postName}>{props.post?.user?.name}</span>
            <span className={styles.postDate}>{f.format(postCreatedDate)}</span>
          </div>
        </div>
        <div className="d-flex">
          {!isCurrentUserPost() && (
            <IconButton
              onClick={() => {
                handleClick();
              }}
            >
              {isFriendWithPostOwner() ? (
                <PersonRemoveIcon />
              ) : (
                <PersonAddIcon />
              )}
            </IconButton>
          )}
          {isCurrentUserPost() && (
            <>
              <IconButton
                onClick={handleClickSettings}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={openSettings ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openSettings ? "true" : undefined}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={openSettings}
                onClose={handleCloseSettings}
                onClick={handleCloseSettings}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem onClick={() => props.removePost(props.post.id)}>
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
        <SnackBarComponent
          handleClose={handleClose}
          anchorOrigin={{ vertical, horizontal }}
          open={open}
          onClose={() => {
            setSnackBar({ ...snackBar, open: false });
          }}
          message="Unfriended!"
        />
      </div>
      <p className={styles.postText}>{props.post?.text}</p>
    </section>
  );
}
