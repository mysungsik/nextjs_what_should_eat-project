import { connectDb, findAllFoods } from "../helper/db-util";
import FoodDetailForm from "../components/food-detail-components/food-detail-form";

function FoodDetailPage(props) {
  const { selectedFood } = props;

  const {
    id,
    name,
    image,
    price,
    taste,
    category,
    alt,
    calorie,
    nutri,
    content,
  } = selectedFood;
  return (
    <div>
      <FoodDetailForm
        id={id}
        name={name}
        image={image}
        price={price}
        taste={taste}
        category={category}
        alt={alt}
        calorie={calorie}
        nutri={nutri}
        content={content}
      />
    </div>
  );
}

export async function getStaticProps(context) {
  let { foodid } = context.params;

  const client = await connectDb();
  let result = await findAllFoods(client);

  let issue = JSON.parse(JSON.stringify(result)); // 직렬화 이슈를 피하는, 두번 변환

  let selectedFood = issue.find((data) => data.id === foodid);

  return {
    props: { selectedFood },
  };
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { foodid: "1" } }, { params: { foodid: "2" } }],
    fallback: "blocking",
  };
}

export default FoodDetailPage;
