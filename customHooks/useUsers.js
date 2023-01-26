import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function useCurrentUser() {
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

  const addOrRemoveFriendService = async (friendId) => {
    return await axios.patch(
      `${apiUrl}/user/add/${friendId}`,
      {},
      fetchOptions
    );
  };

  const searchByNameFetch = useSWRMutation(
    `${apiUrl}/user/search`,
    searchFetcher
  );

  const usersFetch = useSWR(`${apiUrl}/user`, fetcher);

  return { usersFetch, addOrRemoveFriendService, searchByNameFetch };
}
