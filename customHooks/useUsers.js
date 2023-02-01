import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { getCookie } from "cookies-next";
import toast from "react-hot-toast";
import { tableFooterClasses } from "@mui/material";

export default function useUsers() {
  const token = getCookie("jwt");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetcher = async (url) => await axios.get(`${url}`, fetchOptions);

  const searchFetcher = async (url, { arg }) =>
    await axios.get(`${url}/${arg}`, fetchOptions);

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

  const searchByNameFetch = useSWRMutation(
    `${apiUrl}/user/search`,
    searchFetcher
  );

  const usersFetch = useSWR(`${apiUrl}/user`, fetcher);

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

  return {
    usersFetch,
    addOrRemoveFriendService,
    searchByNameFetch,
    updateUser,
  };
}
