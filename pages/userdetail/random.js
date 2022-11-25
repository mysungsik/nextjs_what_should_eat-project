import RandomSelectComponent from "../../components/random-select-components/random-select-for-user";

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectDb, findAllFoods } from "../../helper/db-util";
import { favoriteFoodArray } from "../../helper/userdetail-db-util";
import Head from "next/head";

function RandomSelectPageForUser(props) {
  const { favorites } = props;
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status == "loading") {
    return <div> ...loading</div>;
  }
  if (status == "unauthenticated") {
    router.replace("/");
  }

  return (
    <div>
      <Head>
        <title> Random Food for User </title>
        <meta
          name="description"
          content="this page pick random food, where you picked in all foods"
        />
      </Head>
      <RandomSelectComponent foodData={favorites} />
    </div>
  );
}

//getSession 으로 email 확보, DB에서 foodArray 가져오고, 전체 food data 가져와서,
//  [for + filter 처리로, foodArray의 각 배열(foodid)마다 filter 처리를 통해, 맞는 값만 하나씩 빼서, 새 배열에 넣어서, 값을 넘겨준다.]

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const client = await connectDb();
  const allfoods = await findAllFoods(client); // 모든 데이터 찾아
  const favoriteFoodsData = await favoriteFoodArray(client, session.user.email); // favorite 에 있는 해당 ID로 저장된 favoriteFoodData 를 가져와

  let favoriteFoodsArray = [];
  if (favoriteFoodsData) {
    favoriteFoodsArray = favoriteFoodsData.foodArray; // favoriteFoodData 가 있다면, 그 안의 FoodArray 를 뽑아서, 새로운 Array 에 넣어주고
  }

  let favorites = [];

  // FoodArray 안에는, foodid 값만 들어있으므로, 각 id값에 대하여, filter 처리(find도괜찮) 를 통하여, 하나하나 찾아, 새 배열에 [foodData] 를 넣어준다.

  for (const foodid of favoriteFoodsArray) {
    const result = allfoods.filter((food) => food.id === foodid);
    favorites.push(...result);
  }

  const favroiteEscapedIssue = JSON.parse(JSON.stringify(favorites)); // 직렬화 이슈 피하기

  return {
    props: { favorites: favroiteEscapedIssue }, // 그렇게 완성된 foodData Array 를, 넣어준다.
  };
}

export default RandomSelectPageForUser;
