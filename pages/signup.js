import SignupForm from "../components/signup-components/signup-form";
import Head from "next/head";

function SignupPage() {
  return (
    <div>
      <Head>
        <title> Login </title>
        <meta name="description" content="signup in page" />
      </Head>
      <SignupForm />
    </div>
  );
}

export default SignupPage;
