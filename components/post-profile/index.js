import Avatar from "@mui/material/Avatar";
import styles from "../../styles/styles.module.scss";

export default function PostProfile(props) {
  return (
    <section className={styles.postProfileContainer}>
      <h1></h1>
      <div className="d-flex">
        <Avatar sx={{ width: 55, height: 55 }}>
          {props.currentUser?.name}
        </Avatar>
        <div className="d-flex flex-column mt-2">
          <span className={styles.postProfileName}>
            {props.currentUser?.name}
          </span>
          <span className={styles.postProfileSubText}>
            {props.currentUser?.friends.length} friends
          </span>
        </div>
      </div>
    </section>
  );
}
