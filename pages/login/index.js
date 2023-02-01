import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import axios from "axios";
import SignInForm from "../../components/forms/sign-in";
import SignUpForm from "../../components/forms/sign-up";
import { useRouter } from "next/router";
import { useState } from "react";
import { setCookie, hasCookie } from "cookies-next";
import styles from "../../styles/styles.module.scss";

export const getServerSideProps = ({ req, res }) => {
  const isAuthenticated = hasCookie("jwt", { req, res });
  if (isAuthenticated) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: {} };
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [toggleForm, setToggleForm] = useState(false);
  const router = useRouter();

  const createAccount = async (formData) => {
    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, formData);
      setTimeout(() => {
        setToggleForm(true);
        toast.success("Account created successfully!");
        setIsLoading(false);
      }, 600);
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      if (err?.response?.data?.message.includes("email")) {
        return toast.error("This email has already been taken!");
      }
      toast.error(`${err?.response?.data?.message}`);
    }
  };

  const signIn = async (formData) => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth`,
        formData
      );
      setCookie("jwt", data);
      setTimeout(() => {
        router.push("/");
        toast.success("You are logged!");
        setIsLoading(false);
      }, 600);
    } catch (err) {
      toast.error(`${err?.response?.data?.message}`);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Better-U | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`row ${styles.loginContainer}`}>
          <div className={`col-12 col-lg-5 ${styles.loginLeftColumn}`}>
            <h1 className={styles.betterULogo}>Better-U</h1>
            <p className={styles.loginParagraph}>
              Where self-improvement meets social connection
            </p>
          </div>
          <div className={`col-12 col-lg-7 ${styles.loginRightColumn}`}>
            <div>
              {toggleForm ? (
                <>
                  <SignInForm signIn={signIn} isLoading={isLoading} />
                  <span className="d-block mt-4 text-center">
                    New here?{" "}
                    <Link
                      href=""
                      onClick={() => {
                        setToggleForm(
                          (toggleForm) => (toggleForm = !toggleForm)
                        );
                      }}
                    >
                      Create account
                    </Link>
                  </span>
                </>
              ) : (
                <>
                  <SignUpForm
                    createAccount={createAccount}
                    isLoading={isLoading}
                  />
                  <span className="d-block mt-4 text-center">
                    Have an account?{" "}
                    <Link
                      href=""
                      onClick={() => {
                        setToggleForm(
                          (toggleForm) => (toggleForm = !toggleForm)
                        );
                      }}
                    >
                      Sign-in
                    </Link>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={styles.layerBackground}>
          <span className={styles.firstLayer}></span>
        </div>
      </main>
    </>
  );
}
