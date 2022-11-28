import { connectDb, findAllFoods } from "../helper/db-util";
import FoodDetailForm from "../components/food-detail-components/food-detail-form";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useState, useEffect } from "react";
import LoadingModal from "../components/ui/modal/modal-for-loading";

function FoodDetailPage(props) {
  const { selectedFood, foodid } = props;
  const { data: session, status } = useSession();
  const [isSameArray, setIsSameArray] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // useSession 으로, 만약 authenticated 되어있다면,
  // useEffect를 통해, fetch 요청으로 email 과 foodId 를 보내,  isSameArray 의 boolean 값을 받아와, Component 에 보낸다.

  async function fetchHandler() {
    setLoading(true);

    const response = await fetch("/api/food-detail", {
      method: "POST",
      body: JSON.stringify({ userEmail: session.user.email, foodID: foodid }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    setLoading(false);
    setIsSameArray(responseData.sameArray);
  }

  useEffect(() => {
    if (status === "authenticated") {
      fetchHandler();
    }
  }, [status]);

  return (
    <div>
      {loading && <LoadingModal />}
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

export async function getStaticProps(context) {
  let { foodid } = context.params;

  // 선택된 음식 사전데이터페칭
  const client = await connectDb();
  const result = await findAllFoods(client);

  const issue = JSON.parse(JSON.stringify(result));

  const selectedFood = issue.find((data) => data.id === foodid);

  return {
    props: {
      selectedFood,
      foodid,
    },
  };
}

export async function getStaticPaths(context) {
  return {
    paths: [{ params: { foodid: "1" } }],
    fallback: "blocking",
  };
}

export default FoodDetailPage;

// 최적화 필요

//  현상황
//  1. 선택된 음식 사전 데이터페칭
//  2. page에 가서, useSession과 fetch 를 통해, isSameArray 인지 확인
//  3. 컴포넌트로 넘겨줌

//  1. page 누르는 순간, sameArray인지확인을 하고, 페칭을 해야한다.
