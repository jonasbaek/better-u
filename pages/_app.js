import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
