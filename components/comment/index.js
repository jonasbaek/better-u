import AvatarComponent from "../avatar";
import styles from "../../styles/styles.module.scss";
import Link from "next/link";

export default function Comment(props) {
  return (
    <div className="d-flex align-items-top">
      <AvatarComponent user={props.comment.user} />
      {props.comment.text && (
        <>
          <div className={styles.commentContainer}>
            <Link
              href={`/${props.comment.user.id}`}
              className="text-decoration-none text-black fw-bold"
            >
              {props.comment.user.name}
            </Link>
            <div className="text-break mt-1">{props.comment.text}</div>
          </div>
        </>
      )}
    </div>
  );
}
