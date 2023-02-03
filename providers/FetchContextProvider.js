import { createContext, useState, useEffect } from "react";
import useSWR from "swr";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import useSWRMutation from "swr/mutation";

export const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [showMorePosts, setShowMorePosts] = useState({
    nextUrl: "",
    posts: [],
    hasMore: true,
    dirty: false,
  });

  const token = getCookie("jwt");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  const fetcher = async (url, pagination = "") =>
    await axios.get(`${url}${pagination ? pagination : ""}`, fetchOptions);
  const searchFetcher = async (url, { arg }) =>
    await axios.get(`${url}/${arg}`, fetchOptions);

  const postsFetch = useSWR(
    [`${apiUrl}/posts`, showMorePosts.nextUrl],
    ([url, pagination]) => fetcher(url, pagination)
  );
  const currentUserFetch = useSWR(`${apiUrl}/user/me`, fetcher);
  const searchByNameFetch = useSWRMutation(
    `${apiUrl}/user/search`,
    searchFetcher
  );
  const usersFetch = useSWR(`${apiUrl}/user`, fetcher);

  useEffect(() => {
    const waitForInitialDataFetch = () => {
      setTimeout(async () => {
        if (!postsFetch.isLoading) {
          const { data } = postsFetch;
          if (!showMorePosts.dirty && data) {
            setShowMorePosts({
              nextUrl: data.data.nextUrl,
              posts: [...data.data.posts],
              hasMore: !(data.data.posts.length === data.data.total),
              dirty: true,
            });
          }
        }
      }, 300);
    };
    waitForInitialDataFetch();
  }, [postsFetch.isLoading]);

  const addOrRemoveFriendService = async (
    friendId,
    currentUserFetch,
    refreshData
  ) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/user/add/${friendId}`,
        {},
        fetchOptions
      );
      if (res) {
        currentUserFetch ? currentUserFetch.mutate() : null;
        refreshData ? refreshData() : null;
        toast.success(`${res.data.message}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const updateUser = async (userId, formData, currentUserFetch, postsFetch) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/user/${userId}`,
        formData,
        fetchOptions
      );
      if (res) {
        currentUserFetch.mutate();
        postsFetch.mutate();
        toast.success(`${res.data.message}`);
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const createPostService = async (formData, currentUserFetch) => {
    try {
      await axios.post(`${apiUrl}/posts`, formData, fetchOptions);
      const { data } = await postsFetch.mutate();
      await currentUserFetch.mutate();
      setShowMorePosts({
        nextUrl: data.nextUrl,
        hasMore: !(data.posts.length === data.total),
        posts: [...data.posts],
        dirty: true,
      });
      toast.success("Post created successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const removePostService = async (postId, currentUserFetch) => {
    try {
      await axios.delete(`${apiUrl}/posts/${postId}`, fetchOptions);
      const { data } = await postsFetch.mutate();
      await currentUserFetch.mutate();
      setShowMorePosts({
        nextUrl: data.nextUrl,
        hasMore: !(data.posts.length === data.total),
        posts: [...data.posts],
        dirty: true,
      });
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const likePostService = async (postId, currentUserFetch) => {
    try {
      const res = await axios.patch(
        `${apiUrl}/posts/${postId}/like`,
        {},
        fetchOptions
      );
      if (res) {
        currentUserFetch.mutate();
        const { data } = await postsFetch.mutate();
        setShowMorePosts({
          nextUrl: data.nextUrl,
          hasMore: !(data.posts.length === data.total),
          posts: [...data.posts],
          dirty: true,
        });
      }
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const fetchMorePosts = () => {
    setShowMorePosts({
      nextUrl: postsFetch?.data?.data.nextUrl,
      hasMore: !(
        postsFetch?.data?.data?.posts?.length === postsFetch?.data?.data?.total
      ),
      posts: [...postsFetch?.data?.data.posts],
      dirty: true,
    });
  };

  return (
    <FetchContext.Provider
      value={{
        showMorePosts,
        setShowMorePosts,
        postsFetch,
        currentUserFetch,
        createPostService,
        removePostService,
        likePostService,
        fetchMorePosts,
        updateUser,
        addOrRemoveFriendService,
        searchByNameFetch,
        usersFetch,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};

export default FetchContextProvider;
