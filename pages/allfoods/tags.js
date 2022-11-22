import FoodTagsHeader from "../../components/food-components/food-tags-header";
import { connectDb, findAllFoods } from "../../helper/db-util";

function AllFoodsWithTagsPage(props) {
  const { allfoods } = props;

  return <div>{<FoodTagsHeader foodData={allfoods} />}</div>;
}

export async function getStaticProps() {
  const client = await connectDb();
  const allFoods = await findAllFoods(client);

  return {
    // 직렬화 문제로 인해, 두번 변환해서 사용
    props: { allfoods: JSON.parse(JSON.stringify(allFoods)) },
  };
}
export default AllFoodsWithTagsPage;
