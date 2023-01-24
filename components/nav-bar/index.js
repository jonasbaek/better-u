import axios from "axios";
import Avatar from "@mui/material/Avatar";
import styles from "../../styles/styles.module.scss";
import AccountMenu from "../account-menu";
import Link from "next/link";
import useSWRMutation from "swr/mutation";
import { IconButton, InputBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Search } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/base/ClickAwayListener";

export default function NavBar(props) {
  const [searchValue, setSearchValue] = useState(null);
  const [debounceResult, setDebounceResult] = useState(searchValue);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${props.token}`,
    },
  };

  const fetcher = async (url, { arg }) =>
    await axios.get(`${url}/${arg}`, fetchOptions);
  const searchForByNameFetch = useSWRMutation(`${apiUrl}/user`, fetcher);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      if (!!searchValue?.length) {
        const { data } = await searchForByNameFetch.trigger(searchValue);
        setDebounceResult(data);
        setIsLoading(false);
      } else {
        setDebounceResult([]);
        setIsLoading(false);
      }
    }, 800);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchValue]);

  const handleSearchChange = useCallback((e) => {
    setOpen(true);
    setSearchValue(e.target.value);
  }, []);

  const resultsStyle = {
    position: "absolute",
    width: 291,
    minHeight: 70,
    top: 64,
    right: 0,
    left: 233,
    zIndex: 1,
    p: 2,
    bgcolor: "background.paper",
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setOpen(false);
        setIsLoading(false);
      }}
    >
      <nav className={`navbar sticky-top px-5 py-3 ${styles.navBarColor}`}>
        <div className="d-flex">
          <Link className="text-decoration-none navbar-brand" href="/">
            <h1 className={styles.betterUNavBar}>Better-U</h1>
          </Link>
          <div className="ms-5 rounded border-0 bg-white p-1">
            <InputBase
              className="ps-4"
              placeholder="Search for friends"
              onClick={() => setOpen(true)}
              onChange={(e) => {
                handleSearchChange(e);
                if (e.target.value.length === 0) {
                  setOpen(false);
                }
              }}
            />
            <IconButton className="me-4">
              <Search />
            </IconButton>
          </div>
          {open && (
            <Box sx={resultsStyle}>
              {isLoading ? (
                <Box
                  sx={{
                    display: "flex",
                    margin: "auto",
                    width: 40,
                    height: 40,
                  }}
                >
                  <CircularProgress />
                </Box>
              ) : !!debounceResult?.length ? (
                debounceResult.map((user) => {
                  return (
                    <div key={user._id} className="d-flex my-3">
                      <Avatar sx={{ width: 35, height: 35 }}>
                        {user.name}
                      </Avatar>
                      <div className="d-flex flex-column mt-2 ms-3">
                        <span className={styles.searchResultName}>
                          {user.name}
                        </span>
                        <span className={styles.searchResultSubText}>
                          {user.username}
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : !!searchValue?.length ? (
                "Not found"
              ) : (
                "Find an user by their name"
              )}
            </Box>
          )}
        </div>
        <AccountMenu currentUser={props.data.currentUser} />
      </nav>
    </ClickAwayListener>
  );
}
