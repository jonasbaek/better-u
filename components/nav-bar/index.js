import styles from "./styles.module.scss";
import toast from "react-hot-toast";
import AccountMenu from "../account-menu";
import Link from "next/link";
import { IconButton, InputBase } from "@mui/material";
import { Search } from "@mui/icons-material";

export default function NavBar(props) {
  return (
    <>
      <nav className="navbar sticky-top navbar-light bg-light px-5 py-3">
        <div className="d-flex">
          <Link className="text-decoration-none navbar-brand" href="/">
            <h1 className={styles.title}>Better-U</h1>
          </Link>
          <div className="ms-5 rounded border-0 bg-white p-1">
            <InputBase className="ps-4" placeholder="Search for friends" />
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
