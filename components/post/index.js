import Avatar from "@mui/material/Avatar";
import styles from "../../styles/styles.module.scss";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { IconButton, InputBase } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import EditIcon from "@mui/icons-material/Edit";
import toast from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import axios from "axios";
import useSWRMutation from "swr/mutation";
import { useState } from "react";

export default function Post(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.postContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Avatar>{props.post?.user?.name}</Avatar>
          <span className={styles.postName}>{props.post?.user?.name}</span>
        </div>
        <div className="d-flex">
          <IconButton>
            <PersonAddIcon />
          </IconButton>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
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
        </div>
      </div>
      <p className={styles.postText}>{props.post?.text}</p>
    </div>
  );
}
