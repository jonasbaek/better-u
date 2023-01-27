import { getCookie, deleteCookie } from "cookies-next";

export const getServerSideProps = ({ req, res }) => {
  const token = getCookie("jwt", { req, res });
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
    };
  }
  return { props: { token: token } };
};

export default function ConfigPage(props) {
  return <>oi</>;
}
