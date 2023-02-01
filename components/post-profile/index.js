import AvatarComponent from "../avatar";
import EditModal from "../edit-modal";
import styles from "../../styles/styles.module.scss";

export default function PostProfile(props) {
  return (
    <section className={styles.postProfileContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <AvatarComponent user={props.currentUser} />
          <div className="d-flex flex-column mt-2 ms-3">
            <span className={styles.postProfileName}>
              {props.currentUser?.name}
            </span>
            <span className={styles.postProfileSubText}>
              {props.currentUser?.friends?.length} friends
            </span>
          </div>
        </div>
        <EditModal
          currentUser={props.currentUser}
          currentUserFetch={props.currentUserFetch}
          postsFetch={props.postsFetch}
          updateUser={props.updateUser}
        />
      </div>
      <span className={styles.divisor} />
    </section>
  );
}
