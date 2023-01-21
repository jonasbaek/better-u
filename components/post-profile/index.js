import Avatar from "@mui/material/Avatar";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { IconButton } from "@mui/material";
import styles from "../../styles/styles.module.scss";

export default function PostProfile(props) {
  return (
    <section className={styles.postProfileContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <Avatar sx={{ width: 55, height: 55 }}>
            {props.currentUser?.name}
          </Avatar>
          <div className="d-flex flex-column mt-2 ms-3">
            <span className={styles.postProfileName}>
              {props.currentUser?.name}
            </span>
            <span className={styles.postProfileSubText}>
              {props.currentUser?.friends?.length} friends
            </span>
          </div>
        </div>
        <IconButton>
          <ManageAccountsIcon />
        </IconButton>
      </div>
      <span className={styles.divisor} />
    </section>
  );
}
