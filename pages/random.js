import RandomSelectComponent from "../components/random-select-components/random-select-for-all";
import { connectDb, findAllFoods } from "../helper/db-util";
import Head from "next/head";

function RandomSelectPage(props) {
  const { allfoods } = props;

  return (
    <div>
      <Head>
        <title> Random Food for All </title>
        <meta
          name="description"
          content="this page pick random food, in all of food"
        />
      </Head>
      <RandomSelectComponent foodData={allfoods} />
    </div>
  );
}

export async function getServerSideProps() {
  const client = await connectDb();
  const allfoods = await findAllFoods(client);

  const allfoodsEscapedIssue = JSON.parse(JSON.stringify(allfoods));

  return {
    props: { allfoods: allfoodsEscapedIssue },
  };
}

export default RandomSelectPage;
