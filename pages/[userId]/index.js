import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import axios from "axios";
import Head from "next/head";
import NavBar from "../../components/nav-bar";
import Profile from "../../components/profile";
import useUsers from "../../customHooks/useUsers";
import toast from "react-hot-toast";

export const getServerSideProps = async ({ req, res, params }) => {
  try {
    const token = getCookie("jwt", { req, res });
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${params.userId}`,
      fetchOptions
    );

    if (!token) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    if (!data) {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }

    return { props: { token: token, user: data } };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default function UserPage(props) {
  const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  };

  const { addOrRemoveFriendService } = useUsers();
  const addOrRemoveFriend = async (friendId) => {
    try {
      const res = await addOrRemoveFriendService(friendId);
      if (res) {
        toast.success(`${res.data.message}`);
        refreshData();
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar token={props.token} />
        <div className="container">
          <Profile user={props.user} addOrRemoveFriend={addOrRemoveFriend} />
        </div>
      </main>
    </>
  );
}