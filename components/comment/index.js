import AvatarComponent from "../avatar";
import styles from "../../styles/styles.module.scss";
import Link from "next/link";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import IconButton from "@mui/material/IconButton";

export default function Comment(props) {
  const isCurrentUserComment = () => {
    return props.currentUser?._id === props.comment.user.id;
  };

  const commentCreatedDate = new Date(props.comment.createdAt);
  const f = new Intl.DateTimeFormat("en-us", {
    dateStyle: "long",
    timeStyle: "short",
  });

  const handleDeleteCommentClick = async () => {
    await props.removeCommentService(props.post.id, props.comment.id);
    await props.fetchComments();
  };

  return (
    <>
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
        {isCurrentUserComment() && (
          <IconButton
            sx={{ width: 10, height: 10, color: "#ef5350" }}
            onClick={async () => await handleDeleteCommentClick()}
          >
            <RemoveCircleIcon fontSize="small" />
          </IconButton>
        )}
      </div>
      <span className={styles.commentDate}>
        <span className="me-3 fw-bolder" role="button">
          Like
        </span>
        {f.format(commentCreatedDate)}
      </span>
    </>
  );
}
