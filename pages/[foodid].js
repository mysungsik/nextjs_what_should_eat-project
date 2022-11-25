import { connectDb, findAllFoods } from "../helper/db-util";
import { findSameArray } from "../helper/userdetail-db-util";
import FoodDetailForm from "../components/food-detail-components/food-detail-form";
import { getSession } from "next-auth/react";
import Head from "next/head";

function FoodDetailPage(props) {
  const { selectedFood, isSameArray } = props;

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
      <Head>
        <title> Food Detail </title>
        <meta
          name="description"
          content="this page let you know about foods detail like calorie or nutrition"
        />
      </Head>
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
        isSameArray={isSameArray}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  let { foodid } = context.params;

  // 선택된 음식 사전데이터페칭
  const client = await connectDb();
  let result = await findAllFoods(client);

  let issue = JSON.parse(JSON.stringify(result)); // 직렬화 이슈를 피하는, 두번 변환

  let selectedFood = issue.find((data) => data.id === foodid);

  // 버튼 선택을 위한, 초기값 설정

  let userEmail;
  const session = await getSession({ req: context.req });
  if (!session) {
    userEmail = "nothing";
  } else {
    userEmail = session.user.email;
  }

  const isSameArray = await findSameArray(client, userEmail, foodid);

  return {
    props: {
      selectedFood,
      isSameArray: !!isSameArray,
    },
  };
}

export default FoodDetailPage;
