import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toaster } from "react-hot-toast";
import FetchContextProvider from "../providers/FetchContextProvider";

export default function App({ Component, pageProps }) {
  return (
    <FetchContextProvider>
      <Component {...pageProps} />
      <Toaster />
    </FetchContextProvider>
  );
}
