import GreetingCom from "../components/greeting-component/greeting";
import Head from "next/head";

function Greeting() {
  return (
    <div>
      <Head>
        <title> Greeting </title>
        <meta
          name="description"
          content="hello, this page let you know, how can you play with this page"
        />
      </Head>
      <GreetingCom />
    </div>
  );
}
export default Greeting;
