import useSWR from "swr";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

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
      Authorization: `Bearer ${token}`,
    },
  };
  const fetcher = async (url, pagination = "") =>
    await axios.get(`${url}${pagination ? pagination : ""}`, fetchOptions);

  const postsFetch = useSWR(
    [`${apiUrl}/posts`, showMorePosts.nextUrl],
    ([url, pagination]) => fetcher(url, pagination)
  );

  const createPostService = async (formData) => {
    return await axios.post(`${apiUrl}/posts`, formData, fetchOptions);
  };

  const removePostService = async (postId) => {
    return await axios.delete(`${apiUrl}/posts/${postId}`, fetchOptions);
  };

  const likePostService = async (postId) => {
    return await axios.patch(
      `${apiUrl}/posts/${postId}/like`,
      {},
      fetchOptions
    );
  };

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

  return {
    showMorePosts,
    setShowMorePosts,
    postsFetch,
    createPostService,
    removePostService,
    likePostService,
  };
}
