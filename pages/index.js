import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/nav-bar";
import FriendList from "../components/friend-list";
import PostProfile from "../components/post-profile";
import PostStatus from "../components/post-status";
import Post from "../components/post";
import { getCookie, deleteCookie } from "cookies-next";
import styles from "../styles/styles.module.scss";
import useWindowSize from "../customHooks/useWindowSize";
import { useEffect, useState } from "react";
import useCurrentUser from "../customHooks/useCurrentUser";
import usePosts from "../customHooks/usePosts";
import useUsers from "../customHooks/useUsers";
import useValidateToken from "../customHooks/useValidateToken";
import InfiniteScroll from "react-infinite-scroll-component";
import { display } from "../util/display";

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
  useValidateToken();
  const [isLoading, setIsLoading] = useState(true);
  const windowSize = useWindowSize();
  const { usersFetch, addOrRemoveFriendService } = useUsers();
  const currentUserFetch = useCurrentUser();
  const {
    showMorePosts,
    postsFetch,
    createPostService,
    removePostService,
    likePostService,
    fetchMorePosts,
  } = usePosts();

  useEffect(() => {
    const waitForInitialDataFetch = () => {
      setTimeout(() => {
        if (
          !usersFetch.isLoading &&
          !currentUserFetch.isLoading &&
          !postsFetch.isLoading
        ) {
          setIsLoading(false);
        }
      }, 150);
    };
    waitForInitialDataFetch();
  }, [usersFetch.isLoading, currentUserFetch.isLoading, postsFetch.isLoading]);

  const data = {
    currentUser: currentUserFetch?.data?.data,
    posts: postsFetch?.data?.data,
    users: usersFetch?.data?.data,
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
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <>
            <NavBar token={props.token} currentUser={data.currentUser} />
            <div className="row mx-2">
              <div
                className={`p-2 ${
                  windowSize[0] > display.lg ? "col-3" : "col-4"
                }`}
              >
                <PostProfile currentUser={data.currentUser} />
                {windowSize[0] <= display.lg && windowSize[0] > display.md && (
                  <FriendList
                    currentUser={data.currentUser}
                    addOrRemoveFriendService={addOrRemoveFriendService}
                    currentUserFetch={currentUserFetch}
                  />
                )}
              </div>

              <div
                className={`p-2 ${
                  windowSize[0] > display.lg ? "col-6" : "col-8"
                }`}
              >
                <PostStatus data={data} createPostService={createPostService} />
                <InfiniteScroll
                  dataLength={showMorePosts.posts.length}
                  next={fetchMorePosts}
                  hasMore={showMorePosts.hasMore}
                  loader={<h4>Loading...</h4>}
                  endMessage={
                    <p style={{ textAlign: "center" }}>
                      <b>Yay! You have seen it all</b>
                    </p>
                  }
                >
                  {showMorePosts.posts?.map((post, i) => {
                    return (
                      <>
                        <Post
                          key={i}
                          post={post}
                          currentUser={data.currentUser}
                          currentUserFetch={currentUserFetch}
                          removePostService={removePostService}
                          likePostService={() =>
                            likePostService(post.id, currentUserFetch)
                          }
                        />
                      </>
                    );
                  })}
                </InfiniteScroll>
              </div>
              {windowSize[0] > display.lg && (
                <div className="col-3 p-2">
                  <FriendList
                    currentUser={data.currentUser}
                    addOrRemoveFriendService={addOrRemoveFriendService}
                    currentUserFetch={currentUserFetch}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
}
