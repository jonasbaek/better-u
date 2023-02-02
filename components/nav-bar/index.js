import Avatar from "@mui/material/Avatar";
import styles from "../../styles/styles.module.scss";
import AccountMenu from "../account-menu";
import Link from "next/link";
import useUsers from "../../customHooks/useUsers";
import { IconButton, InputBase } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { Search } from "@mui/icons-material";
import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Image from "next/image";
import useWindowSize from "../../customHooks/useWindowSize";
import { display } from "../../util/display";
import Popover from "@mui/material/Popover";

export default function NavBar(props) {
  const [searchValue, setSearchValue] = useState();
  const [debounceResult, setDebounceResult] = useState(searchValue);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { searchByNameFetch } = useUsers();
  const [anchorEl, setAnchorEl] = useState(null);
  const windowSize = useWindowSize();

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      if (searchValue && searchValue.trim() !== "") {
        const { data } = await searchByNameFetch.trigger(searchValue);
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

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? "simple-popover" : undefined;

  const handleSearchChange = useCallback((e) => {
    setOpen(true);
    setSearchValue(e.target.value);
  }, []);

  const resultsStyle = {
    position: "absolute",
    width: 291,
    minHeight: 70,
    top: 65,
    right: 0,
    left: 200,
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
          <div className="ms-3 rounded-5 border-0 bg-white p-1">
            {windowSize[0] <= display.md ? (
              <>
                <IconButton onClick={(e) => handleClick(e)}>
                  <Search />
                </IconButton>
                <Popover
                  id={id}
                  open={openPop}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                >
                  <InputBase
                    className="p-3"
                    placeholder="Search for friends"
                    onClick={() => setOpen(true)}
                    onChange={(e) => {
                      handleSearchChange(e);
                      if (e.target.value.length === 0) {
                        setOpen(false);
                      }
                    }}
                  />
                  {open && (
                    <Box sx={{ p: 2 }}>
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
                            <Link
                              key={user._id}
                              href={`/${props.currentUser?._id}`}
                              className="d-flex my-3 text-decoration-none text-black"
                            >
                              <Avatar>
                                {!!user?.avatar ? (
                                  <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${user?.avatar}`}
                                    className="text-center"
                                    alt="Profile photo"
                                    fill
                                  />
                                ) : null}
                              </Avatar>
                              <div className="d-flex flex-column mt-2 ms-3">
                                <span className={styles.searchResultName}>
                                  {user.name}
                                </span>
                                <span
                                  className={styles.searchResultSubText}
                                ></span>
                              </div>
                            </Link>
                          );
                        })
                      ) : (
                        <p>
                          {!!searchValue?.length
                            ? "Not found"
                            : "Find an user by their name"}{" "}
                        </p>
                      )}
                    </Box>
                  )}
                </Popover>
              </>
            ) : (
              <>
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
                {open && (
                  <Box sx={resultsStyle} className="rounded-5">
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
                          <Link
                            key={user._id}
                            href={`/${props.currentUser?._id}`}
                            className="d-flex my-3 text-decoration-none text-black"
                          >
                            <Avatar>
                              {!!user?.avatar ? (
                                <Image
                                  src={`${process.env.NEXT_PUBLIC_API_URL}/public/uploads/avatars/${user?.avatar}`}
                                  className="text-center"
                                  alt="Profile photo"
                                  fill
                                />
                              ) : null}
                            </Avatar>
                            <div className="d-flex flex-column mt-2 ms-3">
                              <span className={styles.searchResultName}>
                                {user.name}
                              </span>
                              <span
                                className={styles.searchResultSubText}
                              ></span>
                            </div>
                          </Link>
                        );
                      })
                    ) : (
                      <p className="ps-2 pt-3">
                        {!!searchValue?.length
                          ? "Not found"
                          : "Find an user by their name"}{" "}
                      </p>
                    )}
                  </Box>
                )}
              </>
            )}
          </div>
        </div>
        <AccountMenu currentUser={props.currentUser} />
      </nav>
    </ClickAwayListener>
  );
}
