import Favorites from "../../components/user-detail-components/favorite-foods";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

function FavoriteFoodsPage(props) {
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
        <title> Favorite Food </title>
        <meta
          name="description"
          content="show page what you picked in all foods"
        />
      </Head>
      <div>
        <Favorites />
      </div>
    </div>
  );
}

export default FavoriteFoodsPage;

//getSession 으로 email 확보, DB에서 foodArray 가져오고, 전체 food data 가져와서,
//  [for + filter 처리로, foodArray의 각 배열(foodid)마다 filter 처리를 통해, 맞는 값만 하나씩 빼서, 새 배열에 넣어서, 값을 넘겨준다.]
