import RandomSelectComponent from "../../components/random-select-components/random-select-for-user";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import { findAllFoods, connectDb } from "../../helper/db-util";
import { allFavoriteFoodArray } from "../../helper/userdetail-db-util";

function RandomSelectPageForUser(props) {
  const { allFoods, allFavoriteFoods } = props;
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
      <RandomSelectComponent
        allFoods={allFoods}
        allFavoriteFoods={allFavoriteFoods}
      />
    </div>
  );
}

export async function getStaticProps() {
  const client = await connectDb();
  const allFoods = await findAllFoods(client);
  const allFavoriteFoods = await allFavoriteFoodArray(client);

  const allFoodsEscapeIssue = JSON.parse(JSON.stringify(allFoods));
  const allFavoriteFoodsEscapeIssue = JSON.parse(
    JSON.stringify(allFavoriteFoods)
  );

  return {
    props: {
      allFoods: allFoodsEscapeIssue,
      allFavoriteFoods: allFavoriteFoodsEscapeIssue,
    },
    revalidate: 1,
  };
}

export default RandomSelectPageForUser;

// [최적화 수정]
// 1. 모든 데이터를 사전데이터페칭 후
// 2. 데이터와 함께, user 정보를, Favorties 컴포넌트에 넘겨서(useSession은 서버측에서 사용불가하니)
// 3. 컴포넌트 안에서, filter 처리하여, 유저에게 보여준다.
