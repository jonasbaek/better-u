import useSWR from "swr";
import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function useValidateToken() {
  const router = useRouter();
  const token = getCookie("jwt");
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const fetcher = async (url) => await axios.get(`${url}`, fetchOptions);

  const validateToken = useSWR(`${apiUrl}/auth/validate`, fetcher);

  useEffect(() => {
    if (validateToken.error) {
      deleteCookie("jwt");
      router.push("/login");
    }
  }, [validateToken, router]);

  return validateToken;
}
