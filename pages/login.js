import LoginForm from "../components/login-components/login-form";
import Head from "next/head";

function LoginPage() {
  return (
    <div>
      <Head>
        <title> Login </title>
        <meta
          name="description"
          content="Log in page, for pick favorite foods"
        />
      </Head>
      <LoginForm />;
    </div>
  );
}

export default LoginPage;
