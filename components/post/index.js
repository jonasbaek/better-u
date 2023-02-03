import AvatarComponent from "../avatar";
import Image from "next/image";
import styles from "../../styles/styles.module.scss";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import EditPostModal from "../edit-post-modal";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function Post(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const openSettings = Boolean(anchorEl);

  const handleClickSettings = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseSettings = () => {
    setAnchorEl(null);
  };

  const isCurrentUserPost = () => {
    return props.currentUser?._id === props.post?.user?.id;
  };

  const isPostLikedFromCurrentUser = () => {
    const postLikesFromCurrentUser = props.currentUser?.likes;
    return postLikesFromCurrentUser.some(
      (like) => like.post === props?.post?.id
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
          <AvatarComponent user={props.post.user} />
          <div className="d-flex flex-column mt-2">
            <span className={styles.postName}>{props.post?.user?.name}</span>
            <span className={styles.postDate}>{f.format(postCreatedDate)}</span>
          </div>
        </div>
        <div className="d-flex">
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
                <MenuItem onClick={() => setOpenModal(true)}>
                  <ListItemIcon>
                    <EditIcon />
                  </ListItemIcon>
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={async () => {
                    await props.removePostService(
                      props.post.id,
                      props.currentUserFetch
                    );
                    handleCloseSettings();
                  }}
                >
                  <ListItemIcon>
                    <DeleteIcon />
                  </ListItemIcon>
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
      <p className={styles.postText}>{props.post?.text}</p>
      {props.post.image && (
        <Image
          src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/posts/${props.post.image}`}
          alt="Post image"
          className={styles.previewImage}
          width={100}
          height={100}
          layout="responsive"
        />
      )}
      <div className="d-flex mt-5">
        <div>
          <IconButton onClick={async () => await props.likePostService()}>
            {isPostLikedFromCurrentUser() ? (
              <FavoriteIcon />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
          {props.post?.likes?.length}
        </div>
        <div>
          <IconButton sx={{ ml: 4 }}>
            <ChatBubbleOutlineIcon />
          </IconButton>
          {props.post?.comments?.length}
        </div>
      </div>
      <EditPostModal
        post={props.post}
        updatePostService={props.updatePostService}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </section>
  );
}
