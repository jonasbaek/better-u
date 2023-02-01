import Avatar from "@mui/material/Avatar";
import Link from "next/link";
import Image from "next/image";

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
        {!!props.user?.avatar ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${props.user?.avatar}`}
            className="text-center"
            alt="Profile photo"
            fill
          />
        ) : null}
        {props.text}
      </Avatar>
    </Link>
  );
}
