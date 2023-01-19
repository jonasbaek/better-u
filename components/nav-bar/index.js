import styles from "./styles.module.scss";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

export default function NavBar() {
  const router = useRouter();

  const logout = () => {
    deleteCookie("jwt");
    toast.success("You logged out");
    router.push("/login");
  };

  return (
    <>
      <div className="d-flex justify-content-between m-3">
        <h1 className={styles.title}>Better-U</h1>

        <input
          className="ms-5 border-0 bg-light"
          type="text"
          placeholder="Search for friends"
        />
        <button className="btn btn-secondary" onClick={() => logout()}>
          Logout
        </button>
      </div>
    </>
  );
}
