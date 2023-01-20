import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import toast from "react-hot-toast";
import NavBar from "../components/nav-bar";
import useSWR from "swr";
import PostProfile from "../components/post-profile";
import PostStatus from "../components/post-status";
import Post from "../components/post";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import styles from "../styles/styles.module.scss";

export const getServerSideProps = ({ req, res }) => {
  const token = getCookie("jwt", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return { props: { token: token } };
};

export default function BetterUPage(props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };
  const fetcher = async (url) => await axios.get(url, fetchOptions);

  const usersFetch = useSWR(`${apiUrl}/user`, fetcher);
  const currentUserFetch = useSWR(`${apiUrl}/user/me`, fetcher);
  const postsFetch = useSWR(`${apiUrl}/posts`, fetcher);

  const data = {
    currentUser: currentUserFetch?.data?.data,
    posts: postsFetch?.data?.data?.posts,
    users: usersFetch?.data?.data,
  };

  const createPost = async (formData) => {
    try {
      await axios.post(`${apiUrl}/posts`, formData, fetchOptions);
      postsFetch.mutate();
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const removePost = async (postId) => {
    try {
      await axios.delete(`${apiUrl}/posts/${postId}`, fetchOptions);
      postsFetch.mutate();
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  return (
    <>
      <Head>
        <title>Better-U</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NavBar data={data} />
        <div className="container">
          <div className="row">
            {/* componente do perfil na esquerda */}
            <div className="col-3">
              <PostProfile currentUser={data.currentUser} />
            </div>

            {/* componente central com barra de postagem e posts */}
            <div className="col-6 mt-4">
              <PostStatus createPost={createPost} data={data} />
              {data.posts?.map((post, i) => {
                return (
                  <Post
                    key={i}
                    post={post}
                    currentUser={data.currentUser}
                    removePost={removePost}
                  />
                );
              })}
            </div>

            {/* componente com lista de amigos na direita */}
            <div className="col-3">
              Users
              <ul>
                {data.users?.map((user, i) => {
                  return <li key={i}>{user.name}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
