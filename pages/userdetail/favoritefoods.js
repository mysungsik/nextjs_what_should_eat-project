import Favorites from "../../components/user-detail-components/favorite-foods";
import { useSession } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { connectDb, findAllFoods } from "../../helper/db-util";
import { favoriteFoodArray } from "../../helper/userdetail-db-util";

function FavoriteFoodsPage(props) {
  const { data: session, status } = useSession();
  const { favorites } = props;
  const router = useRouter();

  if (status == "loading") {
    return <div> ...loading</div>;
  }
  if (status == "unauthenticated") {
    router.replace("/");
  }
  return (
    <div>
      <div>
        <Favorites favorites={favorites} />
      </div>
    </div>
  );
}

//getSession 으로 email 확보, DB에서 foodArray 가져오고, 전체 food data 가져와서,
//  [for + filter 처리로, foodArray의 각 배열(foodid)마다 filter 처리를 통해, 맞는 값만 하나씩 빼서, 새 배열에 넣어서, 값을 넘겨준다.]

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  const client = await connectDb();
  const allfoods = await findAllFoods(client);
  const favoriteFoodsData = await favoriteFoodArray(client, session.user.email);

  let favoriteFoodsArray = [];

  if (favoriteFoodsData) {
    favoriteFoodsArray = favoriteFoodsData.foodArray; // favoriteFoodData 가 있다면, 그 안의 FoodArray 를 뽑아서, 새로운 Array 에 넣어주고
  }

  let favorites = [];

  for (const foodid of favoriteFoodsArray) {
    const result = allfoods.filter((food) => food.id === foodid);
    favorites.push(...result);
  }

  const favroiteEscapedIssue = JSON.parse(JSON.stringify(favorites));

  return {
    props: { favorites: favroiteEscapedIssue },
  };
}

export default FavoriteFoodsPage;
