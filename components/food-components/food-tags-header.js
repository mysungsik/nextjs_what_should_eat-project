import FoodList from "./food-list";
import styles from "./food-tags-header.module.css";
import { useState, useEffect } from "react";

// "카테고리" 누르면, Allfoods 에서 온 Data 들을, filter  처리 해서, Food-list 로 보내줌
// "전체" 을 누르면, Allfoods 에서 온 Data들을, filter 처리 없이, Foodlist 로 보내줌
// ** 음식 맛구성  [ 매콤  ,달달 , 짭짤, 삼삼, 새콤 , 씁쓸]

function FoodTagsHeader(props) {
  const { foodData } = props;

  const sortedFoodData = foodData.sort((A, B) => (A.name > B.name ? 1 : -1));
  const [insertFoodData, setInsertFoodData] = useState(foodData);

  // 버튼 누르면, food 선별작업 해서, 새로운 데이터를 만든 후, Foodlist 로 넘겨준다.

  function foodFilter(taste) {
    const filteredFoods = foodData.filter((food) => food.taste === taste);

    setInsertFoodData(filteredFoods);
  }

  function fansyFilter() {
    const filteredFoods = foodData.filter((food) => food.fansy == "true");

    setInsertFoodData(filteredFoods);
  }

  return (
    <div>
      <header className={styles.header}>
        <ul className={styles.ul}>
          <li onClick={() => setInsertFoodData(foodData)}>전체</li>
          <li onClick={() => foodFilter("매콤")}> 매콤 </li>
          <li onClick={() => foodFilter("달달")}> 달달 </li>
          <li onClick={() => foodFilter("짭짤")}> 짭짤</li>
          <li onClick={() => foodFilter("삼삼")}> 삼삼</li>
          <li onClick={() => foodFilter("새콤")}> 새콤</li>
          <li onClick={() => foodFilter("씁쓸")}> 씁쓸 </li>
          <li onClick={() => fansyFilter()}> 고급 </li>
        </ul>
      </header>
      <main>
        <FoodList foodData={insertFoodData} />
      </main>
    </div>
  );
}
export default FoodTagsHeader;
