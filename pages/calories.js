// 모든 음식 (이름, 카테고리, 칼로리 세개만 빼와) => 카테고리별로 필터처리
//  정리해서 카테고리별 리스트다운    한식 쭉, 중식 쭉 ...
//  선택되면 "먹은음식" 칸에 하나씩 들어가고, 갯수 선택 가능
//  계산해서 총칼로리 나타냄

import CaloireFoodSeletor from "../components/calorie-components/caculate-selector";
import { connectDb, findAllFoodsForCalorie } from "../helper/db-util";
import Head from "next/head";

function CalorieCalculator(props) {
  const { findResult } = props;
  return (
    <div>
      <Head>
        <title> Calorie Calculator </title>
        <meta
          name="description"
          content="this page calculate foods calorie what you eat"
        />
      </Head>
      <CaloireFoodSeletor foodData={findResult} />
    </div>
  );
}

// data 가져올때, 1 을 이용하여, name, calorie, category 만 가져올것

export async function getStaticProps() {
  const client = await connectDb();
  const findResult = await findAllFoodsForCalorie(client);

  const foodDataEscapedIssue = JSON.parse(JSON.stringify(findResult));

  return {
    props: {
      findResult: foodDataEscapedIssue,
    },
  };
}
export default CalorieCalculator;
