import Avatar from "@mui/material/Avatar";
import Link from "next/link";

export default function AvatarComponent(props) {
  const userId = props.user._id ? props.user._id : props.user.id;

  return (
    <Link href={`/${userId}`} className="text-decoration-none">
      <Avatar
        sx={{
          width: props.width ? props.width : 45,
          height: props.height ? props.height : 45,
        }}
      >
        {props.user.username}
      </Avatar>
    </Link>
  );
}
