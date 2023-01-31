import useSWR from "swr";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function usePosts() {
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

  const postsFetch = useSWR(
    [`${apiUrl}/posts`, showMorePosts.nextUrl],
    ([url, pagination]) => fetcher(url, pagination)
  );

  useEffect(() => {
    const waitForInitialDataFetch = () => {
      setTimeout(() => {
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

  const createPostService = async (formData) => {
    try {
      await axios.post(`${apiUrl}/posts`, formData, fetchOptions);
      const { data } = await postsFetch.mutate();
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

  const removePostService = async (postId) => {
    try {
      await axios.delete(`${apiUrl}/posts/${postId}`, fetchOptions);
      const { data } = await postsFetch.mutate();
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

  return {
    showMorePosts,
    setShowMorePosts,
    postsFetch,
    createPostService,
    removePostService,
    likePostService,
    fetchMorePosts,
  };
}
