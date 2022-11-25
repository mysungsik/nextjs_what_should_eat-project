import FoodCategoryHeader from "../../components/food-components/food-category-header";
import { connectDb, findAllFoods } from "../../helper/db-util";
import Head from "next/head";

function AllFoodsPage(props) {
  const { allfoods } = props;

  return (
    <div>
      <Head>
        <title> All Foods with Category</title>
        <meta name="description" content="this show all foods with category" />
      </Head>
      {<FoodCategoryHeader foodData={allfoods} />}
    </div>
  );
}

export async function getStaticProps() {
  const client = await connectDb();
  const allFoods = await findAllFoods(client);

  const arrangeAllFoods = allFoods.sort((A, B) => (A.name > B.name ? 1 : -1));

  return {
    // 직렬화 문제로 인해, 두번 변환해서 사용
    props: { allfoods: JSON.parse(JSON.stringify(arrangeAllFoods)) },
  };
}
export default AllFoodsPage;
