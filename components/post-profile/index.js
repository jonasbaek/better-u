import AvatarComponent from "../avatar";
import EditModal from "../edit-modal";
import styles from "../../styles/styles.module.scss";

export default function PostProfile(props) {
  const SumLikesFromPosts = () => {
    const ownPosts = props.currentUser?.posts;
    const totalLikes = ownPosts.reduce(
      (sum, post) => sum + post.likes.length,
      0
    );
    return totalLikes;
  };

  return (
    <section className={styles.postProfileContainer}>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <AvatarComponent user={props.currentUser} />
          <span className={styles.postProfileName}>
            {props.currentUser?.name}
          </span>
        </div>
        <EditModal
          currentUser={props.currentUser}
          currentUserFetch={props.currentUserFetch}
          postsFetch={props.postsFetch}
          updateUser={props.updateUser}
        />
      </div>
      <span className={styles.divisor} />
      <span className={styles.postProfileSubText}>
        {props.currentUser?.description}
        <div className="d-flex justify-content-between mt-4">
          <span className={styles.postProfileSubText}>
            {props.currentUser?.friends?.length} friends
          </span>
          <span className={styles.postProfileSubText}>
            {SumLikesFromPosts()} likes
          </span>
          <span className={styles.postProfileSubText}>
            {props.currentUser?.posts?.length} posts
          </span>
        </div>
      </span>
    </section>
  );
}
