import axios from "axios";
import styles from "../../styles/styles.module.scss";
import AccountMenu from "../account-menu";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { IconButton, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function NavBar(props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };
  const fetcher = async (url, { arg }) =>
    await axios.get(`${url}/${arg}`, fetchOptions);
  const searchForByNameFetch = useSWRMutation(`${apiUrl}/user`, fetcher);

  return (
    <>
      <nav className={`navbar sticky-top px-5 py-3 ${styles.navBarColor}`}>
        <div className="d-flex">
          <Link className="text-decoration-none navbar-brand" href="/">
            <h1 className={styles.betterUNavBar}>Better-U</h1>
          </Link>
          <div className="ms-5 rounded border-0 bg-white p-1">
            <InputBase
              className="ps-4"
              placeholder="Search for friends"
              onChange={(e) => {
                searchForByNameFetch.trigger(e.target.value);
              }}
            />
            <IconButton className="me-4">
              <Search />
            </IconButton>
          </div>
        </div>
        <AccountMenu currentUser={props.data.currentUser} />
      </nav>
    </>
  );
}
