import useSWR from "swr";
import axios from "axios";
import { getCookie } from "cookies-next";

export default function useUsers() {
  const token = getCookie("jwt");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetcher = async (url) => await axios.get(`${url}`, fetchOptions);
  return useSWR(`${apiUrl}/user/me`, fetcher);
}
