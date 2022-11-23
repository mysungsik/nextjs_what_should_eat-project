import RandomSelectComponent from "../components/random-select-components/random-select-for-all";

import { connectDb, findAllFoods } from "../helper/db-util";

function RandomSelectPage(props) {
  const { allfoods } = props;

  return (
    <div>
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
