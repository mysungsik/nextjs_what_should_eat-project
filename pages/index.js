import HompageSlider from "../components/homepage-components/homepage-slide";
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title> Homepage </title>
        <meta
          name="description"
          content="this is the main page, include all of function in page"
        />
      </Head>
      <HompageSlider />
    </div>
  );
}
