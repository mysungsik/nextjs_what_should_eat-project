import FoodCategoryHeader from "../../components/food-components/food-category-header";
import { connectDb, findAllFoods } from "../../helper/db-util";

function AllFoodsPage(props) {
  const { allfoods } = props;

  return <div>{<FoodCategoryHeader foodData={allfoods} />}</div>;
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
