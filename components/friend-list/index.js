import styles from "../../styles/styles.module.scss";
import Avatar from "@mui/material/Avatar";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { IconButton } from "@mui/material";

export default function FriendList(props) {
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
                  props.addOrRemoveFriend(friend.user._id);
                }}
              >
                <PersonRemoveIcon />
              </IconButton>
            </div>
          </div>
        );
      })}
    </section>
  );
}
