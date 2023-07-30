import { Button } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";
import Head from "next/head";
import styles from "@/styles/Login.module.css";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import auth from "@/firebase/firebase.auth";
const LoginPage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();


  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (session?.user) {
    router.push("/");
    return null;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <Head>
        <title>Next Login</title>
      </Head>
      <div className={styles.form}  >
        <h3>LOGIN</h3>
        <div className={styles.social_icons} >
          <GoogleOutlined onClick={() => signIn("google", { callbackUrl: router.query.callbackUrl || "https://msp-pc-builder.vercel.app/" })} />
          <GithubOutlined onClick={() => signIn("github", { callbackUrl: router.query.callbackUrl || "https://msp-pc-builder.vercel.app/" })} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
